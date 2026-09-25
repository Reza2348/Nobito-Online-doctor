import type { FeatureProps } from "@/Types/types";

const FeatureCard = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
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
