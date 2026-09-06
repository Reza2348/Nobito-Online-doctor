"use client";

import { useCallback, useEffect, useState } from "react";

import type { ChangeEvent } from "react";

import {
  deleteUploadedPhoto,
  uploadPhoto,
} from "@/components/Forms/utils/professionalUpload";

import type { ProfessionalType } from "@/Types/types";

interface UseProfessionalPhotoReturn {
  photo: File | null;
  photoPreview: string | null;
  uploadedPhotoPath: string | null;
  photoError: string | null;

  handlePhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;

  removePhoto: () => void;

  uploadProfessionalPhoto: (
    overrideProfessionalId?: string,
  ) => Promise<string | null>;

  deleteProfessionalPhoto: () => Promise<void>;

  setPhoto: React.Dispatch<React.SetStateAction<File | null>>;

  setPhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export function useProfessionalPhoto(
  type: ProfessionalType,
  professionalId?: string | null,
): UseProfessionalPhotoReturn {
  const [photo, setPhoto] = useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [uploadedPhotoPath, setUploadedPhotoPath] = useState<string | null>(
    null,
  );

  const [photoError, setPhotoError] = useState<string | null>(null);

  // --------------------------------------------------
  // Create / revoke preview URL
  // --------------------------------------------------

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(photo);

    setPhotoPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [photo]);

  // --------------------------------------------------
  // Handle file selection
  // --------------------------------------------------

  const handlePhotoChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPhotoError(null);

      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      // ----------------------------------------------
      // Empty file
      // ----------------------------------------------

      if (file.size === 0) {
        setPhoto(null);

        setPhotoError("فایل تصویر خالی است.");

        event.target.value = "";
        return;
      }

      // ----------------------------------------------
      // Validate file type
      // ----------------------------------------------

      if (!(ALLOWED_TYPES as readonly string[]).includes(file.type)) {
        setPhoto(null);

        setPhotoError(
          "فرمت عکس مجاز نیست. فقط JPG، PNG و WebP قابل استفاده هستند.",
        );

        event.target.value = "";
        return;
      }

      // ----------------------------------------------
      // Validate file size
      // ----------------------------------------------

      if (file.size > MAX_FILE_SIZE) {
        setPhoto(null);

        setPhotoError("حجم عکس نباید بیشتر از ۵ مگابایت باشد.");

        event.target.value = "";
        return;
      }

      // ----------------------------------------------
      // Valid
      // ----------------------------------------------

      setPhoto(file);

      // عکس جدید هنوز Upload نشده
      setUploadedPhotoPath(null);
    },
    [],
  );

  // --------------------------------------------------
  // Remove selected photo
  // --------------------------------------------------

  const removePhoto = useCallback(() => {
    setPhoto(null);
    setPhotoPreview(null);
    setUploadedPhotoPath(null);
    setPhotoError(null);
  }, []);

  // --------------------------------------------------
  // Upload photo
  // --------------------------------------------------

  const uploadProfessionalPhoto = useCallback(
    async (overrideProfessionalId?: string): Promise<string | null> => {
      if (!photo) {
        return null;
      }

      setPhotoError(null);

      const idToUse = (overrideProfessionalId ?? professionalId ?? "").trim();

      if (!idToUse) {
        const errorMessage =
          "ابتدا باید اطلاعات متخصص ذخیره شود تا شناسه متخصص ایجاد شود.";

        setPhotoError(errorMessage);

        throw new Error(errorMessage);
      }

      try {
        const result = await uploadPhoto(photo, idToUse, type);

        setUploadedPhotoPath(result.path);

        return result.url;
      } catch (error) {
        console.error("Photo upload error:", error);

        const message =
          error instanceof Error ? error.message : "آپلود عکس با خطا مواجه شد.";

        setPhotoError(message);

        throw error;
      }
    },
    [photo, professionalId, type],
  );

  // --------------------------------------------------
  // Delete uploaded photo
  // --------------------------------------------------

  const deleteProfessionalPhoto = useCallback(async (): Promise<void> => {
    if (!uploadedPhotoPath) {
      return;
    }

    setPhotoError(null);

    try {
      await deleteUploadedPhoto(
        uploadedPhotoPath,
        type,
        professionalId ?? undefined,
      );

      setUploadedPhotoPath(null);
    } catch (error) {
      console.error("Photo deletion error:", error);

      const message =
        error instanceof Error ? error.message : "حذف عکس با خطا مواجه شد.";

      setPhotoError(message);

      throw error;
    }
  }, [uploadedPhotoPath, type, professionalId]);

  // --------------------------------------------------
  // Return
  // --------------------------------------------------

  return {
    photo,
    photoPreview,
    uploadedPhotoPath,
    photoError,

    handlePhotoChange,
    removePhoto,

    uploadProfessionalPhoto,
    deleteProfessionalPhoto,

    setPhoto,
    setPhotoPreview,
  };
}
