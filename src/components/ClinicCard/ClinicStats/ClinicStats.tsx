import { MdStar } from "react-icons/md";

import {
  calculateSatisfaction,
  formatNumber,
  formatRating,
  toSafeNumber,
} from "@/components/ClinicCard/utils/clinic-card.utils";

interface ClinicStatsProps {
  rating: unknown;
  satisfiedPercent: unknown;
  patientsSatisfied: unknown;
}

export default function ClinicStats({
  rating,
  satisfiedPercent,
  patientsSatisfied,
}: ClinicStatsProps) {
  const normalizedRating = toSafeNumber(rating);

  const normalizedSatisfiedPercent = toSafeNumber(satisfiedPercent);

  const normalizedPatientsSatisfied = toSafeNumber(patientsSatisfied, null);

  const calculatedSatisfaction = calculateSatisfaction(normalizedRating);

  const displaySatisfaction =
    normalizedSatisfiedPercent !== null
      ? normalizedSatisfiedPercent
      : calculatedSatisfaction;

  return (
    <div
      className="
        flex
        shrink-0
        flex-wrap
        items-center
        gap-3
      "
    >
      {/* Rating */}
      <div
        className="
          flex
          flex-col
          items-center
          rounded-2xl
          border
          border-amber-100
          bg-linear-to-br
          from-amber-50
          to-orange-50
          px-4
          py-2.5
          shadow-sm
        "
      >
        <span
          className="
            mb-1
            flex
            items-center
            gap-1
            text-[10px]
            font-bold
            text-amber-600
          "
        >
          <MdStar size={13} />
          امتیاز
        </span>

        <div
          className="
            flex
            items-baseline
            gap-0.5
          "
        >
          <span
            className="
              text-lg
              font-black
              text-amber-700
            "
          >
            {formatRating(rating)}
          </span>

          <span
            className="
              text-[9px]
              font-semibold
              text-amber-500
            "
          >
            /۵
          </span>
        </div>
      </div>

      {/* Satisfaction */}
      {displaySatisfaction !== null && (
        <div
          className="
            flex
            flex-col
            items-center
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50
            px-4
            py-2.5
            shadow-sm
          "
        >
          <span
            className="
              mb-1
              text-[10px]
              font-bold
              text-emerald-600
            "
          >
            میزان رضایت
          </span>

          <span
            className="
              text-lg
              font-black
              text-emerald-700
            "
          >
            {displaySatisfaction}٪
          </span>

          {normalizedSatisfiedPercent === null &&
            calculatedSatisfaction !== null && (
              <span
                className="
                  mt-0.5
                  text-[9px]
                  text-emerald-500
                "
              >
                محاسبه‌شده از امتیاز
              </span>
            )}
        </div>
      )}

      {/* Patients */}
      {normalizedPatientsSatisfied !== null && (
        <div
          className="
            flex
            flex-col
            items-center
            rounded-2xl
            border
            border-slate-100
            bg-slate-50
            px-4
            py-2.5
          "
        >
          <span
            className="
              mb-1
              text-[10px]
              font-bold
              text-slate-400
            "
          >
            بیماران راضی
          </span>

          <span
            className="
              text-lg
              font-black
              text-slate-800
            "
          >
            {formatNumber(normalizedPatientsSatisfied)}
          </span>
        </div>
      )}
    </div>
  );
}
