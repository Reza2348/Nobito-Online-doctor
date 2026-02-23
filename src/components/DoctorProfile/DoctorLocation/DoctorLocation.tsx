"use client";

import React from "react";
import { Doctor } from "@/Types/types";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

interface Props {
  doctor: Doctor;
}

const DoctorLocation: React.FC<Props> = ({ doctor }) => (
  <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 mt-6">
    <h2 className="text-xl font-black text-gray-800 mb-8">موقعیت مکانی مطب</h2>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6 text-right">
        <div className="flex gap-3 justify-start">
          <IoLocationSharp className="text-[#2a7d73] shrink-0 mt-1" size={24} />
          <div>
            <p className="font-black text-gray-700 mb-2 text-sm">آدرس :</p>
            <p className="text-gray-400 text-xs leading-6 font-medium">
              {doctor.address}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-start">
          <FaPhoneAlt className="text-gray-300 shrink-0 mt-1" size={18} />
          <div>
            <p className="font-black text-gray-700 mb-1 text-sm">تلفن :</p>
            <p
              className="text-gray-500 font-bold text-sm tracking-widest"
              dir="ltr"
            >
              ۰۲۱-۸۳۹۳۷۸۴۸ | ۰۲۱-۹۳۸۹۸۳۷
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-56 h-40 bg-[#eef2f3] rounded-3xl overflow-hidden relative border border-gray-100 group">
        <div className="absolute inset-0 bg-blue-50/50 flex items-center justify-center">
          <IoLocationSharp
            size={40}
            className="text-[#2a7d73] animate-bounce"
          />
        </div>
      </div>
    </div>
  </div>
);

export default DoctorLocation;
