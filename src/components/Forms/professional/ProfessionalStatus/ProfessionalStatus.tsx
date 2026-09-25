"use client";

import { StatusHeader } from "../ProfessionalStatus/StatusHeader/StatusHeader";
import { StatusMessage } from "../ProfessionalStatus/StatusMessage/StatusMessage";
import { StatusSwitch } from "../ProfessionalStatus/StatusSwitch/StatusSwitch";
import type { ProfessionalStatusProps } from "@/Types/types";

export default function ProfessionalStatus({
  title,
  isActive,
  onChange,
}: ProfessionalStatusProps) {
  const active = isActive === true;

  const handleToggle = () => {
    onChange(!active);
  };

  return (
    <section
      dir="rtl"
      className={`
        rounded-2xl
        border
        p-5
        sm:p-6
        transition-all
        duration-300
        ${
          active
            ? `
              border-emerald-200/80
              bg-emerald-50/30
              shadow-[0_2px_12px_rgba(16,185,129,0.06)]
              hover:border-emerald-300
              hover:shadow-[0_6px_24px_rgba(16,185,129,0.10)]
            `
            : `
              border-gray-200/80
              bg-white
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              hover:border-gray-300
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            `
        }
      `}
    >
      <div className="flex items-center justify-between gap-5">
        <StatusHeader title={title} active={active} />

        <StatusSwitch title={title} active={active} onToggle={handleToggle} />
      </div>

      <StatusMessage title={title} active={active} />
    </section>
  );
}
