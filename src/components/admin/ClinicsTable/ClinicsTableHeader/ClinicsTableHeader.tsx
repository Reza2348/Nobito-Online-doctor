import { MdLocalHospital, MdRefresh } from "react-icons/md";

interface Props {
  onRefresh: () => void;
  refreshing?: boolean;
}

export default function ClinicsTableHeader({
  onRefresh,
  refreshing = false,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-12 w-12 items-center
            justify-center rounded-2xl
            bg-linear-to-br
            from-blue-500 to-cyan-400
            text-white shadow-lg
          "
        >
          <MdLocalHospital size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">کلینیک‌ها</h1>

          <p className="text-sm text-gray-500">مدیریت مراکز درمانی سیستم</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        className="
          flex items-center gap-2
          rounded-xl bg-gray-100
          px-4 py-2 text-sm
          font-medium text-gray-700
          transition
          hover:bg-blue-100
          hover:text-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdRefresh size={20} className={refreshing ? "animate-spin" : ""} />
        بروزرسانی
      </button>
    </div>
  );
}
