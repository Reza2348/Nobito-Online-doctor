import { FiCheckCircle, FiImage, FiTrash2 } from "react-icons/fi";

interface PhotoPreviewProps {
  title: string;
  photoPreview: string | null;
  onRemove: () => void;
  disabled: boolean;
}

export function PhotoPreview({
  title,
  photoPreview,
  onRemove,
  disabled,
}: PhotoPreviewProps) {
  if (!photoPreview) {
    return (
      <div className="flex h-36 w-36 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 sm:h-40 sm:w-40">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          <FiImage size={25} strokeWidth={1.5} />
        </div>

        <span className="mt-3 text-xs font-medium">بدون تصویر</span>

        <span className="mt-1 text-[10px]">هنوز تصویری انتخاب نشده</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="group relative h-36 w-36 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm sm:h-40 sm:w-40">
        <img
          src={photoPreview}
          alt={`تصویر ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-green-600 shadow-sm">
          <FiCheckCircle size={12} />
          آماده
        </span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`حذف تصویر ${title}`}
        title="حذف تصویر"
        className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white shadow-lg transition hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:pointer-events-none disabled:opacity-50"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}
