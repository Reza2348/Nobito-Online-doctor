import {
  formatJalaliDayLabel,
  formatTime,
  toPersianDigits,
} from "@/lib/jalali";

import type { Slot } from "@/Types/types";

interface BookingFooterProps {
  price: number;
  selectedSlot: Slot;
  submitting: boolean;
  bookButtonBorderClass: string;
  onBook: () => void;
}

const formatToman = (value: number) =>
  toPersianDigits(value.toLocaleString("en-US"));

export default function BookingFooter({
  price,
  selectedSlot,
  submitting,
  bookButtonBorderClass,
  onBook,
}: BookingFooterProps) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-50 bg-slate-50/60 px-5 py-5 sm:px-6">
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black tracking-tight text-slate-900">
            {formatToman(price)}
          </span>
          <span className="text-[11px] font-medium text-slate-400">تومان</span>
        </div>
        <p className="mt-0.5 text-[10px] text-slate-400">
          {formatJalaliDayLabel(selectedSlot.date)} ·{" "}
          {formatTime(selectedSlot.date)}
        </p>
      </div>

      <button
        type="button"
        onClick={onBook}
        disabled={submitting}
        className={`inline-flex min-w-32 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-3 text-sm font-bold transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-sky-100 disabled:cursor-not-allowed disabled:opacity-60 ${bookButtonBorderClass}`}
      >
        {submitting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" />
        ) : (
          "رزرو نوبت"
        )}
      </button>
    </div>
  );
}
