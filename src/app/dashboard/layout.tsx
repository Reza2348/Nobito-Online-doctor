"use client";

import React, { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

import Sidebar from "@/components/Sidebar/Sidebar";
import { useUser } from "@/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userId, status } = useUser();

  if (status === "loading") {
    return <div className="p-5 text-gray-600">در حال بارگذاری...</div>;
  }

  if (status === "unauthenticated" || !userId) {
    return (
      <div className="flex items-center p-4 mt-4 mb-4 ml-4 mr-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm">
        <AiOutlineWarning className="w-6 h-6 ml-2 shrink-0" />

        <span className="text-sm md:text-base">
          برای مشاهده داشبورد باید وارد حساب کاربری خود شوید.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
