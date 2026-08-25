"use client";

import React from "react";
import type { Consultant } from "@/Types/types";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiNavigation } from "react-icons/fi";

interface ConsultantLocationProps {
  consultant: Consultant;
}

const ConsultantLocation: React.FC<ConsultantLocationProps> = ({
  consultant,
}) => {
  const address =
    consultant.address?.trim() ||
    "تهران - میدان آرژانتین - خیابان الوند - پلاک ۱۲ - طبقه ۳";

  const phone = consultant.phone?.trim() || "۰۲۱-۸۳۹۳۷۸۴۸";

  return (
    <section dir="rtl" aria-label="موقعیت مکانی مشاور" className="w-full">
      {/* ================= HEADER ================= */}

      <div className="mb-7 flex items-center gap-3">
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
          <FaMapMarkerAlt size={22} />
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
            موقعیت مکانی مشاور
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-400
            "
          >
            آدرس و راه‌های ارتباط با مشاور
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
        "
      >
        {/* ================= MAP ================= */}

        <div
          className="
            group
            relative
            flex
            h-60
            items-center
            justify-center
            overflow-hidden
            rounded-3xl
            border
            border-sky-100
            bg-gradient-to-br
            from-sky-50
            via-cyan-50
            to-indigo-100
          "
        >
          {/* Decorative background */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
            "
          >
            <div
              className="
                absolute
                left-8
                top-8
                h-24
                w-24
                rounded-full
                bg-white
                blur-3xl
              "
            />

            <div
              className="
                absolute
                bottom-5
                right-8
                h-28
                w-28
                rounded-full
                bg-cyan-200
                blur-3xl
              "
            />

            <div
              className="
                absolute
                right-1/3
                top-1/2
                h-20
                w-20
                rounded-full
                bg-white
                blur-3xl
              "
            />
          </div>

          {/* Map marker */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-white
                text-sky-500
                shadow-xl
                ring-4
                ring-white/50
                transition-all
                duration-500
                group-hover:-translate-y-2
                group-hover:shadow-2xl
              "
            >
              <FaMapMarkerAlt size={32} />
            </div>

            <div
              className="
                mt-2
                h-2
                w-8
                rounded-full
                bg-black/10
                blur-sm
                transition-all
                duration-500
                group-hover:w-6
              "
            />
          </div>

          {/* Map button */}

          <button
            type="button"
            className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-white/70
              bg-white/90
              py-3
              text-xs
              font-bold
              text-slate-700
              shadow-md
              backdrop-blur
              transition-all
              duration-300
              hover:bg-sky-600
              hover:text-white
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-sky-500
              focus:ring-offset-2
            "
          >
            <FiNavigation size={15} />
            مشاهده روی نقشه
          </button>
        </div>

        {/* ================= INFO ================= */}

        <div
          className="
            flex
            flex-col
            gap-5
          "
        >
          {/* ================= ADDRESS ================= */}

          <div
            className="
              flex
              gap-4
              rounded-3xl
              border
              border-slate-100
              bg-slate-50/70
              p-5
              transition-all
              duration-300
              hover:border-sky-100
              hover:bg-sky-50/40
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
              <FaMapMarkerAlt size={17} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                آدرس محل مشاوره
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-7
                  text-slate-500
                "
              >
                {address}
              </p>
            </div>
          </div>

          {/* ================= PHONE ================= */}

          <div
            className="
              flex
              gap-4
              rounded-3xl
              border
              border-slate-100
              bg-slate-50/70
              p-5
              transition-all
              duration-300
              hover:border-cyan-100
              hover:bg-cyan-50/40
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
                bg-cyan-50
                text-cyan-600
                ring-1
                ring-cyan-100
              "
            >
              <FaPhone size={16} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                شماره تماس مشاور
              </h3>

              <a
                href={`tel:${phone}`}
                dir="ltr"
                className="
                  mt-2
                  inline-block
                  text-sm
                  font-bold
                  tracking-wider
                  text-slate-500
                  transition-colors
                  hover:text-sky-600
                "
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultantLocation;
