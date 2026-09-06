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
import type { ProviderCommon } from "@/Types/types";
import type { ProviderTheme } from "../Theme/Theme";

interface ProviderHeaderProps {
  data: ProviderCommon;
  theme: ProviderTheme;
}

const ProviderHeader: React.FC<ProviderHeaderProps> = ({ data, theme }) => {
  const parsedRating = Number(data.rating);
  const rating = Number.isFinite(parsedRating)
    ? Math.min(Math.max(parsedRating, 0), 5)
    : 4;

  const patientsCount = Number(data.patientsCount ?? 0);

  const satisfiedPercent =
    data.satisfiedPercent !== undefined && data.satisfiedPercent !== null
      ? String(data.satisfiedPercent)
      : "۹۷";

  const name = data.name?.trim() || theme.entityLabel;
  const specialty = data.specialty?.trim() || theme.specialtyFallback;
  const city = data.city?.trim() || theme.cityFallback;
  const medicalLicense =
    data.medicalLicenseNumber?.trim() || theme.licenseFallback;
  const photoUrl = data.photoUrl || "/placeholder.jpg";

  const c = theme.classes;

  return (
    <section
      dir="rtl"
      aria-label={`اطلاعات ${name}`}
      className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.07)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden"
      >
        <div className="absolute -right-10 -top-20 h-44 w-44 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -left-10 -top-20 h-40 w-40 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      <div className="relative p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-7">
          {/* PHOTO */}
          <div className="relative shrink-0">
            <div
              className={`relative h-28 w-28 overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-lg ring-4 sm:h-32 sm:w-32 lg:h-36 lg:w-36 ${c.avatarRing}`}
            >
              <Image
                src={photoUrl}
                alt={`تصویر ${name}`}
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div
              title={theme.badgeLabel}
              aria-label={theme.badgeLabel}
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-white shadow-md"
            >
              <FaRegCheckCircle size={16} />
            </div>
          </div>

          {/* MAIN INFO */}
          <div className="min-w-0 flex-1 text-center sm:text-right">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {name}
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                <FaRegCheckCircle size={12} />
                {theme.chipLabel}
              </span>
            </div>

            <div
              className={`mt-3 flex items-center justify-center gap-2 text-sm font-bold sm:justify-start ${c.specialtyText}`}
            >
              <FaStethoscope size={15} />
              <span>{specialty}</span>
            </div>

            {theme.showCity && (
              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500 sm:justify-start">
                <FiMapPin size={16} className="shrink-0 text-slate-400" />
                <span>{city}</span>
              </div>
            )}

            {/* STATS */}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {/* RATING */}
              <div
                className={`flex min-h-14.5 items-center justify-center gap-2 rounded-2xl border px-3 py-2 sm:justify-start ${c.ratingCardBg}`}
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.round(rating) ? (
                      <FaStar key={star} size={13} className={c.starActive} />
                    ) : (
                      <FaRegStar
                        key={star}
                        size={13}
                        className={c.starInactive}
                      />
                    ),
                  )}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-black text-slate-900">
                    {rating.toFixed(1)}
                  </span>
                  <span className="mt-1 text-[10px] text-slate-400">
                    امتیاز
                  </span>
                </div>
              </div>

              {/* PATIENTS */}
              <div
                className={`flex min-h-14.5items-center justify-center gap-2 rounded-2xl border px-3 py-2 sm:justify-start ${c.patientsCardBg}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 ${c.patientsIconText}`}
                >
                  <FiUsers size={16} />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-black text-slate-900">
                    {patientsCount.toLocaleString("fa-IR")}
                  </span>
                  <span className="mt-1 text-[10px] text-slate-400">
                    {theme.patientsLabel}
                  </span>
                </div>
              </div>

              {/* SATISFACTION */}
              <div
                className={`col-span-2 flex min-h-14.5 items-center justify-center gap-2 rounded-2xl border px-4 py-2 sm:col-span-1 sm:justify-start ${c.satisfactionCardBg}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 ${c.satisfactionIconText}`}
                >
                  <FiAward size={16} />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className={`text-sm font-black ${c.satisfactionText}`}>
                    {satisfiedPercent}٪
                  </span>
                  <span className="mt-1 text-[10px] text-slate-500">
                    میزان رضایت
                  </span>
                </div>
              </div>
            </div>

            {/* LICENSE */}
            <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-500">
              <FiShield size={14} className={`shrink-0 ${c.licenseIcon}`} />
              <span>{theme.licenseLabel}:</span>
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

export default ProviderHeader;
