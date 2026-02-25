"use client";

import React from "react";
import {
  FaDonate,
  FaHeartbeat,
  FaHospitalAlt,
  FaHandsHelping,
} from "react-icons/fa";

const donations = [
  {
    id: 1,
    icon: <FaDonate />,
    title: "کمک مالی به بیماران",
    description: "کمک به تامین هزینه درمان بیماران نیازمند.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: <FaHeartbeat />,
    title: "حمایت از تجهیزات پزشکی",
    description: "خرید و تامین تجهیزات پزشکی مدرن برای مراکز درمانی.",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    icon: <FaHospitalAlt />,
    title: "ساخت و بازسازی کلینیک",
    description: "کمک به توسعه و بهبود کلینیک‌ها و بیمارستان‌ها.",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    icon: <FaHandsHelping />,
    title: "حمایت از داوطلبان",
    description: "حمایت از درمانگران و پرستاران داوطلب سایت پزشکی.",
    color: "bg-amber-100 text-amber-600",
  },
];

const DonationsCards: React.FC = () => {
  return (
    <section dir="rtl" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-black mb-4">
          کمک مالی
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-7">
          با حمایت مالی شما می‌توانیم خدمات پزشکی را به بیماران بیشتری ارائه
          دهیم.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {donations.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl"
          >
            {/* آیکون دایره‌ای */}
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full mb-6 ${item.color} text-4xl transition-transform group-hover:scale-110`}
            >
              {item.icon}
            </div>

            {/* عنوان */}
            <h3 className="font-extrabold text-xl text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
              {item.title}
            </h3>

            {/* توضیح */}
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* دکمه کمک مالی */}
            <button className="mt-auto bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:bg-emerald-700 transition transform hover:scale-105">
              کمک کن
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationsCards;
