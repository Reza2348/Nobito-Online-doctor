"use client";

import type { Clinic } from "@/Types/types"; // <-- استفاده از Clinic به جای Consultant
import { FaStar, FaRegCheckCircle } from "react-icons/fa";

interface ClinicHeaderProps {
  clinic: Clinic; // <-- تغییر نام prop به clinic
}

export const ClinicHeader: React.FC<ClinicHeaderProps> = ({ clinic }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6">
    {/* عکس کلینیک */}
    <div className="relative">
      <img
        src={clinic.photo_url ?? "/placeholder.jpg"}
        alt={clinic.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
      />
    </div>

    <div className="flex-1 text-center md:text-right">
      {/* نام و تخصص کلینیک */}
      <h1 className="text-2xl font-bold text-slate-800">{clinic.name}</h1>
      <p className="text-teal-600 font-medium mt-1">{clinic.specialty}</p>
      <p className="text-gray-400 text-sm mt-1">تهران</p>

      {/* امتیاز ⭐ */}
      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${i < Math.round(clinic.rating) ? "text-yellow-400" : "text-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-gray-400 text-xs">|</span>
        <span className="text-gray-500 text-sm">
          تعداد بیماران راضی:{" "}
          {clinic.patients_satisfied.toLocaleString("fa-IR")}
        </span>
      </div>

      {/* رضایت بیماران سبز */}
      <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full mx-auto md:mx-0">
        <FaRegCheckCircle className="w-4 h-4" />
        <span className="text-xs font-bold">
          ({clinic.satisfied_percent ?? "۹۷"}٪){" "}
          {clinic.patients_satisfied.toLocaleString("fa-IR")} بیمار راضی
        </span>
      </div>
    </div>
  </div>
);

export default ClinicHeader;
