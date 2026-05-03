"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/page";
import PublicProfile from "@/app/dashboard/Publicprofile/public-profile";

export default function DashboardLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  const renderContent = () => {
    switch (activeItem) {
      case 1:
        return <PublicProfile />;
      case 2:
        return <div>تاریخچه نوبت‌ها</div>;
      case 3:
        return <div>پیغام‌ها</div>;
      case 4:
        return <div>پرونده پزشکی</div>;
      case 5:
        return <div>بازخوردها</div>;
      case 6:
        return <div>رمز عبور</div>;
      default:
        return children;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <main className="flex-1 p-4 md:p-8">{renderContent()}</main>
    </div>
  );
}
