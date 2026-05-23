"use client";

import type { Clinic } from "@/Types/types";
import { FaUserMd } from "react-icons/fa";

interface ClinicBioProps {
  clinic: Clinic;
}

export const ClinicBio: React.FC<ClinicBioProps> = ({ clinic }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        درباره کلینیک
      </h2>

      <p className="text-gray-400 text-[13px] leading-7 text-justify font-medium">
        {clinic.bio ||
          `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
این متن برای پر کردن جای محتوا استفاده می‌شود و می‌تواند جایگزین متن واقعی شود.
لورم ایپسوم نمونه‌ای از متن طولانی‌تر برای نمایش چند خط می‌باشد.`}
      </p>
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <FaUserMd className="text-teal-500" />
          <span className="font-bold text-sm">تخصص: {clinic.specialty}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {clinic.fields?.map((field, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-xs"
            >
              {field}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicBio;
