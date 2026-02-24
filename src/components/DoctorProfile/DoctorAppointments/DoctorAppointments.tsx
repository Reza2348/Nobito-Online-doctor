"use client";

import React from "react";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";

// کامپوننت کمکی برای انواع مشاوره در بالای کارت
const ConsultationType = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer flex-1">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
        active
          ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
          : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] font-bold ${
        active ? "text-[#2a7d73]" : "text-gray-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const DoctorAppointments: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-8">
      <h3 className="text-lg font-bold text-center text-gray-700 mb-6">
        ملاقات با پزشک
      </h3>

      {/* بخش انتخاب نوع مشاوره */}
      <div className="flex justify-between gap-2 mb-8">
        <ConsultationType icon={<D.FaPhone size={18} />} label="تلفنی" />
        <ConsultationType
          icon={<D.IoPersonOutline size={22} />}
          label="حضوری"
          active
        />
        <ConsultationType
          icon={<D.MdOutlineScreenShare size={22} />}
          label="آنلاین"
        />
        <ConsultationType
          icon={<D.IoChatbubbleEllipsesOutline size={22} />}
          label="متنی"
        />
      </div>

      {/* لیست نوبت‌ها */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-gray-100 rounded-2xl p-4 bg-[#fbfbfb]"
          >
            <div className="flex justify-between items-start mb-4">
              {/* اطلاعات نوبت - حالا در سمت چپ قرار می‌گیرد */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-gray-700 font-bold text-sm">
                  مشاوره حضوری
                  <D.IoPersonOutline size={16} className="text-gray-400" />
                </div>
                <p className="text-[10px] text-gray-400 mt-1" dir="rtl">
                  نوبت خالی، دوشنبه ۳ آذر (۱۴:۳۰)
                </p>
              </div>

              {/* بخش راهنما - حالا در سمت راست قرار می‌گیرد */}
              <span className="text-blue-500 text-[10px] font-bold cursor-pointer italic">
                راهنما
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
              <button className="bg-white border border-teal-500 text-teal-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-teal-50 transition-colors">
                نوبت بگیرید
              </button>
              <div className="text-left">
                <span className="text-lg font-black text-gray-800">
                  157,000
                </span>
                <span className="text-[10px] text-gray-400 mr-1">تومان</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
