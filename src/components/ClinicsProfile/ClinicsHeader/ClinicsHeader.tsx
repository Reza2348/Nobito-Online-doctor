"use client";

import React from "react";
import Image from "next/image";
import type { Clinic } from "@/Types/types";
import {
  FaStar,
  FaRegStar,
  FaRegCheckCircle,
  FaStethoscope,
} from "react-icons/fa";
import { FiMapPin, FiShield, FiUsers, FiAward } from "react-icons/fi";

interface ClinicHeaderProps {
  clinic: Clinic;
}

const ClinicHeader: React.FC<ClinicHeaderProps> = ({ clinic }) => {
  const parsedRating = Number(clinic.rating);

  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 4;

  const patientsCount = Number(clinic.patients_satisfied ?? 0);

  const satisfiedPercent =
    clinic.satisfied_percent !== undefined && clinic.satisfied_percent !== null
      ? String(clinic.satisfied_percent)
      : "۹۷";

  const clinicName = clinic.name?.trim() || "کلینیک";

  const specialty = clinic.specialty?.trim() || "مرکز تخصصی درمانی";

  const city =
    "city" in clinic && clinic.city ? String(clinic.city).trim() : "تهران";

  const medicalLicense =
    "medical_license_number" in clinic && clinic.medical_license_number
      ? String(clinic.medical_license_number).trim()
      : "۵۰۵۵۸";

  const photoUrl = clinic.photo_url || "/placeholder.jpg";

  return (
    <section
      dir="rtl"
      aria-label={`اطلاعات ${clinicName}`}
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
      {/* ================= DECORATIVE BACKGROUND ================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-20
            h-44
            w-44
            rounded-full
            bg-sky-100/60
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -left-10
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-100/50
            blur-3xl
          "
        />
      </div>

      <div className="relative p-5 sm:p-7 lg:p-8">
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
          {/* ================= PHOTO ================= */}

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
                alt={`تصویر ${clinicName}`}
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            </div>

            {/* Verified badge */}

            <div
              title="کلینیک تأیید شده"
              aria-label="کلینیک تأیید شده"
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

          {/* ================= MAIN INFO ================= */}

          <div className="min-w-0 flex-1 text-center sm:text-right">
            {/* Name */}

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
                {clinicName}
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
                  ring-1
                  ring-emerald-100
                "
              >
                <FaRegCheckCircle size={12} />
                مرکز تأیید شده
              </span>
            </div>

            {/* Specialty */}

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
              <FaStethoscope size={15} />
              <span>{specialty}</span>
            </div>

            {/* Location */}

            <div
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-slate-500
                sm:justify-start
              "
            >
              <FiMapPin size={16} className="shrink-0 text-slate-400" />

              <span>{city}</span>
            </div>

            {/* ================= STATS ================= */}

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
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-amber-100
                  bg-amber-50/70
                  px-3
                  py-2
                  sm:justify-start
                "
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.round(rating) ? (
                      <FaStar key={star} size={13} className="text-amber-400" />
                    ) : (
                      <FaRegStar
                        key={star}
                        size={13}
                        className="text-amber-200"
                      />
                    ),
                  )}
                </div>

                <div
                  className="
                    flex
                    flex-col
                    items-start
                    leading-none
                  "
                >
                  <span className="text-sm font-black text-slate-900">
                    {rating.toFixed(1)}
                  </span>

                  <span className="mt-1 text-[10px] text-slate-400">
                    امتیاز
                  </span>
                </div>
              </div>

              {/* ================= PATIENTS ================= */}

              <div
                className="
                  flex
                  min-h-[58px]
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
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-sky-600
                    shadow-sm
                    ring-1
                    ring-slate-100
                  "
                >
                  <FiUsers size={16} />
                </div>

                <div
                  className="
                    flex
                    flex-col
                    items-start
                    leading-none
                  "
                >
                  <span className="text-sm font-black text-slate-900">
                    {patientsCount.toLocaleString("fa-IR")}
                  </span>

                  <span className="mt-1 text-[10px] text-slate-400">بیمار</span>
                </div>
              </div>

              {/* ================= SATISFACTION ================= */}

              <div
                className="
                  col-span-2
                  flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-cyan-100
                  bg-cyan-50/70
                  px-4
                  py-2
                  sm:col-span-1
                  sm:justify-start
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-cyan-600
                    shadow-sm
                    ring-1
                    ring-cyan-100
                  "
                >
                  <FiAward size={16} />
                </div>

                <div
                  className="
                    flex
                    flex-col
                    items-start
                    leading-none
                  "
                >
                  <span className="text-sm font-black text-cyan-700">
                    {satisfiedPercent}٪
                  </span>

                  <span className="mt-1 text-[10px] text-slate-500">
                    میزان رضایت
                  </span>
                </div>
              </div>
            </div>

            {/* ================= LICENSE ================= */}

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

              <span>شماره نظام پزشکی:</span>

              <strong className="font-black text-slate-800">
                {medicalLicense}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicHeader;
