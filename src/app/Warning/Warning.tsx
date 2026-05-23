import React from "react";

const bulletPoints = [
  "حتما در زمان نوبت‌دهی حاضر باشید چرا که امکان ارفاق وجود ندارد.",
  "اگر قبلا پرونده پزشکی مرتبط دارید حتما همراه خود داشته باشید.",
  "بعداز مراجعه به پزشک اطلاعات شما در پرونده مجازی شما ثبت شده",
];

const Warning = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl"
        style={{ backgroundColor: "#1a6b62" }}
      >
        {/* pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 6px,
              rgba(255,255,255,0.3) 6px,
              rgba(255,255,255,0.3) 7px
            )`,
          }}
        />

        {/* content */}
        <div className="relative z-10 p-4 md:p-5" dir="rtl">
          <h2 className="text-white text-center font-bold text-base mb-4">
            ملاحظات قبل از مراجعه
          </h2>

          <ul className="space-y-3">
            {bulletPoints.map((text, index) => (
              <li key={index} className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: "#7ecfc8" }}
                />
                <p className="text-white text-sm leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Warning;
