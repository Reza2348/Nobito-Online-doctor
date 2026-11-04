"use client";

import { adminLogout } from "@/lib/adminLogout";
import {
  FaUserDoctor,
  FaCalendarCheck,
  FaComments,
  FaGear,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function ConsultantPanel() {
  const router = useRouter();

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

  const handleLogout = async (): Promise<void> => {
    await adminLogout();
    router.push("/Admin");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-surface p-6"
    >
      <div className="mx-auto max-w-7xl rounded-xl bg-white/80 p-8 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-teal-700">پنل مشاور</h1>

            <p className="mt-3 text-gray-500">
              مدیریت جلسات، نوبت‌ها و ارتباط با کاربران
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal-600 px-5 py-3 font-bold text-white shadow-sm">
              Consultant
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-sm transition hover:bg-red-700"
            >
              خروج
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group cursor-pointer rounded-xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
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
