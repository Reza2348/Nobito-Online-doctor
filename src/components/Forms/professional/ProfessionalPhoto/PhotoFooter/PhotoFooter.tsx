import { FiCheckCircle, FiFile, FiImage } from "react-icons/fi";

export function PhotoFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/70 px-4 py-3 sm:px-5">
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
    </footer>
  );
}
