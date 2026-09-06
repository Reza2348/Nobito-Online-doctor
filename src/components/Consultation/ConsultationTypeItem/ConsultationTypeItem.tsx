import { FiArrowLeft } from "react-icons/fi";

import type { ConsultationTypeItemProps } from "@/Types/types";

const ConsultationTypeItem = ({
  icon,
  title,
  description,
}: ConsultationTypeItemProps) => {
  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-cyan-100 hover:bg-cyan-50/50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm transition group-hover:bg-cyan-600 group-hover:text-white">
        {icon}
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-slate-900">{title}</h4>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <FiArrowLeft
        size={18}
        className="text-slate-300 transition group-hover:-translate-x-1 group-hover:text-cyan-600"
      />
    </div>
  );
};

export default ConsultationTypeItem;
