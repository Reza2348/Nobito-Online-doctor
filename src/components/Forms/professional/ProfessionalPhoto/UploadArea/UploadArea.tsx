import type { ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { UploadProgress } from "../UploadProgress/UploadProgress";

const IMAGE_FORMATS = ["JPG", "PNG", "WEBP"] as const;

const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

interface UploadAreaProps {
  inputId: string;
  photoPreview: string | null;
  disabled: boolean;
  loading: boolean;
  isUploading: boolean;
  uploadProgress: number;
  error?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadArea({
  inputId,
  photoPreview,
  disabled,
  loading,
  isUploading,
  uploadProgress,
  error,
  onChange,
}: UploadAreaProps) {
  const message = isUploading
    ? `در حال آپلود... ${uploadProgress}%`
    : loading
      ? "در حال پردازش تصویر..."
      : photoPreview
        ? "برای تغییر تصویر کلیک کنید"
        : "برای انتخاب تصویر کلیک کنید";

  const uploadClassName = [
    "group relative flex min-h-36 cursor-pointer flex-col",
    "items-center justify-center rounded-2xl border-2 border-dashed",
    "px-5 py-6 text-center transition-all duration-300",
    disabled
      ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
      : error
        ? "border-red-300 bg-red-50/40 hover:border-red-400"
        : "border-gray-300 bg-gray-50/70 hover:border-blue-400 hover:bg-blue-50/50",
  ].join(" ");

  return (
    <label htmlFor={inputId} className={uploadClassName}>
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
        <FiUploadCloud size={23} />
      </div>

      <span className="text-sm font-semibold text-gray-700">{message}</span>

      <span className="mt-1.5 text-xs text-gray-400">
        یا فایل را اینجا انتخاب کنید
      </span>

      <div className="mt-4 flex items-center gap-2">
        {IMAGE_FORMATS.map((format) => (
          <span
            key={format}
            className="rounded-md bg-white px-2 py-1 text-[10px] font-medium text-gray-500 shadow-sm"
          >
            {format}
          </span>
        ))}
      </div>

      <input
        id={inputId}
        name="professional-photo"
        type="file"
        accept={IMAGE_ACCEPT}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />

      {isUploading && <UploadProgress progress={uploadProgress} />}
    </label>
  );
}
