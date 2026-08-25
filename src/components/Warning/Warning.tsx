"use client";

import React from "react";
import { FiInfo } from "react-icons/fi";

const bulletPoints = [
  "لطفاً در زمان تعیین‌شده برای نوبت خود حضور داشته باشید.",
  "در صورت داشتن مدارک یا پرونده پزشکی مرتبط، آن‌ها را همراه خود بیاورید.",
  "پس از مراجعه، اطلاعات و سوابق درمانی شما در پرونده پزشکی ثبت خواهد شد.",
];

const Warning = () => {
  return (
    <section
      dir="rtl"
      className="
      mt-10
      w-full
      rounded-4xl
      border
      border-teal-100
      bg-gradient-to-br
      from-teal-50
      to-emerald-50
      p-6
      shadow-[0_12px_35px_rgba(0,0,0,.06)]
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-6
        "
      >
        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-white
          text-teal-600
          shadow-sm
          "
        >
          <FiInfo size={22} />
        </div>

        <div>
          <h2
            className="
            text-lg
            font-black
            text-gray-800
            "
          >
            نکات قبل از مراجعه
          </h2>

          <p
            className="
            mt-1
            text-xs
            text-gray-500
            "
          >
            برای تجربه بهتر مراجعه به پزشک
          </p>
        </div>
      </div>

      {/* Items */}

      <div
        className="
        space-y-3
        "
      >
        {bulletPoints.map((text, index) => (
          <div
            key={text}
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              bg-white
              p-4
              shadow-sm
              transition-all
              hover:-translate-y-1
              "
          >
            <span
              className="
                mt-1
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-teal-100
                text-xs
                font-bold
                text-teal-700
                "
            >
              {index + 1}
            </span>

            <p
              className="
                text-sm
                leading-7
                text-gray-600
                font-medium
                "
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Warning;
