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

  const size = 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (overallPercent / 100) * circumference;

  return (
    <div
      className="max-w-xl mx-auto bg-[#fdfdfd] rounded-3xl p-5 md:p-8 border border-gray-200 shadow-sm font-[tahoma]"
      dir="rtl"
    >
      <p className="text-gray-500 text-sm leading-7 mb-6 text-center">
        از میان ۱۴۸۶۵ کاربر که تحت درمان دکتر بهرام میرزایی قرار گرفته اند ،
        ۱۳۲۵ کاربر این پزشک را پیشنهاد می کنند.
      </p>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="order-1 md:order-2 flex justify-center shrink-0">
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
              }}
            />
          </svg>

          <div className="absolute flex items-center justify-center w-25 h-25">
            <span className="text-2xl font-bold text-gray-700">
              {overallPercent}%
            </span>
          </div>
        </div>

        <div className="order-2 md:order-1 flex-1 flex flex-col gap-4 w-full">
          {stats.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-24 wrap-break-word">
                {item.label}
              </span>

              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3d7b75] rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600 font-medium text-center md:text-right">
          {overallPercent} درصد کاربران این پزشک را پیشنهاد می‌کنند
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className={`text-xl ${
                s === 5 ? "text-gray-300" : "text-orange-400"
              }`}
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
