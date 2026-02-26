"use client";

import type { Clinic } from "@/Types/types";
import { FaUserMd } from "react-icons/fa";

interface ClinicBioProps {
  clinic: Clinic;
}

export const ClinicBio: React.FC<ClinicBioProps> = ({ clinic }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      {/* عنوان بخش */}
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        درباره کلینیک
      </h2>

      {/* توضیحات کلینیک */}
      <p className="text-gray-500 text-sm leading-8 text-justify">
        {clinic.bio ||
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است..."}
      </p>

      {/* تخصص و زمینه‌ها */}
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
