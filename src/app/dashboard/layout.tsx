"use client";

import React, { PropsWithChildren, useState } from "react";
import Sidebar from "@/components/Sidebar/page";
import { useUser } from "@/hooks/useUser";
import { AiOutlineWarning } from "react-icons/ai";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId, status } = useUser();

  // در حال لود session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2d7d74] rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated" || !userId) {
    return (
      <div
        className="flex items-center p-4 mt-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm"
        dir="rtl"
      >
        <AiOutlineWarning className="w-6 h-6 ml-2 flex-shrink-0" />{" "}
        {/* ml-2 به جای mr-2 برای راست‌چین */}
        <span className="text-sm md:text-base text-right">
          شما باید وارد شوید تا داشبورد خود را مشاهده کنید.
        </span>
      </div>
    );
  }

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
