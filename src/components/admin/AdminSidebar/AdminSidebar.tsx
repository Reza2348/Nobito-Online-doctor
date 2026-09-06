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
  MdAddCircle,
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
      title: "افزودن",
      icon: MdAddCircle,
      page: "add",
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
      <aside
        dir="rtl"
        className="flex h-[calc(100vh-32px)] w-64 flex-col rounded-2xl bg-teal-700 p-5 text-white shadow-lg"
      >
        {/* Logo / Title */}
        <h2 className="mb-8 text-xl font-bold">Nobito Admin</h2>

        {/* Menu */}
        <nav className="flex-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => setPage(item.page as AdminPage)}
                className="mb-2 flex w-full items-center gap-3 rounded-lg p-3 text-right transition hover:bg-teal-600"
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-red-400/30
            bg-red-500/20
            p-3
            text-red-100
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
            hover:shadow-lg
            hover:shadow-red-500/30
          "
        >
          <MdLogout
            size={22}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />

          <span className="font-medium">خروج</span>
        </button>
      </aside>
    </div>
  );
}
