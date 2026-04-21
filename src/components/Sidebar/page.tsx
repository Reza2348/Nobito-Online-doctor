"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import SidebarHeader from "@/components/Sidebar/SidebarHeader/SidebarHeader";
import SidebarMenu from "@/components/Sidebar/SidebarMenu/SidebarMenu";
import SidebarToggle from "@/components/Sidebar/SidebarToggle/SidebarToggle";
import SidebarOverlay from "@/components/Sidebar/SidebarOverlay/SidebarOverlay";
import LogoutModal from "@/components/LogoutModal/LogoutModal";

import {
  HiOutlineUser,
  HiOutlineClipboardList,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineLockClosed,
  HiOutlineLogout,
} from "react-icons/hi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [activeItem, setActiveItem] = useState<number>(1);

  const [userData, setUserData] = useState({
    phone: "در حال بارگذاری...",
    name: "نام کاربر",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserData({
          phone: user.phone || user.user_metadata?.phone || "بدون شماره",
          name:
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "کاربر",
        });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  const menuItems = [
    { id: 1, title: "اطلاعات حساب کاربری", icon: HiOutlineUser },
    { id: 2, title: "تاریخچه نوبت ها", icon: HiOutlineClipboardList },
    { id: 3, title: "پیغام ها", icon: HiOutlineMail },
    { id: 4, title: "پرونده پزشکی", icon: HiOutlineDocumentText },
    { id: 5, title: "بازخوردها", icon: HiOutlineChatAlt2 },
    { id: 6, title: "رمز عبور", icon: HiOutlineLockClosed },
    { id: 7, title: "خروج از حساب کاربری", icon: HiOutlineLogout },
  ];

  const handleMenuClick = (item: any) => {
    if (item.title === "خروج از حساب کاربری") {
      setLogoutOpen(true);
      return;
    }

    setActiveItem(item.id);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      <SidebarToggle
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <SidebarOverlay
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <aside
        dir="rtl"
        className={`
          fixed top-0 right-0 h-full z-40
          mt-2
          mr-4
          ml-4
          pb-7
          rounded-2xl
          w-70 bg-white shadow-xl
          flex flex-col overflow-y-auto
          transition-transform duration-300

          
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}

          
          md:translate-x-0 md:static md:block
        `}
      >
        <SidebarHeader userData={userData} />

        <div className="px-6 my-2">
          <div className="h-px bg-gray-100 w-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          <SidebarMenu
            items={menuItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onItemClick={handleMenuClick}
          />
        </div>
      </aside>

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
