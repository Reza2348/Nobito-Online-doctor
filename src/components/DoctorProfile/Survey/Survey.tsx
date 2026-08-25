"use client";

import React from "react";

interface SurveyStat {
  label: string;
  value: number;
}

interface SurveyProps {
  /** به چی داریم امتیاز می‌دیم؟ مثلاً "پزشک" یا "کلینیک" */
  entityLabel?: string;
  overallPercent?: number;
  stats?: SurveyStat[];
}

const defaultStats: SurveyStat[] = [
  { label: "زمان انتظار در مطب", value: 60 },
  { label: "تشخیص درست", value: 80 },
  { label: "امکانات رفاهی", value: 90 },
  { label: "نظافت مطب", value: 75 },
  { label: "رفتار مناسب", value: 85 },
];

const Survey: React.FC<SurveyProps> = ({
  entityLabel = "پزشک",
  overallPercent = 70,
  stats = defaultStats,
}) => {
  return (
    <section
      dir="rtl"
      className="
      mt-10
      rounded-4xl
      border
      border-gray-100
      bg-white
      p-6
      md:p-8
      shadow-[0_15px_40px_rgba(0,0,0,.06)]
      "
    >
      {/* HEADER */}

      <div className="mb-8 text-right">
        <h2
          className="
          text-xl
          font-black
          text-gray-800
          "
        >
          رضایت بیماران
        </h2>

        <p
          className="
          mt-2
          text-sm
          text-gray-400
          "
        >
          بررسی تجربه واقعی مراجعه‌کنندگان
        </p>
      </div>

      <div
        className="
        flex
        flex-col
        md:flex-row
        items-center
        gap-10
        "
      >
        {/* SCORE */}

        <div
          className="
          relative
          flex
          h-36
          w-36
          shrink-0
          items-center
          justify-center
          "
        >
          <svg width="140" height="140" className="-rotate-90">
            <circle
              cx="70"
              cy="70"
              r="58"
              stroke="#f1f5f9"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="70"
              cy="70"
              r="58"
              stroke="#14b8a6"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="364"
              strokeDashoffset={364 - (364 * overallPercent) / 100}
            />
          </svg>

          <div
            className="
            absolute
            flex
            flex-col
            items-center
            "
          >
            <span
              className="
              text-3xl
              font-black
              text-gray-800
              "
            >
              {overallPercent}٪
            </span>

            <span
              className="
              text-xs
              text-gray-400
              "
            >
              رضایت
            </span>
          </div>
        </div>

        {/* PROGRESS */}

        <div
          className="
          flex-1
          w-full
          space-y-5
          "
        >
          {stats.map((item) => (
            <div key={item.label}>
              <div
                className="
                  mb-2
                  flex
                  justify-between
                  text-xs
                  font-bold
                  text-gray-600
                  "
              >
                <span>{item.label}</span>

                <span className="text-teal-600">{item.value}٪</span>
              </div>

              <div
                className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-gray-100
                  "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-teal-500
                    to-emerald-400
                    transition-all
                    duration-700
                    "
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
        mt-8
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-4
        border-t
        border-gray-100
        pt-5
        "
      >
        <p
          className="
          text-sm
          font-bold
          text-gray-600
          "
        >
          {overallPercent}٪ کاربران این {entityLabel} را پیشنهاد می‌کنند
        </p>

        <div
          className="
          flex
          gap-1
          rounded-full
          bg-orange-50
          px-4
          py-2
          "
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={
                star <= 4 ? "text-orange-400 text-lg" : "text-gray-300 text-lg"
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Survey;
