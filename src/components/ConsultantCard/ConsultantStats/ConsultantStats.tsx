import { MdGroups, MdStar } from "react-icons/md";

import {
  calculateSatisfaction,
  formatRating,
  normalizeRating,
} from "@/components/ConsultantCard/utils/consultant-card.utils";

interface ConsultantStatsProps {
  ratingValue: unknown;
}

export default function ConsultantStats({ ratingValue }: ConsultantStatsProps) {
  const rating = normalizeRating(ratingValue);
  const satisfaction = calculateSatisfaction(ratingValue);

  return (
    <div
      className="
        grid
        shrink-0
        grid-cols-2
        gap-3
        xl:w-80
      "
    >
      {/* امتیاز */}
      <div
        className="
          rounded-2xl
          border
          border-amber-100
          bg-amber-50/70
          p-4
        "
      >
        <div
          className="
            mb-2
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-500
          "
        >
          <MdStar className="text-amber-500" size={19} />

          <span>امتیاز</span>
        </div>

        <div
          className="
            flex
            items-end
            gap-1
          "
        >
          <span
            className="
              text-2xl
              font-black
              text-slate-900
            "
          >
            {formatRating(ratingValue)}
          </span>

          {rating !== null && (
            <span
              className="
                mb-1
                text-xs
                text-slate-400
              "
            >
              / ۵
            </span>
          )}
        </div>
      </div>

      {/* میزان رضایت */}
      <div
        className="
          rounded-2xl
          border
          border-emerald-100
          bg-emerald-50/70
          p-4
        "
      >
        <div
          className="
            mb-2
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-slate-500
          "
        >
          <MdGroups className="text-emerald-600" size={19} />

          <span>میزان رضایت</span>
        </div>

        <div
          className="
            text-2xl
            font-black
            text-slate-900
          "
        >
          {satisfaction !== null ? `${satisfaction}٪` : "ثبت نشده"}
        </div>

        <div
          className="
            mt-1
            text-xs
            text-slate-400
          "
        >
          محاسبه‌شده از امتیاز
        </div>
      </div>
    </div>
  );
}
