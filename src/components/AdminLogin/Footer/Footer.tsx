"use client";

import { FaShieldAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="mt-6 flex justify-center gap-2 text-xs text-gray-400">
      <FaShieldAlt />
      <span>دسترسی امن سیستم</span>
    </div>
  );
}
