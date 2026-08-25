"use client";

import { useRouter } from "next/navigation";

import {
  MdDashboard,
  MdPeople,
  MdMedicalServices,
  MdPsychology,
  MdLocalHospital,
  MdCalendarMonth,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { AdminPage } from "@/Types/types";

interface Props {
  setPage: (page: AdminPage) => void;
}

export default function AdminSidebar({ setPage }: Props) {
  const router = useRouter();

  const menu = [
    {
      title: "داشبورد",
      icon: MdDashboard,
      page: "dashboard",
    },
    {
      title: "کاربران",
      icon: MdPeople,
      page: "users",
    },
    {
      title: "پزشکان",
      icon: MdMedicalServices,
      page: "doctors",
    },
    {
      title: "مشاوران",
      icon: MdPsychology,
      page: "consultants",
    },
    {
      title: "کلینیک‌ها",
      icon: MdLocalHospital,
      page: "clinics",
    },
    {
      title: "نوبت‌ها",
      icon: MdCalendarMonth,
      page: "appointments",
    },
    {
      title: "تنظیمات",
      icon: MdSettings,
      page: "settings",
    },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin-auth");
    }

    router.push("/Admin");
  };

  return (
    <div className="p-4">
      <aside className="w-64 h-[calc(100vh-32px)] bg-teal-700 text-white p-5 rounded-2xl shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-8">Nobito Admin</h2>

        <nav className="flex-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.page}
                onClick={() => setPage(item.page as AdminPage)}
                className="w-full flex items-center gap-3 text-right p-3 rounded-lg hover:bg-teal-600 mb-2 transition"
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="
  w-full
  flex
  items-center
  justify-center
  gap-3
  p-3
  rounded-xl
  bg-red-500/20
  text-red-100
  border
  border-red-400/30
  hover:bg-red-500
  hover:text-white
  hover:shadow-lg
  hover:shadow-red-500/30
  transition-all
  duration-300
  group
  "
        >
          <MdLogout
            size={22}
            className="
    group-hover:translate-x-1
    transition-transform
    duration-300
    "
          />

          <span className="font-medium">خروج</span>
        </button>
      </aside>
    </div>
  );
}
