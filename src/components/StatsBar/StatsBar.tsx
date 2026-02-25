"use client";

import React from "react";
import {
  FaUserMd,
  FaStethoscope,
  FaCalendarCheck,
  FaHospital,
} from "react-icons/fa";

const stats = [
  { value: "35٬000+", label: "پزشک آماده به خدمت", icon: <FaUserMd /> },
  { value: "10٬000+", label: "درمانگر سیار", icon: <FaStethoscope /> },
  { value: "40٬000+", label: "نوبت دهی روزانه", icon: <FaCalendarCheck /> },
  { value: "15٬000+", label: "مراکز درمانی", icon: <FaHospital /> },
];

export default function StatsSection() {
  return (
    <section
      dir="rtl"
      className="relative bg-gray-50 overflow-hidden py-12 px-4"
      style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
    >
      {/* خط سبز بالا */}
      <div className="w-full h-3 bg-emerald-500 rounded-b-lg"></div>

      {/* کارت‌های آمار */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition hover:shadow-2xl hover:scale-105"
          >
            {/* آیکون دایره‌ای */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl mb-4 transition group-hover:bg-emerald-200">
              {stat.icon}
            </div>
            {/* مقدار */}
            <span className="text-2xl md:text-3xl font-extrabold text-gray-800">
              {stat.value}
            </span>
            {/* توضیح */}
            <span className="text-gray-500 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* خط سبز پایین */}
      <div className="w-full h-3 bg-emerald-500 rounded-t-lg mt-10"></div>
    </section>
  );
}
