"use client";

import axios, { AxiosError } from "axios";

import { axiosClient } from "@/lib/axiosClient";

import type { ProfessionalType } from "@/Types/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

interface UploadPhotoResult {
  url: string;
  path: string;
}

interface ApiResponse {
  ok?: boolean;
  url?: string;
  path?: string;
  error?: string;
  message?: string;
}

export type UploadProgressCallback = (percent: number) => void;

// =========================================================
// Helpers
// =========================================================

function normalizeProfessionalType(type: ProfessionalType): ProfessionalType {
  const normalizedType = String(type).trim().toLowerCase();

  if (
    normalizedType !== "doctor" &&
    normalizedType !== "consultant" &&
    normalizedType !== "clinic"
  ) {
    console.error("[professionalUpload] Invalid professional type:", {
      received: type,
      normalized: normalizedType,
    });

    throw new Error(`نوع متخصص نامعتبر است: ${String(type)}`);
  }

  return normalizedType as ProfessionalType;
}

// =========================================================
// Resolve API Error
// =========================================================

function resolveApiError(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      return error.message;
    }

    return fallback;
  }

  const axiosError = error as AxiosError<ApiResponse>;

  // ---------------------------------------------
  // Request did not reach server
  // ---------------------------------------------

  if (!axiosError.response) {
    if (axiosError.code === "ECONNABORTED") {
      return "زمان اتصال به سرور به پایان رسید.";
    }

    if (axiosError.code === "ERR_NETWORK") {
      return "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت را بررسی کنید.";
    }

    return "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.";
  }

  // ---------------------------------------------
  // Server response
  // ---------------------------------------------

  const responseData = axiosError.response.data;

  // JSON response
  if (responseData && typeof responseData === "object") {
    if (typeof responseData.error === "string" && responseData.error.trim()) {
      return responseData.error;
    }

    if (
      typeof responseData.message === "string" &&
      responseData.message.trim()
    ) {
      return responseData.message;
    }
  }

  // String response
  const data: unknown = responseData;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  // ---------------------------------------------
  // HTTP status messages
  // ---------------------------------------------

  switch (axiosError.response.status) {
    case 400:
      return "اطلاعات ارسال‌شده برای آپلود تصویر نامعتبر است.";

    case 401:
      return "برای آپلود تصویر باید وارد حساب کاربری شوید.";

    case 403:
      return "شما اجازه آپلود تصویر را ندارید.";

    case 404:
      return "سرویس آپلود تصویر پیدا نشد.";

    case 413:
      return "حجم تصویر بیش از حد مجاز است.";

    case 415:
      return "فرمت تصویر پشتیبانی نمی‌شود.";

    case 500:
      return "خطای داخلی سرور هنگام آپلود تصویر رخ داد.";

    case 502:
    case 503:
    case 504:
      return "سرویس آپلود تصویر موقتاً در دسترس نیست.";

    default:
      return `${fallback} کد خطا: ${axiosError.response.status}`;
  }
}

// =========================================================
// Validation
// =========================================================

export function validateProfessionalPhoto(
  file: File | null | undefined,
): string | null {
  if (!file) {
    return "لطفاً یک تصویر انتخاب کنید.";
  }

  if (file.size === 0) {
    return "فایل تصویر خالی است.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.";
  }

  if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return "فرمت تصویر باید JPG، PNG یا WEBP باشد.";
  }

  return null;
}

// =========================================================
// Upload Photo - Admin only
// =========================================================

