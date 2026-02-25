"use client";

import React from "react";
import { FaLaptopCode, FaServer, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaLaptopCode />,
    title: "توسعه سامانه پزشکی",
    description: "طراحی و پشتیبانی سیستم‌های نوبت‌دهی و مدیریت بیماران.",
  },
  {
    id: 2,
    icon: <FaServer />,
    title: "مدیریت سرورها",
    description: "تضمین امنیت و پایداری سرورهای سایت پزشکی.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "امنیت اطلاعات",
    description: "حفاظت از داده‌های بیماران با بالاترین استانداردهای امنیتی.",
  },
];

const ITDepartment = () => {
  return (
    <section dir="rtl" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">واحد انفورماتیک</h2>
        <p className="text-gray-600 mt-4">
          تیم فناوری اطلاعات ما مسئول توسعه، پشتیبانی و امنیت سامانه پزشکی است.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl mb-4 transition group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-black group-hover:text-emerald-600 transition">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ITDepartment;
