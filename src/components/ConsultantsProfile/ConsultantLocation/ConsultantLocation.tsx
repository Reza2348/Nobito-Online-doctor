"use client";

import React from "react";
import type { Consultant } from "@/Types/types";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

interface ConsultantLocationProps {
  consultant: Consultant;
}

export const ConsultantLocation: React.FC<ConsultantLocationProps> = ({
  consultant,
}) => {
  return (
    <div
      dir="rtl"
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      <h2 className="text-lg font-bold text-slate-800 mb-6">
        موقعیت مکانی مطب
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 order-1 md:order-1">
          <div className="flex gap-4">
            <div className="bg-teal-50 p-3 rounded-xl h-fit">
              <FaMapMarkerAlt className="text-teal-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800">آدرس :</p>
              <p className="text-gray-500 text-xs mt-2 leading-7 italic">
                {consultant.address ||
                  "تهران - میدان آرژانتین - خیابان الوند - پلاک ۱۲ - طبقه ۳"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-gray-50 pt-6">
            <div className="bg-teal-50 p-3 rounded-xl h-fit">
              <FaPhone className="text-teal-600 w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800">تلفن :</p>
              <p
                className="text-gray-500 text-sm mt-2 font-medium tracking-widest"
                dir="ltr"
              >
                ۰۲۱-۸۳۹۳۷۸۴۸ | ۰۲۱-۹۳۸۹۸۳۷
              </p>
            </div>
          </div>
        </div>

        {/* ستون دوم: نقشه (در دسکتاپ سمت چپ قرار می‌گیرد) */}
        <div className="order-2 md:order-2">
          <div className="bg-slate-50 rounded-2xl h-52 flex items-center justify-center relative overflow-hidden border border-gray-100 group">
            {/* لایه تزیینی شبیه به نقشه */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')]"></div>
            </div>

            {/* پین نقشه */}
            <div className="relative z-10 flex flex-col items-center">
              <FaMapMarkerAlt className="text-teal-500 w-10 h-10 drop-shadow-lg animate-bounce" />
              <div className="w-4 h-1.5 bg-black/10 rounded-[100%] blur-[2px] mt-1"></div>
            </div>

            {/* دکمه روی نقشه (نمایشی) */}
            <div className="absolute bottom-4 inset-x-4">
              <button className="w-full bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-teal-500 hover:text-white transition-all">
                مشاهده روی نقشه بزرگ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantLocation;
