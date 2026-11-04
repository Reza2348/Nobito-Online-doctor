import { FiArrowLeft } from "react-icons/fi";

import type { ConsultationTypeItemProps } from "@/Types/types";

const ConsultationTypeItem = ({
  icon,
  title,
  description,
}: ConsultationTypeItemProps) => {
  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-brand-soft hover:bg-brand/20">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm transition group-hover:bg-brand group-hover:text-white">
        {icon}
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-slate-900">{title}</h4>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <FiArrowLeft
        size={18}
        className="text-slate-300 transition group-hover:text-brand"
      />
    </div>
  );
};

export default ConsultationTypeItem;
