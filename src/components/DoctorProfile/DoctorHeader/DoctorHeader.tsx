"use client";

import React from "react";
import Image from "next/image";
import {
  FaStar,
  FaRegStar,
  FaRegCheckCircle,
  FaStethoscope,
} from "react-icons/fa";
import { FiMapPin, FiShield, FiUsers, FiAward } from "react-icons/fi";
import { Doctor } from "@/Types/types";

interface Props {
  doctor: Doctor;
}

const DoctorHeader: React.FC<Props> = ({ doctor }) => {
  const parsedRating = Number(doctor.rating);

  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 4;

  const patientsCount = Number(doctor.patients_satisfied ?? 0);

  const satisfiedPercent =
    doctor.satisfied_percent !== undefined && doctor.satisfied_percent !== null
      ? String(doctor.satisfied_percent)
      : "۹۷";

  const city = doctor.city?.trim() || "نامشخص";

  const medicalLicense = doctor.medical_license_number?.trim() || "ثبت نشده";

  const doctorName = doctor.name?.trim() || "پزشک";

  const specialty = doctor.specialty?.trim() || "پزشک متخصص";

  const photoUrl = doctor.photo_url || "/api/placeholder/400/400";

  return (
    <section
      dir="rtl"
      aria-label={`اطلاعات ${doctorName}`}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-[0_12px_45px_rgba(15,23,42,0.07)]
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          bg-gradient-to-bl
          from-emerald-50
          via-white
          to-cyan-50
        "
      />

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
                bg-gray-100
                shadow-lg
                ring-4
                ring-emerald-50
                sm:h-32
                sm:w-32
                lg:h-36
                lg:w-36
              "
            >
              <Image
                src={photoUrl}
                alt={`عکس ${doctorName}`}
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
              title="پزشک تأیید شده"
              aria-label="پزشک تأیید شده"
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
                  text-gray-950
                  sm:text-3xl
                "
              >
                {doctorName}
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
                پزشک تأیید شده
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
                text-emerald-600
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
                text-gray-500
                sm:justify-start
              "
            >
              <FiMapPin size={16} className="shrink-0 text-gray-400" />

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
              {/* Rating */}
              <div
                className="
                  flex
                  min-h-[58px]
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
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.round(rating) ? (
                      <FaStar
                        key={star}
                        size={13}
                        className="text-yellow-400"
                      />
                    ) : (
                      <FaRegStar
                        key={star}
                        size={13}
                        className="text-yellow-200"
                      />
                    ),
                  )}
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-black text-gray-900">
                    {rating.toFixed(1)}
                  </span>

                  <span className="mt-1 text-[10px] text-gray-400">امتیاز</span>
                </div>
              </div>

              {/* Patients */}
              <div
                className="
                  flex
                  min-h-[58px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-gray-100
                  bg-gray-50/80
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
                    text-emerald-600
                    shadow-sm
                  "
                >
                  <FiUsers size={16} />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-black text-gray-900">
                    {patientsCount.toLocaleString("fa-IR")}
                  </span>

                  <span className="mt-1 text-[10px] text-gray-400">بیمار</span>
                </div>
              </div>

              {/* Satisfaction */}
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
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-emerald-600
                    shadow-sm
                  "
                >
                  <FiAward size={16} />
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-black text-emerald-700">
                    {satisfiedPercent}٪
                  </span>

                  <span className="mt-1 text-[10px] text-gray-500">
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
                border-gray-100
                bg-gray-50
                px-4
                py-2
                text-xs
                text-gray-500
              "
            >
              <FiShield size={14} className="shrink-0 text-emerald-600" />

              <span>شماره نظام پزشکی:</span>

              <strong className="font-black text-gray-800">
                {medicalLicense}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHeader;
