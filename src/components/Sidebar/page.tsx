// فایل اول: components/Sidebar/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlineClipboardList,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineLockClosed,
  HiOutlineLogout,
  HiOutlinePencilAlt,
  HiOutlineUserAdd,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { supabase } from "@/lib/supabaseClient";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [userData, setUserData] = useState({
    phone: "در حال بارگذاری...",
    name: "نام کاربر",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (user) {
          const phone = user.phone || user.user_metadata?.phone || "بدون شماره";

          const name =
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "نام کاربر";

          setUserData({ phone, name });
        }
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
        setUserData({ phone: "خطا در بارگذاری", name: "نام کاربر" });
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    { id: 1, title: "اطلاعات حساب کاربری", icon: HiOutlineUser, active: true },
    { id: 2, title: "تاریخچه نوبت ها", icon: HiOutlineClipboardList },
    { id: 3, title: "پیغام ها", icon: HiOutlineMail },
    { id: 4, title: "پرونده پزشکی", icon: HiOutlineDocumentText },
    { id: 5, title: "بازخوردها", icon: HiOutlineChatAlt2 },
    { id: 6, title: "رمز عبور", icon: HiOutlineLockClosed },
    { id: 7, title: "خروج از حساب کاربری", icon: HiOutlineLogout },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const handleMenuClick = (title: string) => {
    if (title === "خروج از حساب کاربری") {
      handleLogout();
    } else {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* دکمه همبرگر — فقط در موبایل */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#2d7d74] text-white p-2 rounded-xl shadow-lg"
      >
        {sidebarOpen ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* پس‌زمینه تاریک — فقط در موبایل وقتی باز است */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* سایدبار */}
      <aside
        dir="rtl"
        className={`
          fixed top-0 right-0 h-full z-40 
          w-[280px] bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0 md:h-screen
          md:w-[300px] md:shadow-none md:border-l md:border-gray-100
          flex flex-col overflow-y-auto
        `}
      >
        {/* هدر پروفایل */}
        <div className="relative flex flex-col items-center">
          <div className="w-full h-28 bg-[#2d7d74] relative flex-shrink-0">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <div className="absolute top-12">
            <div className="w-24 h-24 bg-white rounded-full border-[6px] border-white shadow-lg flex items-center justify-center">
              <HiOutlineUserAdd className="text-[#2d7d74] text-5xl opacity-80" />
            </div>
          </div>

          <div className="mt-14 mb-4 text-center w-full px-6 relative">
            <button className="absolute right-8 top-1 text-gray-400 hover:text-[#2d7d74] transition-colors">
              <HiOutlinePencilAlt size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 truncate">
              {userData.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1 tabular-nums">
              {userData.phone}
            </p>
          </div>
        </div>

        <div className="px-8 mb-2">
          <div className="h-px bg-gray-100 w-full" />
        </div>

        {/* منو */}
        <nav className="flex flex-col px-3 pb-8 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.title)}
                className={`
                  relative flex items-center gap-4 px-5 py-4 rounded-2xl 
                  transition-all text-right w-full
                  ${
                    item.active
                      ? "text-[#2d7d74] font-bold bg-[#f0faf9]"
                      : "text-gray-500 hover:bg-gray-50"
                  }
                  ${
                    item.title === "خروج از حساب کاربری"
                      ? "hover:text-red-500 hover:bg-red-50 mt-auto"
                      : ""
                  }
                `}
              >
                {item.active && (
                  <div className="absolute right-0 w-1.5 h-10 bg-[#2d7d74] rounded-l-full" />
                )}
                <Icon
                  className={`text-2xl flex-shrink-0 ${
                    item.active ? "text-[#2d7d74]" : "text-gray-400"
                  }`}
                />
                <span className="text-[15px]">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
