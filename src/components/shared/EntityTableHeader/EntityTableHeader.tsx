import React from "react";
import { MdRefresh } from "react-icons/md";

type Accent = "blue" | "purple" | "teal";

const ACCENT_CLASSES: Record<Accent, { iconBox: string; hover: string }> = {
  blue: {
    iconBox: "bg-linear-to-br from-blue-500 to-cyan-400 text-white shadow-lg",
    hover: "hover:bg-blue-100 hover:text-blue-700",
  },
  purple: {
    iconBox: "bg-purple-100 text-purple-600",
    hover: "hover:bg-gray-200",
  },
  teal: {
    iconBox: "bg-teal-100 text-teal-600",
    hover: "hover:bg-teal-100 hover:text-teal-700",
  },
};

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent?: Accent;
  onRefresh?: () => void;
  refreshing?: boolean;
}

/**
 * هدر مشترک جدول‌های ادمین.
 * جایگزین: ClinicsTableHeader, ConsultantsTableHeader, DoctorsTableHeader
 */
export default function EntityTableHeader({
  icon,
  title,
  subtitle,
  accent = "blue",
  onRefresh,
  refreshing = false,
}: Props) {
  const classes = ACCENT_CLASSES[accent];

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${classes.iconBox}`}
        >
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className={`
            flex items-center gap-2
            rounded-xl bg-gray-100
            px-4 py-2 text-sm
            font-medium text-gray-700
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${classes.hover}
          `}
        >
          <MdRefresh size={20} className={refreshing ? "animate-spin" : ""} />
          بروزرسانی
        </button>
      )}
    </div>
  );
}
