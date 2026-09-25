"use client";

import { PhotoError } from "./PhotoError/PhotoError";
import { PhotoFooter } from "./PhotoFooter/PhotoFooter";
import { PhotoHeader } from "./PhotoHeader/PhotoHeader";
import { PhotoMeta } from "./PhotoMeta/PhotoMeta";
import { PhotoPreview } from "./PhotoPreview/PhotoPreview";
import { UploadArea } from "./UploadArea/UploadArea";

import type { ProfessionalPhotoProps } from "@/Types/types";

export default function ProfessionalPhoto({
  title,
  photoPreview,
  onRemove,
  onChange,
  error = null,
  disabled = false,
  loading = false,
  isUploading = false,
  uploadProgress = 0,
}: ProfessionalPhotoProps) {
  const inputId = `professional-photo-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const isDisabled = disabled || loading || isUploading;

  const cardClassName = [
    "overflow-hidden rounded-2xl border bg-white",
    "transition-all duration-300",
    error
      ? "border-red-200 shadow-sm shadow-red-100"
      : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
  ].join(" ");

  return (
    <section dir="rtl" className="space-y-4">
      <PhotoHeader title={title} />

      <div className={cardClassName}>
        <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
          {/* Preview */}
          <div className="flex justify-center lg:block">
            <PhotoPreview
              title={title}
              photoPreview={photoPreview}
              onRemove={onRemove}
              disabled={isDisabled}
            />
          </div>

          {/* Upload */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <UploadArea
              inputId={inputId}
              photoPreview={photoPreview}
              disabled={isDisabled}
              loading={loading}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              error={error}
              onChange={onChange}
            />

            <PhotoMeta hasPhoto={Boolean(photoPreview)} />

            <PhotoError error={error} />
          </div>
        </div>

        <PhotoFooter />
      </div>
    </section>
  );
}
