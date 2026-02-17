// فایل دوم: app/dashboard/layout.tsx

"use client";

import React, { PropsWithChildren, useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/page";
import { useUser } from "@/hooks/useUser";
import { AiOutlineWarning } from "react-icons/ai";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId, status } = useUser();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (status === "unauthenticated" && !userId) {
      timeout = setTimeout(() => setShowError(true), 300);
    } else {
      setShowError(false);
    }

    return () => clearTimeout(timeout);
  }, [status, userId]);

  // در حال چک کردن session
  if (status === "loading" || (status === "unauthenticated" && !showError)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2d7d74] rounded-full animate-spin" />
      </div>
    );
  }

  // لاگین نیست
  if (showError || !userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="flex items-center p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm max-w-md w-full">
          <AiOutlineWarning className="w-6 h-6 ml-2 flex-shrink-0" />
          <span className="text-sm md:text-base">
            برای مشاهده داشبورد باید وارد حساب کاربری خود شوید.
          </span>
        </div>
      </div>
    );
  }

  // لاگین است
  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}
