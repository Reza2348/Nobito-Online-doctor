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
      // ۳۰۰ms صبر می‌کنیم تا onAuthStateChange فرصت داشته باشه session رو چک کنه
      timeout = setTimeout(() => setShowError(true), 300);
    } else {
      // کاربر لاگین کرده، پیام خطا رو مخفی کن
      setShowError(false);
    }

    return () => clearTimeout(timeout);
  }, [status, userId]);

  // در حال چک کردن session یا هنوز مطمئن نیستیم
  if (status === "loading" || (status === "unauthenticated" && !showError)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // مطمئناً لاگین نیست
  if (showError || !userId) {
    return (
      <div className="flex items-center p-4 mt-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm">
        <AiOutlineWarning className="w-6 h-6 mr-2 flex-shrink-0" />
        <span className="text-sm md:text-base">
          {"You must be logged in to view your dashboard."}
        </span>
      </div>
    );
  }

  // کاربر لاگین است، داشبورد را نشان بده
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className="flex-1 overflow-y-auto p-4 md:p-8"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}
