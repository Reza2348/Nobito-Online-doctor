import React from "react";

const Survey = () => {
  const overallPercent = 70;

  const stats = [
    { label: "زمان انتظار در مطب", value: 60 },
    { label: "تشخیص درست", value: 80 },
    { label: "امکانات رفاهی", value: 90 },
    { label: "نظافت مطب", value: 75 },
    { label: "رفتار مناسب", value: 85 },
  ];

  const size = 130;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallPercent / 100) * circumference;

  return (
    <div
      className="max-w-xl mx-auto bg-[#fdfdfd] rounded-[2.5rem] p-8 border border-gray-200 shadow-sm font-[tahoma]"
      style={{ direction: "rtl" }}
    >
      {/* هدر */}
      <p className="text-gray-500 text-sm leading-7 mb-8 text-center px-4">
        از میان ۱۴۸۶۵ کاربر که تحت درمان دکتر بهرام میرزایی قرار گرفته اند ،
        ۱۳۲۵ کاربر این پزشک را پیشنهاد می کنند.
      </p>

      <div className="flex items-center justify-between gap-6 mb-8">
        {/* سمت چپ: stats + input */}
        <div className="flex-1 flex flex-col gap-4 border-l border-gray-100 pl-6">
          {stats.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-24 text-right">
                {item.label}
              </span>

              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3d7b75] rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}

          {/* input */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-gray-500 w-24 text-right">
              زمان انتظار پزشک
            </span>

            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#3d7b75]"
            />
          </div>
        </div>

        {/* سمت راست: دایره */}
        <div className="relative flex items-center justify-center min-w-37.5">
          <svg width={size} height={size}>
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={radius}
              cx={size / 2}
              cy={size / 2}
            />

            <circle
              stroke="#3d7b75"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              r={radius}
              cx={size / 2}
              cy={size / 2}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: "stroke-dashoffset 0.8s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-700">
              {overallPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 🔁 پایین: جای ستاره و متن عوض شد */}

      <div className="flex items-center justify-between px-2 flex-row-reverse">
        <p className="text-gray-600 font-medium">
          {overallPercent} درصد کاربران این پزشک را پیشنهاد می‌کنند
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`text-xl ${s === 5 ? "text-gray-300" : "text-orange-400"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Survey;
