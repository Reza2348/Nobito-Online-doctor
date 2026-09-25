interface Props {
  rating: number | null;
  satisfiedPercent: string | number | null;
  patientsSatisfied: number | null;
}

export default function ClinicsBadges({
  rating,
  satisfiedPercent,
  patientsSatisfied,
}: Props) {
  return (
    <div className="mt-5 flex min-h-8.5 items-center flex-wrap gap-2">
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
        {satisfiedPercent ?? "۹۷٪"} رضایت
      </span>

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
        {patientsSatisfied?.toLocaleString("fa-IR") ?? "1000+"}
        مراجعه
      </span>
    </div>
  );
}