export async function uploadPhoto(
  file: File,
  professionalId: string,
  type: ProfessionalType,
  onProgress?: UploadProgressCallback,
): Promise<UploadPhotoResult> {
  // -------------------------------------------------------
  // Validate file
  // -------------------------------------------------------

  const validationError = validateProfessionalPhoto(file);

  if (validationError) {
    throw new Error(validationError);
  }

  // -------------------------------------------------------
  // Validate professional ID
  // -------------------------------------------------------

  const normalizedProfessionalId = professionalId?.trim();

  if (!normalizedProfessionalId) {
    throw new Error("شناسه متخصص برای آپلود تصویر مشخص نشده است.");
  }

  // -------------------------------------------------------
  // Normalize type
  // -------------------------------------------------------

  const normalizedType = normalizeProfessionalType(type);

  // -------------------------------------------------------
  // Create FormData
  // -------------------------------------------------------

  const formData = new FormData();

  formData.append("file", file);

  formData.append("professionalId", normalizedProfessionalId);

  formData.append("type", normalizedType);

  // -------------------------------------------------------
  // Upload
  // -------------------------------------------------------

  try {
    /*
     * مهم:
     *
     * Content-Type را دستی تنظیم نمی‌کنیم.
     *
     * Axios باید multipart/form-data را با boundary
     * صحیح خودش تنظیم کند.
     */

    const response = await axiosClient.post<ApiResponse>(
      "/api/admin/professionals/photo",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (!onProgress || !progressEvent.total) {
            return;
          }

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          onProgress(Math.min(100, Math.max(0, percent)));
        },
      },
    );

    const result = response.data;

    // -----------------------------------------------------
    // Validate API success
    // -----------------------------------------------------

    if (!result || result.ok !== true) {
      throw new Error(
        result?.error ?? result?.message ?? "آپلود تصویر توسط سرور تایید نشد.",
      );
    }

    // -----------------------------------------------------
    // Validate URL
    // -----------------------------------------------------

    if (typeof result.url !== "string" || !result.url.trim()) {
      console.error("[uploadPhoto] Missing URL:", result);

      throw new Error("آدرس تصویر از سرور دریافت نشد.");
    }

    // -----------------------------------------------------
    // Validate path
    // -----------------------------------------------------

    if (typeof result.path !== "string" || !result.path.trim()) {
      console.error("[uploadPhoto] Missing path:", result);

      throw new Error("مسیر تصویر از سرور دریافت نشد.");
    }

    // -----------------------------------------------------
    // Success
    // -----------------------------------------------------

    if (onProgress) {
      onProgress(100);
    }

    return {
      url: result.url.trim(),
      path: result.path.trim(),
    };
  } catch (error) {
    console.error("[uploadPhoto] Upload failed:", {
      error,
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
    });

    throw new Error(resolveApiError(error, "آپلود تصویر انجام نشد."));
  }
}

// =========================================================
// Delete Photo - Admin only
// =========================================================

export async function deleteUploadedPhoto(
  photoPath: string,
  type: ProfessionalType,
  professionalId?: string,
): Promise<void> {
  // -------------------------------------------------------
  // Validate path
  // -------------------------------------------------------

  const normalizedPath = photoPath?.trim();

  if (!normalizedPath) {
    throw new Error("مسیر تصویر برای حذف مشخص نشده است.");
  }

  // -------------------------------------------------------
  // Normalize type
  // -------------------------------------------------------

  const normalizedType = normalizeProfessionalType(type);

  // -------------------------------------------------------
  // Validate professional ID
  // -------------------------------------------------------

  const normalizedProfessionalId = professionalId?.trim();

  if (!normalizedProfessionalId) {
    throw new Error("شناسه متخصص برای حذف تصویر مشخص نشده است.");
  }

  // -------------------------------------------------------
  // Delete request
  // -------------------------------------------------------

  try {
    const response = await axiosClient.delete<ApiResponse>(
      "/api/admin/professionals/photo",
      {
        data: {
          path: normalizedPath,
          type: normalizedType,
          professionalId: normalizedProfessionalId,
        },
      },
    );

    const result = response.data;

    // -----------------------------------------------------
    // Validate API success
    // -----------------------------------------------------

    if (!result || result.ok !== true) {
      throw new Error(
        result?.error ?? result?.message ?? "حذف تصویر توسط سرور تایید نشد.",
      );
    }
  } catch (error) {
    console.error("[deleteUploadedPhoto] Delete failed:", {
      error,
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
      response: axios.isAxiosError(error) ? error.response?.data : undefined,
    });

    throw new Error(resolveApiError(error, "حذف تصویر انجام نشد."));
  }
}
