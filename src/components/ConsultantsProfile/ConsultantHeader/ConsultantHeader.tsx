"use client";

import React from "react";
import Image from "next/image";
import type { Consultant } from "@/Types/types";
import { FaStar, FaRegStar, FaRegCheckCircle, FaUserTie } from "react-icons/fa";
import { FiShield, FiUsers, FiAward } from "react-icons/fi";

interface ConsultantHeaderProps {
  consultant: Consultant;
}

const ConsultantHeader: React.FC<ConsultantHeaderProps> = ({ consultant }) => {
  // =========================================================
  // SAFE DATA
  // =========================================================

  const consultantName = consultant.name?.trim() || "مشاور";

  const parsedRating = Number(consultant.rating);

  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 4;

  const satisfiedPatients = Number(consultant.satisfied_patients ?? 2374);

  const satisfactionRate =
    consultant.satisfaction_rate !== undefined &&
    consultant.satisfaction_rate !== null
      ? String(consultant.satisfaction_rate)
      : "۹۷";

  const photoUrl = consultant.photo_url?.trim() || "/placeholder.jpg";

  return (
    <section
      dir="rtl"
      aria-label={`اطلاعات ${consultantName}`}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        shadow-[0_12px_45px_rgba(15,23,42,0.07)]
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
          -left-16
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
          right-10
          h-44
          w-44
          rounded-full
          bg-cyan-50
          blur-3xl
        "
      />

      <div className="relative p-5 sm:p-7 lg:p-8">
        {/* =====================================================
            MAIN HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            gap-6
            sm:flex-row
            sm:items-start
            sm:gap-7
          "
        >
          {/* =================================================
              PHOTO
          ================================================= */}

          <div className="relative shrink-0">
            <div
              className="
                relative
                h-28
                w-28
                overflow-hidden
                rounded-full
                border-[5px]
                border-white
                bg-slate-100
                shadow-lg
                ring-4
                ring-sky-50
                sm:h-32
                sm:w-32
                lg:h-36
                lg:w-36
              "
            >
              <Image
                src={photoUrl}
                alt={`تصویر ${consultantName}`}
                fill
                priority
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </div>

            {/* Verified Badge */}

            <div
              title="مشاور تأیید شده"
              aria-label="مشاور تأیید شده"
              className="
                absolute
                bottom-1
                right-1
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-white
                bg-emerald-500
                text-white
                shadow-md
              "
            >
              <FaRegCheckCircle size={16} />
            </div>
          </div>

          {/* =================================================
              INFO
          ================================================= */}

          <div
            className="
              min-w-0
              flex-1
              text-center
              sm:text-right
            "
          >
            {/* NAME */}

            <div
              className="
                flex
                flex-col
                items-center
                gap-2
                sm:flex-row
                sm:items-center
              "
            >
              <h1
                className="
                  text-2xl
                  font-black
                  tracking-tight
                  text-slate-950
                  sm:text-3xl
                "
              >
                {consultantName}
              </h1>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-emerald-50
                  px-3
                  py-1
                  text-[11px]
                  font-bold
                  text-emerald-700
                "
              >
                <FaRegCheckCircle size={12} />
                مشاور تأیید شده
              </span>
            </div>

            {/* CONSULTANT TYPE */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-bold
                text-sky-600
                sm:justify-start
              "
            >
              <FaUserTie size={15} />

              <span>مشاور تخصصی</span>
            </div>

            {/* DESCRIPTION */}

            <p
              className="
                mt-2
                text-xs
                text-slate-400
              "
            >
              مشاور تأیید شده و دارای مجوز فعالیت
            </p>

            {/* =================================================
                STATS
            ================================================= */}

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-2
                sm:flex
                sm:flex-wrap
                sm:gap-3
              "
            >
              {/* ================= RATING ================= */}

              <div
                className="
                  flex
                  min-h-[62px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-yellow-100
                  bg-yellow-50/70
                  px-3
                  py-2
                  sm:justify-start
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-yellow-400
                    shadow-sm
                  "
                >
                  <FaStar size={16} />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <div className="flex items-center gap-2">
                    <span
                      className="
                        text-sm
                        font-black
                        text-slate-900
                      "
                    >
                      {rating.toFixed(1)}
                    </span>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= Math.round(rating) ? (
                          <FaStar
                            key={star}
                            size={11}
                            className="text-yellow-400"
                          />
                        ) : (
                          <FaRegStar
                            key={star}
                            size={11}
                            className="text-yellow-200"
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <span
                    className="
                      mt-1
                      text-[10px]
                      text-slate-400
                    "
                  >
                    امتیاز
                  </span>
                </div>
              </div>

              {/* ================= PATIENTS ================= */}

              <div
                className="
                  flex
                  min-h-[62px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/80
                  px-3
                  py-2
                  sm:justify-start
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-sky-600
                    shadow-sm
                  "
                >
                  <FiUsers size={17} />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span
                    className="
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    {satisfiedPatients.toLocaleString("fa-IR")}
                  </span>

                  <span
                    className="
                      mt-1
                      text-[10px]
                      text-slate-400
                    "
                  >
                    بیمار راضی
                  </span>
                </div>
              </div>

              {/* ================= SATISFACTION ================= */}

              <div
                className="
                  col-span-2
                  flex
                  min-h-[62px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-emerald-100
                  bg-emerald-50/70
                  px-4
                  py-2
                  sm:col-span-1
                  sm:justify-start
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-emerald-600
                    shadow-sm
                  "
                >
                  <FiAward size={17} />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span
                    className="
                      text-sm
                      font-black
                      text-emerald-700
                    "
                  >
                    {satisfactionRate}٪
                  </span>

                  <span
                    className="
                      mt-1
                      text-[10px]
                      text-slate-500
                    "
                  >
                    میزان رضایت
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                MEDICAL LICENSE
            ================================================= */}

            <div
              className="
                mt-4
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-slate-100
                bg-slate-50
                px-4
                py-2
                text-xs
                text-slate-500
              "
            >
              <FiShield size={14} className="shrink-0 text-sky-600" />

              <span>کد نظام پزشکی:</span>

              <strong
                className="
                  font-black
                  text-slate-800
                "
              >
                ۵۰۵۵۸
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultantHeader;
