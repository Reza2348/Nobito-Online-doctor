"use client";

import React from "react";
import type { Consultant } from "@/Types/types";
import { FaUserTie, FaRegCheckCircle } from "react-icons/fa";
import { FiBookOpen, FiTag } from "react-icons/fi";

interface ConsultantBioProps {
  consultant: Consultant;
}

const ConsultantBio: React.FC<ConsultantBioProps> = ({ consultant }) => {
  const consultantName = consultant.name?.trim() || "مشاور";

  const specialty = consultant.specialty?.trim() || "تخصص ثبت نشده";

  const bio =
    consultant.bio?.trim() ||
    "این مشاور با تجربه و دانش تخصصی خود، خدمات مشاوره‌ای را با هدف ارائه راهکارهای مناسب و متناسب با نیاز مراجعان ارائه می‌دهد.";

  const fields = Array.isArray(consultant.fields)
    ? consultant.fields.filter((field) => field && String(field).trim())
    : [];

  return (
    <section
      dir="rtl"
      aria-label={`درباره ${consultantName}`}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        shadow-[0_12px_45px_rgba(15,23,42,0.06)]
      "
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-sky-50
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-20
          left-10
          h-44
          w-44
          rounded-full
          bg-cyan-50
          blur-3xl
        "
      />

      <div className="relative p-5 sm:p-7 lg:p-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-6
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-sky-50
              text-sky-600
              ring-1
              ring-sky-100
            "
          >
            <FaUserTie size={21} />
          </div>

          <div>
            <h2
              className="
                text-xl
                font-black
                tracking-tight
                text-slate-900
              "
            >
              درباره مشاور
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
              "
            >
              معرفی و زمینه‌های تخصصی {consultantName}
            </p>
          </div>
        </div>

        {/* =====================================================
            BIO
        ===================================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-100
            bg-slate-50/70
            p-5
            sm:p-6
          "
        >
          <div className="flex gap-4">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                text-sky-600
                shadow-sm
              "
            >
              <FiBookOpen size={18} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                معرفی مشاور
              </h3>

              <p
                className="
                  mt-3
                  text-sm
                  leading-8
                  text-slate-500
                  text-justify
                "
              >
                {bio}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            SPECIALTY
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-4
            rounded-3xl
            border
            border-sky-100
            bg-sky-50/60
            p-5
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-sky-600
              shadow-sm
            "
          >
            <FaUserTie size={18} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[11px]
                font-bold
                text-slate-400
              "
            >
              زمینه تخصصی
            </p>

            <p
              className="
                mt-1
                text-sm
                font-black
                text-slate-800
              "
            >
              {specialty}
            </p>
          </div>

          <div
            className="
              mr-auto
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-emerald-50
              text-emerald-600
            "
            title="تخصص ثبت شده"
          >
            <FaRegCheckCircle size={15} />
          </div>
        </div>

        {/* =====================================================
            FIELDS
        ===================================================== */}

        {fields.length > 0 && (
          <div className="mt-6">
            <div
              className="
                mb-4
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-50
                  text-cyan-600
                "
              >
                <FiTag size={15} />
              </div>

              <h3
                className="
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                زمینه‌های فعالیت
              </h3>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {fields.map((field, index) => (
                <span
                  key={`${field}-${index}`}
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-sky-100
                    bg-sky-50/70
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-sky-700
                    transition-all
                    duration-200
                    hover:border-sky-200
                    hover:bg-sky-100
                  "
                >
                  {String(field).trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConsultantBio;
