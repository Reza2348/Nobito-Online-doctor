import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface PanelCardProps {
  title: string;
  description?: string;
  icon: IconType;
  /** رنگ نشان آیکون کنار عنوان */
  tone?: "teal" | "indigo" | "amber" | "slate";
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

const toneClasses = {
  teal: "bg-teal-50 text-teal-700 ring-teal-100",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
} as const;

export default function PanelCard({
  title,
  description,
  icon: Icon,
  tone = "teal",
  action,
  className = "",
  children,
}: PanelCardProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] sm:p-6 ${className}`}
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${toneClasses[tone]}`}
          >
            <Icon size={22} />
          </span>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {action}
      </header>

      <div className="mt-5">{children}</div>
    </section>
  );
}
