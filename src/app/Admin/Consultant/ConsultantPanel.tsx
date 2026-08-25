"use client";

import {
  FaUserDoctor,
  FaCalendarCheck,
  FaComments,
  FaGear,
} from "react-icons/fa6";

export default function ConsultantPanel() {
  const menu = [
    {
      title: "پروفایل من",
      description: "مدیریت اطلاعات شخصی مشاور",
      icon: FaUserDoctor,
    },

    {
      title: "مشاوره‌ها",
      description: "جلسات و گفتگو با کاربران",
      icon: FaComments,
    },

    {
      title: "نوبت‌ها",
      description: "مدیریت زمان‌بندی جلسات",
      icon: FaCalendarCheck,
    },

    {
      title: "تنظیمات",
      description: "تنظیمات حساب کاربری",
      icon: FaGear,
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-100 p-6"
    >
      <div className="mx-auto max-w-7xl rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-teal-700">پنل مشاور</h1>

            <p className="mt-3 text-gray-500">
              مدیریت جلسات، نوبت‌ها و ارتباط با کاربران
            </p>
          </div>

          <div className="rounded-2xl bg-teal-600 px-5 py-3 font-bold text-white shadow-lg">
            Consultant
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group cursor-pointer rounded-3xl bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-teal-500 to-cyan-500 text-white shadow-lg">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-xl font-black text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">{item.description}</p>

                <button className="mt-5 text-sm font-bold text-teal-600 opacity-0 transition group-hover:opacity-100">
                  ورود →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
