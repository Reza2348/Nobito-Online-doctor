import { FiCamera } from "react-icons/fi";

interface PhotoHeaderProps {
  title: string;
}

export function PhotoHeader({ title }: PhotoHeaderProps) {
  return (
    <header className="flex items-center gap-3">
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
    </header>
  );
}
