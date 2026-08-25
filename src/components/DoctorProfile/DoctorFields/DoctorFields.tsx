"use client";

import React from "react";
import { FiCheck, FiGrid } from "react-icons/fi";

interface Props {
  fields?: string[];
}

const DoctorFields: React.FC<Props> = ({ fields }) => {
  if (!fields?.length) {
    return null;
  }

  return (
    <div dir="rtl" className="w-full">
      {/* Header */}

      <div
        className="
          mb-5
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
            text-emerald-600
            ring-1
            ring-emerald-100/70
          "
        >
          <FiGrid size={17} strokeWidth={2.2} />
        </div>

        <div>
          <h3
            className="
              text-sm
              font-black
              text-gray-900
            "
          >
            زمینه‌های تخصصی
          </h3>

          <p
            className="
              mt-1
              text-[11px]
              font-medium
              leading-5
              text-gray-400
            "
          >
            حوزه‌های فعالیت و خدمات پزشکی
          </p>
        </div>
      </div>

      {/* Fields */}

      <div
        className="
          flex
          flex-wrap
          gap-2.5
        "
      >
        {fields.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-gray-100
              bg-gray-50/80
              px-3
              py-2.5
              text-xs
              font-bold
              text-gray-600
              shadow-[0_1px_2px_rgba(0,0,0,0.02)]
              transition-all
              duration-200
              ease-out
              hover:-translate-y-0.5
              hover:border-emerald-100
              hover:bg-emerald-50
              hover:text-emerald-700
              hover:shadow-sm
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-gray-400
                shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                transition-all
                duration-200
                group-hover:bg-emerald-500
                group-hover:text-white
                group-hover:shadow-none
              "
            >
              <FiCheck size={11} strokeWidth={3} />
            </span>

            <span className="leading-5">{tag}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DoctorFields;
