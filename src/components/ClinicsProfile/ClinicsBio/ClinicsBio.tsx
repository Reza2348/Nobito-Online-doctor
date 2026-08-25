"use client";

import type { Clinic } from "@/Types/types";
import { FaUserMd, FaStethoscope } from "react-icons/fa";

interface ClinicBioProps {
  clinic: Clinic;
}

export const ClinicBio: React.FC<ClinicBioProps> = ({ clinic }) => {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:p-8"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-blue-50/70 blur-3xl" />

      {/* Header */}
      <div className="relative mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FaUserMd className="text-xl" />
        </div>

        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
            درباره کلینیک
          </h2>

          <p className="mt-1 text-xs font-medium text-gray-400">
            معرفی و زمینه‌های تخصصی کلینیک
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="relative">
        <p className="text-[14px] font-medium leading-8 text-gray-500">
          {clinic.bio ||
            `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
            این متن برای پر کردن جای محتوا استفاده می‌شود و می‌تواند جایگزین
            متن واقعی شود. لورم ایپسوم نمونه‌ای از متن طولانی‌تر برای نمایش
            چند خط می‌باشد.`}
        </p>
      </div>

      {/* Specialty */}
      {clinic.specialty && (
        <div className="relative mt-7 border-t border-gray-100 pt-6">
          <div className="mb-3 flex items-center gap-2">
            <FaStethoscope className="text-sm text-blue-500" />

            <span className="text-sm font-bold text-gray-800">تخصص اصلی</span>
          </div>

          <div className="inline-flex items-center rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-600">
            {clinic.specialty}
          </div>
        </div>
      )}

      {/* Fields */}
      {clinic.fields?.length > 0 && (
        <div className="relative mt-6 border-t border-gray-100 pt-6">
          <div className="mb-3 text-sm font-bold text-gray-800">
            زمینه‌های فعالیت
          </div>

          <div className="flex flex-wrap gap-2">
            {clinic.fields.map((field, index) => (
              <span
                key={`${field}-${index}`}
                className="rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-600 transition-all duration-200 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicBio;
