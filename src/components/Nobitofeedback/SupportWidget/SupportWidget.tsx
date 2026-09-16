"use client";

import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import SupportPanel from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportPanel";

export default function SupportWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="پشتیبانی"
        onClick={() => setOpen(true)}
        className="
          group fixed bottom-6 left-6 z-60
          w-14 h-14 rounded-2xl
          bg-[#1F7168] text-white
          flex items-center justify-center
          shadow-[0_8px_30px_rgba(31,113,104,0.35)]
          transition-all duration-300
          hover:scale-110 hover:rounded-full
          active:scale-95
        "
      >
        <FiMessageCircle
          size={25}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {open && <SupportPanel onClose={() => setOpen(false)} />}
    </>
  );
}
