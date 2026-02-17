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
} from "react-icons/hi";
import { supabase } from "@/lib/supabaseClient";

const UserSidebar = () => {
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
          // اگر کاربر با موبایل ثبت نام کرده، شماره موبایل رو استفاده کن
          const phone =
            user.phone ||
            user.user_metadata?.phone ||
            user.user_metadata?.full_name?.phone ||
            "بدون شماره";

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

  return (
    <div
      className="w-full max-w-[320px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden font-[vazir]"
      dir="rtl"
    >
      <div className="relative flex flex-col items-center">
        <div className="w-full h-28 bg-[#2d7d74] relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="absolute top-12">
          <div className="w-24 h-24 bg-white rounded-full border-[6px] border-white shadow-lg flex items-center justify-center">
            <HiOutlineUserAdd className="text-[#2d7d74] text-5xl opacity-80" />
          </div>
        </div>

        <div className="mt-14 mb-4 text-center w-full px-6 relative">
          <button className="absolute right-8 top-1 text-gray-400 hover:text-[#2d7d74]">
            <HiOutlinePencilAlt size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>

          {/* شماره تماس داینامیک */}
          <p className="text-gray-400 text-sm mt-1 tabular-nums">
            {userData.phone}
          </p>
        </div>
      </div>

      <div className="px-8 mb-2">
        <div className="h-1 bg-gray-100 w-full"></div>
      </div>

      <nav className="flex flex-col px-3 pb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={
                item.title === "خروج از حساب کاربری" ? handleLogout : undefined
              }
              className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                item.active
                  ? "text-[#2d7d74] font-bold"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {item.active && (
                <div className="absolute right-0 w-1.5 h-10 bg-[#2d7d74] rounded-l-full" />
              )}
              <Icon
                className={`text-2xl ${
                  item.active ? "text-[#2d7d74]" : "text-gray-400"
                }`}
              />
              <span className="text-[15px]">{item.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default UserSidebar;
