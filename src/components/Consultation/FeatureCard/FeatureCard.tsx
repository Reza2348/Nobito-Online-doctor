import type { FeatureProps } from "@/Types/types";

const FeatureCard = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        {icon}
      </div>

      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>

        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
