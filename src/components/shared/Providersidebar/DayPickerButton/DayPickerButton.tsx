"use client";

import DatePicker from "react-multi-date-picker";
import type DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FiCalendar, FiChevronLeft } from "react-icons/fi";

import { formatJalaliDayLabel } from "@/lib/jalali";

interface DayPickerButtonProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export default function DayPickerButton({
  selectedDate,
  onChange,
}: DayPickerButtonProps) {
  const handleChange = (dateObject: DateObject | null) => {
    if (!dateObject) return;
    onChange(dateObject.toDate());
  };

  return (
    <DatePicker
      value={selectedDate}
      onChange={handleChange}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      minDate={new Date()}
      render={(_valueText, openCalendar) => (
        <button
          type="button"
          onClick={openCalendar}
          className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-right transition-colors hover:border-sky-300"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <FiCalendar size={17} />
          </span>

          <span className="flex-1 min-w-0">
            <span className="block text-[10px] font-medium text-slate-400">
              روز مشاوره
            </span>
            <span className="block truncate text-xs font-bold text-slate-700">
              {formatJalaliDayLabel(selectedDate)}
            </span>
          </span>

          <FiChevronLeft size={16} className="shrink-0 text-slate-300" />
        </button>
      )}
    />
  );
}
