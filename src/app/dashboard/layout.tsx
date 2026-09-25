"use client";

import React, { useEffect, useState } from "react";

import { AiOutlineWarning } from "react-icons/ai";

import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar/Sidebar";

import { useUser } from "@/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const { userId, status } = useUser();

  /**
   * اگر کاربر احراز هویت نشده باشد،
   * ابتدا پیام نمایش داده می‌شود
   * و بعد از 2 ثانیه به signup می‌رود.
   */
  useEffect(() => {
    if (status !== "unauthenticated") {
      return;
    }

    const timer = setTimeout(() => {
      router.replace("/auth/signup");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [status, router]);

  /**
   * وضعیت Loading
   */
  if (status === "loading") {
    return <div className="p-5 text-gray-600">در حال بررسی حساب کاربری...</div>;
  }

  /**
   * کاربر وارد نشده
   */
  if (status === "unauthenticated") {
    return (
      <div
        className="
          flex
          items-center
          p-4
          mt-4
          mb-4
          ml-4
          mr-4
          text-red-700
          bg-red-100
          border
          border-red-300
          rounded-lg
          shadow-sm
        "
      >
        <AiOutlineWarning
          className="
            w-6
            h-6
            ml-2
            shrink-0
          "
        />

        <span className="text-sm md:text-base">
          برای مشاهده داشبورد باید وارد حساب کاربری خود شوید.
        </span>
      </div>
    );
  }

  /**
   * کاربر authenticated است
   * ولی User ID ندارد
   *
   * این حالت غیرعادی است.
   */
  if (status === "authenticated" && !userId) {
    return (
      <div
        className="
          flex
          items-center
          p-4
          mt-4
          mb-4
          ml-4
          mr-4
          text-red-700
          bg-red-100
          border
          border-red-300
          rounded-lg
          shadow-sm
        "
      >
        <AiOutlineWarning
          className="
            w-6
            h-6
            ml-2
            shrink-0
          "
        />

        <span className="text-sm md:text-base">
          اطلاعات حساب کاربری شما کامل نیست.
        </span>
      </div>
    );
  }

  /**
   * کاربر authenticated است
   */
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
