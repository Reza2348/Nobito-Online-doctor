"use client";

import type { ChangeEvent } from "react";
import {
  FiCamera,
  FiCheckCircle,
  FiFile,
  FiImage,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

interface ProfessionalPhotoProps {
  title: string;
  photoPreview: string | null;
  onRemove: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  disabled?: boolean;
  loading?: boolean;
}

export default function ProfessionalPhoto({
  title,
  photoPreview,
  onRemove,
  onChange,
  error = null,
  disabled = false,
  loading = false,
}: ProfessionalPhotoProps) {
  const inputId = `professional-photo-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <section dir="rtl" className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FiCamera size={19} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900 sm:text-base">
            تصویر {title}
          </h3>

          <p className="mt-0.5 text-xs text-gray-500">
            یک تصویر مناسب برای پروفایل انتخاب کنید
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div
        className={`
          overflow-hidden rounded-2xl border bg-white
          transition-all duration-300
          ${
            error
              ? "border-red-200 shadow-sm shadow-red-100"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
          }
        `}
      >
        <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
          {/* Preview */}
          <div className="flex justify-center lg:block">
            <div className="relative">
              {photoPreview ? (
                <>
                  <div className="group relative h-36 w-36 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm sm:h-40 sm:w-40">
                    <img
                      src={photoPreview}
                      alt={`تصویر ${title}`}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Uploaded Badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-green-600 shadow-sm backdrop-blur-sm">
                      <FiCheckCircle size={12} />
                      آماده
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={onRemove}
                    disabled={disabled || loading}
                    aria-label={`حذف تصویر ${title}`}
                    title="حذف تصویر"
                    className="
                      absolute -left-2 -top-2
                      flex h-8 w-8 items-center justify-center
                      rounded-full border-2 border-white
                      bg-red-500 text-white shadow-lg
                      transition-all duration-200
                      hover:scale-110 hover:bg-red-600
                      focus:outline-none focus:ring-2
                      focus:ring-red-500 focus:ring-offset-2
                      disabled:pointer-events-none
                      disabled:opacity-50
                    "
                  >
                    <FiTrash2 size={14} />
                  </button>
                </>
              ) : (
                <div
                  className="
                    flex h-36 w-36 flex-col items-center justify-center
                    rounded-2xl border-2 border-dashed
                    border-gray-300 bg-gray-50
                    text-gray-400
                    sm:h-40 sm:w-40
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
                    <FiImage size={25} strokeWidth={1.5} />
                  </div>

                  <span className="mt-3 text-xs font-medium">بدون تصویر</span>

                  <span className="mt-1 text-[10px] text-gray-400">
                    هنوز تصویری انتخاب نشده
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <label
              htmlFor={inputId}
              className={`
                group relative flex min-h-36 cursor-pointer
                flex-col items-center justify-center
                rounded-2xl border-2 border-dashed
                px-5 py-6 text-center
                transition-all duration-300
                ${
                  disabled || loading
                    ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                    : error
                      ? "border-red-300 bg-red-50/40 hover:border-red-400"
                      : "border-gray-300 bg-gray-50/70 hover:border-blue-400 hover:bg-blue-50/50"
                }
              `}
            >
              {/* Upload Icon */}
              <div
                className="
                  mb-3 flex h-12 w-12 items-center justify-center
                  rounded-2xl bg-blue-100 text-blue-600
                  shadow-sm
                  transition-all duration-300
                  group-hover:scale-110 group-hover:bg-blue-600
                  group-hover:text-white
                "
              >
                <FiUploadCloud size={23} />
              </div>

              {/* Main Text */}
              <span className="text-sm font-semibold text-gray-700">
                {loading
                  ? "در حال پردازش تصویر..."
                  : photoPreview
                    ? "برای تغییر تصویر کلیک کنید"
                    : "برای انتخاب تصویر کلیک کنید"}
              </span>

              <span className="mt-1.5 text-xs text-gray-400">
                یا فایل را اینجا انتخاب کنید
              </span>

              {/* Formats */}
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-md bg-white px-2 py-1 text-[10px] font-medium text-gray-500 shadow-sm">
                  JPG
                </span>

                <span className="rounded-md bg-white px-2 py-1 text-[10px] font-medium text-gray-500 shadow-sm">
                  PNG
                </span>

                <span className="rounded-md bg-white px-2 py-1 text-[10px] font-medium text-gray-500 shadow-sm">
                  WEBP
                </span>
              </div>

              <input
                id={inputId}
                name="professional-photo"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={onChange}
                disabled={disabled || loading}
                className="sr-only"
              />
            </label>

            {/* File Information */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FiFile size={13} />
                <span>حداکثر حجم: ۵ مگابایت</span>
              </div>

              {photoPreview && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <FiCheckCircle size={13} />
                  تصویر انتخاب شده
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-600">
                <FiX className="mt-0.5 shrink-0" size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-gray-400 sm:justify-start">
            <span className="flex items-center gap-1.5">
              <FiCheckCircle size={12} className="text-green-500" />
              کیفیت مناسب پروفایل
            </span>

            <span className="flex items-center gap-1.5">
              <FiImage size={12} />
              فرمت‌های تصویری استاندارد
            </span>

            <span className="flex items-center gap-1.5">
              <FiFile size={12} />
              حداکثر ۵MB
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
