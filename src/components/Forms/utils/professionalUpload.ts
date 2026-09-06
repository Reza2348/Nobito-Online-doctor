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

/**
 * پاسخ API را به شکل امن می‌خواند.
 *
 * اگر سرور JSON برگرداند، همان را parse می‌کند.
 * اگر HTML یا متن خطا برگرداند، متن واقعی سرور را در Console نمایش می‌دهد.
 */
async function readApiResponse(response: Response): Promise<ApiResponse> {
  const responseText = await response.text();

  console.log("[professionalUpload] API response:", {
    status: response.status,
    statusText: response.statusText,
    contentType: response.headers.get("content-type"),
    body: responseText,
  });

  if (!responseText.trim()) {
    return {};
  }

  try {
    return JSON.parse(responseText) as ApiResponse;
  } catch (error) {
    console.error("[professionalUpload] Server did not return valid JSON:", {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get("content-type"),
      body: responseText,
      parseError: error,
    });

    throw new Error(`سرور پاسخ JSON برنگرداند. کد خطا: ${response.status}`);
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
  // Normalize professional type
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
  // Send request
  // -------------------------------------------------------

  let response: Response;

  try {
    response = await fetch("/api/admin/professionals/photo", {
      method: "POST",
      body: formData,
      credentials: "include",
      cache: "no-store",
    });
  } catch (error) {
    console.error("[uploadPhoto] Network error:", error);

    throw new Error(
      "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت را بررسی کنید.",
    );
  }

  // -------------------------------------------------------
  // Read response safely
  // -------------------------------------------------------

  let result: ApiResponse;

  try {
    result = await readApiResponse(response);
  } catch (error) {
    console.error("[uploadPhoto] Failed to read API response:", error);

    throw error instanceof Error
      ? error
      : new Error("پاسخ نامعتبر از سرور دریافت شد.");
  }

  // -------------------------------------------------------
  // HTTP error
  // -------------------------------------------------------

  if (!response.ok) {
    throw new Error(
      result.error ??
        result.message ??
        `آپلود تصویر انجام نشد. کد خطا: ${response.status}`,
    );
  }

  // -------------------------------------------------------
  // API error
  // -------------------------------------------------------

  if (result.ok !== true) {
    throw new Error(
      result.error ?? result.message ?? "آپلود تصویر توسط سرور تایید نشد.",
    );
  }

  // -------------------------------------------------------
  // Validate returned URL
  // -------------------------------------------------------

  if (typeof result.url !== "string" || !result.url.trim()) {
    console.error("[uploadPhoto] Missing URL in API response:", result);

    throw new Error("آدرس تصویر از سرور دریافت نشد.");
  }

  // -------------------------------------------------------
  // Validate returned path
  // -------------------------------------------------------

  if (typeof result.path !== "string" || !result.path.trim()) {
    console.error("[uploadPhoto] Missing path in API response:", result);

    throw new Error("مسیر تصویر از سرور دریافت نشد.");
  }

  // -------------------------------------------------------
  // Success
  // -------------------------------------------------------

  return {
    url: result.url,
    path: result.path,
  };
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
  // Send delete request
  // -------------------------------------------------------

  let response: Response;

  try {
    response = await fetch("/api/admin/professionals/photo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({
        path: normalizedPath,
        type: normalizedType,
        professionalId: normalizedProfessionalId,
      }),
    });
  } catch (error) {
    console.error("[deleteUploadedPhoto] Network error:", error);

    throw new Error(
      "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت را بررسی کنید.",
    );
  }

  // -------------------------------------------------------
  // Read response safely
  // -------------------------------------------------------

  let result: ApiResponse;

  try {
    result = await readApiResponse(response);
  } catch (error) {
    console.error("[deleteUploadedPhoto] Failed to read API response:", error);

    throw error instanceof Error
      ? error
      : new Error("پاسخ نامعتبر از سرور دریافت شد.");
  }

  // -------------------------------------------------------
  // HTTP error
  // -------------------------------------------------------

  if (!response.ok) {
    throw new Error(
      result.error ??
        result.message ??
        `حذف تصویر انجام نشد. کد خطا: ${response.status}`,
    );
  }

  // -------------------------------------------------------
  // API error
  // -------------------------------------------------------

  if (result.ok !== true) {
    throw new Error(
      result.error ?? result.message ?? "حذف تصویر توسط سرور تایید نشد.",
    );
  }
}
