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
  MdClose,
} from "react-icons/md";

import { AdminPage } from "@/Types/types";

interface Props {
  setPage: (page: AdminPage) => void;
  onClose?: () => void;
  /** desktop: فریم کامل (padding/گردی/سایه) - mobile: پر کردن کانتینر والد */
  variant?: "desktop" | "mobile";
}

export default function AdminSidebar({
  setPage,
  onClose,
  variant = "desktop",
}: Props) {
  const router = useRouter();

  const menu = [
    { title: "داشبورد", icon: MdDashboard, page: "dashboard" },
    { title: "کاربران", icon: MdPeople, page: "users" },
    { title: "پزشکان", icon: MdMedicalServices, page: "doctors" },
    { title: "مشاوران", icon: MdPsychology, page: "consultants" },
    { title: "کلینیک‌ها", icon: MdLocalHospital, page: "clinics" },
    { title: "نوبت‌ها", icon: MdCalendarMonth, page: "appointments" },
    { title: "افزودن", icon: MdAddCircle, page: "add" },
    { title: "تنظیمات", icon: MdSettings, page: "settings" },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin-auth");
    }
    router.push("/Admin");
  };

  const handlePageClick = (page: AdminPage) => {
    setPage(page);
    if (onClose) {
      onClose();
    }
  };

  const isMobile = variant === "mobile";

  const content = (
    <aside
      dir="rtl"
      className={`
        flex
        flex-col
        text-white
        ${
          isMobile
            ? "h-full w-full bg-teal-700 p-5"
            : "h-[calc(100vh-32px)] w-64 rounded-2xl bg-teal-700 p-5 shadow-lg"
        }
      `}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">Nobito Admin</h2>

        {/* دکمه‌ی بستن فقط تو حالت موبایل، بدون breakpoint چون parent خودش کنترل می‌کنه */}
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="
              rounded-lg
              p-2
              text-white
              transition
              hover:bg-teal-600
              active:scale-95
            "
          >
            <MdClose size={28} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              type="button"
              onClick={() => handlePageClick(item.page as AdminPage)}
              className="
                mb-2
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                p-3
                text-right
                transition
                hover:bg-teal-600
                active:scale-[0.98]
              "
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
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
        <span className="font-medium">خروج</span>
      </button>
    </aside>
  );

  // حالت دسکتاپ: خودش padding بیرونی رو مدیریت می‌کنه
  if (!isMobile) {
    return <div className="p-4">{content}</div>;
  }

  return content;
}
