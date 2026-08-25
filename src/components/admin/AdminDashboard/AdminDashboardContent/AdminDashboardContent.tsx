"use client";

import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";

import type { AdminPage } from "@/Types/types";

import AdminPageRenderer from "@/components/admin/AdminDashboard/AdminPageRenderer/AdminPageRenderer";

interface AdminDashboardContentProps {
  page: AdminPage;
  onMenuClick: () => void;
}

export default function AdminDashboardContent({
  page,
  onMenuClick,
}: AdminDashboardContentProps) {
  return (
    <main
      className="
        flex
        min-w-0
        flex-1
        flex-col
      "
    >
      {/* Header */}
      <header
        className="
          sticky
          top-0
          z-30
          border-b
          border-gray-100
          bg-white/80
          backdrop-blur-xl
        "
      >
        <AdminHeader onMenuClick={onMenuClick} />
      </header>

      {/* Content */}
      <section
        className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-6
          lg:p-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >
          <AdminPageRenderer page={page} />
        </div>
      </section>
    </main>
  );
}
