"use client";

import React from "react";
import { FaUserShield, FaLock, FaFileContract } from "react-icons/fa";

const privacyItems = [
  {
    id: 1,
    icon: <FaUserShield />,
    title: "حفاظت از اطلاعات کاربران",
    description:
      "اطلاعات شخصی شما محرمانه باقی می‌ماند و با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.",
  },
  {
    id: 2,
    icon: <FaLock />,
    title: "امنیت داده‌ها",
    description:
      "استفاده از پروتکل‌های رمزنگاری پیشرفته برای حفظ امنیت اطلاعات.",
  },
  {
    id: 3,
    icon: <FaFileContract />,
    title: "شفافیت در قوانین",
    description:
      "تمامی قوانین و مقررات به صورت شفاف و قابل دسترس ارائه شده‌اند.",
  },
];

const PrivacyPolicy = () => {
  return (
    <section dir="rtl" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">حریم شخصی</h2>
        <p className="text-gray-600 mt-4">
          امنیت و حفظ اطلاعات کاربران برای ما اولویت اصلی است.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {privacyItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-2"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl mb-4 transition group-hover:scale-110">
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

export default PrivacyPolicy;
