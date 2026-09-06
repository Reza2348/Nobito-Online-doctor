"use client";

import { MdPsychology, MdRefresh } from "react-icons/md";

interface Props {
  onRefresh?: () => void | Promise<void>;
  disabled?: boolean;
}

export default function ConsultantsTableHeader({
  onRefresh,
  disabled = false,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* عنوان */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
          <MdPsychology size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

          <p className="mt-1 text-sm text-gray-500">
            مشاوران ثبت‌شده در سامانه
          </p>
        </div>
      </div>

      {/* دکمه Refresh */}
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdRefresh size={20} />
          بروزرسانی
        </button>
      )}
    </div>
  );
}
