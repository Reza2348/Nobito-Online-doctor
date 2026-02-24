"use client";

import type { Consultant } from "@/Types/types";
import { FaStar, FaRegCheckCircle } from "react-icons/fa";

interface ConsultantHeaderProps {
  consultant: Consultant;
}

export const ConsultantHeader: React.FC<ConsultantHeaderProps> = ({
  consultant,
}) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6">
    <div className="relative">
      <img
        src={consultant.photo_url ?? "/placeholder.jpg"}
        alt={consultant.name}
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
      />
    </div>
    <div className="flex-1 text-center md:text-right">
      <h1 className="text-2xl font-bold text-slate-800">{consultant.name}</h1>
      <p className="text-teal-600 font-medium mt-1">{consultant.specialty}</p>
      <p className="text-gray-400 text-sm mt-1">تهران</p>

      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-200"}`}
            />
          ))}
        </div>
        <span className="text-gray-400 text-xs">|</span>
        <span className="text-gray-500 text-sm">
          کد نظام پزشکی: {consultant.id || "۵۰۵۵۸"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full mx-auto md:mx-0">
        <FaRegCheckCircle className="w-4 h-4" />
        <span className="text-xs font-bold">
          ({consultant.satisfaction_rate || "۹۷"}٪){" "}
          {consultant.satisfied_patients?.toLocaleString("fa-IR") || "۲,۳۷۴"}{" "}
          بیمار راضی
        </span>
      </div>
    </div>
  </div>
);
