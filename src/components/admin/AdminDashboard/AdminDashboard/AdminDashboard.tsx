"use client";

import { useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

import type { AdminPage } from "@/Types/types";

import AdminMobileSidebar from "@/components/admin/AdminDashboard/AdminMobileSidebar/AdminMobileSidebar";
import AdminDashboardContent from "@/components/admin/AdminDashboard/AdminDashboardContent/AdminDashboardContent";

export default function AdminDashboard() {
  const [page, setPage] = useState<AdminPage>("dashboard");

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSetPage = (nextPage: AdminPage): void => {
    setPage(nextPage);
    setIsSidebarOpen(false);
  };

  const handleOpenSidebar = (): void => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden
          w-72
          shrink-0
          border-l
          border-gray-200
          bg-white
          lg:block
        "
      >
        <div className="sticky top-0 h-screen overflow-y-auto">
          <AdminSidebar setPage={handleSetPage} />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AdminMobileSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onPageChange={handleSetPage}
      />

      {/* Main Content */}
      <AdminDashboardContent page={page} onMenuClick={handleOpenSidebar} />
    </div>
  );
}
