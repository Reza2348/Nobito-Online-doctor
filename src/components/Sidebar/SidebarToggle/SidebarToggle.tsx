"use client";

import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const SidebarToggle = ({ sidebarOpen, setSidebarOpen }: any) => {
  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="fixed top-4 right-4 z-50 md:hidden bg-[#2d7d74] text-white p-2 rounded-xl"
    >
      {sidebarOpen ? (
        <HiOutlineX className="text-2xl" />
      ) : (
        <HiOutlineMenu className="text-2xl" />
      )}
    </button>
  );
};

export default SidebarToggle;
