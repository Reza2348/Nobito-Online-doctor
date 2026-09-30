interface ClinicsBadgesProps {
  rating?: number;
  satisfiedPercent?: number | string;
  patientsSatisfied?: number;
}

function normalizePercent(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace("%", "").trim());

    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

export default function ClinicsBadges({
  rating,
  satisfiedPercent,
  patientsSatisfied,
}: ClinicsBadgesProps) {
  const normalizedSatisfiedPercent = normalizePercent(satisfiedPercent);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {typeof rating === "number" && rating > 0 && (
        <span
          className="
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
          "
        >
          ⭐ {rating}
        </span>
      )}

      {normalizedSatisfiedPercent !== null && (
        <span
          className="
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-bold
            text-emerald-700
          "
        >
          {normalizedSatisfiedPercent}٪ رضایت
        </span>
      )}

      {typeof patientsSatisfied === "number" && (
        <span
          className="
            rounded-full
            bg-sky-50
            px-3
            py-1
            text-xs
            font-bold
            text-sky-700
          "
        >
          {patientsSatisfied.toLocaleString("fa-IR")} بیمار راضی
        </span>
      )}
    </div>
  );
}
