"use client";

import React from "react";
import { FaHome, FaVideo, FaHospital, FaCalendarCheck } from "react-icons/fa";
import { Service } from "@/Types/types"; // استفاده از نوع جدا شده

// آرایه سرویس‌ها
const services: Service[] = [
  {
    name: "خدمات پزشکی در منزل",
    description:
      "دریافت خدمات پزشکی حرفه‌ای در منزل، با پزشکان و پرستاران مجرب و تجهیزات کامل.",
    icon: <FaHome size={36} />,
    color: "bg-teal-100 text-teal-600",
  },
  {
    name: "مشاوره غیرحضوری",
    description:
      "مشاوره پزشکی آنلاین با پزشکان متخصص بدون نیاز به حضور فیزیکی.",
    icon: <FaVideo size={36} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "مراکز درمانی",
    description:
      "دسترسی به بهترین مراکز درمانی و بیمارستان‌های معتبر در سراسر کشور.",
    icon: <FaHospital size={36} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "نوبت‌دهی آنلاین",
    description:
      "رزرو نوبت آنلاین برای پزشکان و مراکز درمانی با چند کلیک ساده.",
    icon: <FaCalendarCheck size={36} />,
    color: "bg-orange-100 text-orange-600",
  },
];

const MedicalServicesCards: React.FC = () => {
  return (
    <section dir="rtl" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
          خدمات ما
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-7">
          ارائه خدمات پزشکی با کیفیت و دسترسی آسان برای همه بیماران، چه در منزل
          و چه آنلاین.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-8 flex flex-col items-center text-center"
          >
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full mb-6 ${service.color} transition-transform group-hover:scale-110`}
            >
              {service.icon}
            </div>
            <h3 className="font-extrabold text-xl text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {service.description}
            </p>
            <button className="mt-auto bg-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:bg-teal-700 transition">
              اطلاعات بیشتر
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicalServicesCards;
