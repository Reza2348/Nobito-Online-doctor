"use client";

import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

import type { AdminPage } from "@/Types/types";

interface AdminMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onPageChange: (page: AdminPage) => void;
}

export default function AdminMobileSidebar({
  isOpen,
  onClose,
  onPageChange,
}: AdminMobileSidebarProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="بستن منو"
        onClick={onClose}
        className="
          absolute
          inset-0
          cursor-default
          bg-black/40
          backdrop-blur-sm
        "
      />

      {/* Sidebar */}
      <div
        className="
          relative
          z-10
          h-full
          w-72
          max-w-[80%]
          overflow-y-auto
          border-l
          border-gray-200
          bg-white
          shadow-2xl
        "
      >
        <AdminSidebar setPage={onPageChange} />
      </div>
    </div>
  );
}
