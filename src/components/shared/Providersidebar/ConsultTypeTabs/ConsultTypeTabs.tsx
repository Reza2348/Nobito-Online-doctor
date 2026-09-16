"use client";

import { consultTypes } from "@/components/shared/Providersidebar/constants/constants";
import type { ConsultType } from "@/Types/types";

interface ConsultTypeTabsProps {
  activeType: ConsultType;
  onChange: (type: ConsultType) => void;
}

export default function ConsultTypeTabs({
  activeType,
  onChange,
}: ConsultTypeTabsProps) {
  const activeIndex = consultTypes.findIndex((t) => t.id === activeType);

  return (
    <div className="px-5 pt-5 sm:px-6">
      <div className="relative grid grid-cols-4 rounded-2xl bg-slate-50 p-1">
        <div
          className="absolute inset-y-1 rounded-xl bg-white shadow-[0_1px_6px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out"
          style={{
            width: `calc(25% - 4px)`,
            transform: `translateX(${activeIndex * -100}%)`,
            right: "4px",
          }}
        />

        {consultTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative z-10 flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-[10px] font-bold transition-colors ${
              activeType === t.id ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
