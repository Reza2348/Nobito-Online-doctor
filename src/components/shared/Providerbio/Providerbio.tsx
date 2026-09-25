"use client";

import React from "react";
import { FaUserMd, FaStethoscope, FaRegCheckCircle } from "react-icons/fa";
import type { ProviderCommon } from "@/Types/types";
import type { ProviderTheme } from "../Theme/Theme";

interface ProviderBioProps {
  data: ProviderCommon;
  theme: ProviderTheme;
}

const defaultBio = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
این متن برای پر کردن جای محتوا استفاده می‌شود و می‌تواند جایگزین
متن واقعی شود. لورم ایپسوم نمونه‌ای از متن طولانی‌تر برای نمایش
چند خط می‌باشد.`;

const ProviderBio: React.FC<ProviderBioProps> = ({ data, theme }) => {
  const fields = Array.isArray(data.fields)
    ? data.fields.filter((f) => f && String(f).trim())
    : [];

  const c = theme.classes;

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:p-8"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-blue-50/70 blur-3xl" />

      {/* Header */}
      <div className="relative mb-6 flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.bioIconBox}`}
        >
          <FaUserMd className="text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
            {theme.bioTitle}
          </h2>
          <p className="mt-1 text-xs font-medium text-gray-400">
            {theme.bioSubtitle}
          </p>
        </div>
      </div>

      {/* Bio text */}
      <div className="relative">
        <p className="text-[14px] font-medium leading-8 text-gray-500">
          {data.bio || defaultBio}
        </p>
      </div>

      {/* Specialty */}
      {data.specialty && (
        <div className="relative mt-7 flex items-center gap-4 rounded-3xl border-t border-gray-100 pt-6">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${c.specialtyBoxBg}`}
          >
            <FaStethoscope size={18} className={c.specialtyBoxIcon} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-400">تخصص اصلی</p>
            <p className="mt-1 text-sm font-black text-gray-800">
              {data.specialty}
            </p>
          </div>
          <div className="mr-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FaRegCheckCircle size={15} />
          </div>
        </div>
      )}

      {/* Fields */}
      {fields.length > 0 && (
        <div className="relative mt-6 border-t border-gray-100 pt-6">
          <div className="mb-3 text-sm font-bold text-gray-800">
            زمینه‌های فعالیت
          </div>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <span
                key={`${field}-${index}`}
                className={`rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-600 transition-all duration-200 ${c.fieldChipHover}`}
              >
                {String(field).trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProviderBio;
