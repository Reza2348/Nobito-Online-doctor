import { MdMedicalServices, MdRefresh } from "react-icons/md";

interface Props {
  onRefresh: () => void;
  disabled?: boolean;
}

export default function DoctorsTableHeader({
  onRefresh,
  disabled = false,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
          <MdMedicalServices size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">لیست پزشکان</h2>

          <p className="mt-1 text-sm text-gray-500">پزشکان ثبت‌شده در سامانه</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={disabled}
        className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-teal-100 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MdRefresh size={20} />
        بروزرسانی
      </button>
    </div>
  );
}
