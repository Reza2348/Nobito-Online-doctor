import { FiCheck } from "react-icons/fi";

import {
  formatJalaliDayLabel,
  formatTime,
  toPersianDigits,
} from "@/lib/jalali";

import type { Slot, SlotType } from "@/Types/types";

interface SlotListProps {
  type: SlotType;
  slots: Slot[];
  selectedSlotId: string | undefined;
  price: number;
  onSelect: (slotId: string) => void;
}

const formatToman = (value: number) =>
  toPersianDigits(value.toLocaleString("en-US"));

export default function SlotList({
  type,
  slots,
  selectedSlotId,
  price,
  onSelect,
}: SlotListProps) {
  return (
    <>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-[11px] font-bold text-slate-400">
          زمان‌های خالی · {type === "inPerson" ? "حضوری" : "آنلاین"}
        </p>
        <p className="text-[11px] font-bold text-sky-600">
          {formatToman(price)} تومان
        </p>
      </div>

      <div className="space-y-2">
        {slots.map((slot) => {
          const active = slot.id === selectedSlotId;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelect(slot.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-right transition-all ${
                active
                  ? "border-sky-500 bg-sky-50/60"
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  active
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-slate-200 text-transparent"
                }`}
              >
                <FiCheck size={12} strokeWidth={3} />
              </span>

              <span className="flex flex-1 items-baseline justify-between pr-3">
                <span className="text-xs font-bold text-slate-700">
                  {formatJalaliDayLabel(slot.date)}
                </span>
                <span
                  dir="ltr"
                  className={`text-sm font-black tabular-nums ${
                    active ? "text-sky-700" : "text-slate-800"
                  }`}
                >
                  {formatTime(slot.date)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
