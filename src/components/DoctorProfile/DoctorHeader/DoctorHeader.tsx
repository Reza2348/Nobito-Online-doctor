"use client";

import React from "react";
import { Doctor } from "@/Types/types";
import { FaStar, FaRegStar, FaThumbsUp } from "react-icons/fa";

interface Props {
  doctor: Doctor;
}

const DoctorHeader: React.FC<Props> = ({ doctor }) => {
  const ratingNumber = Number(doctor.rating) || 4;

  return (
    <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="mx-auto md:mx-0">
          <div className="w-40 h-40 rounded-full p-1 border-2 border-gray-100">
            <img
              src={doctor.photo_url || "/api/placeholder/180/180"}
              className="w-full h-full rounded-full object-cover shadow-sm"
              alt={doctor.name}
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-2xl font-black text-gray-800 mb-2">
            {doctor.name}
          </h1>
          <p className="text-[#2a7d73] text-sm font-bold mb-1">
            {doctor.specialty}
          </p>
          <p className="text-gray-400 text-xs mb-4 italic text-right">تهران</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) =>
                s <= ratingNumber ? (
                  <FaStar key={s} className="text-yellow-400" size={18} />
                ) : (
                  <FaRegStar key={s} className="text-gray-200" size={18} />
                ),
              )}
            </div>
            <div className="text-gray-500 text-sm border-r pr-4 border-gray-200">
              کد نظام پزشکی :{" "}
              <span className="font-bold text-gray-700">۵۰۵۵۸</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-[#2a7d73] font-bold">
            <div className="bg-[#e9f4f2] p-1.5 rounded-full">
              <FaThumbsUp size={14} />
            </div>
            <span className="text-xs">
              ({doctor.satisfied_percent || "۹۷%"}){" "}
              {doctor.patients_satisfied?.toLocaleString("fa-IR")} بیمار راضی
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;
