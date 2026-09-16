"use client";

import { FiMessageCircle, FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  onClick: () => void;
};

export default function FloatingButton({ open, onClick }: Props) {
  return (
    <button
      type="button"
      aria-label={open ? "بستن پشتیبانی" : "پشتیبانی"}
      aria-expanded={open}
      onClick={onClick}
      className="group fixed bottom-6 left-6 z-60 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F7168] text-white shadow-[0_8px_30px_rgba(31,113,104,0.35)] ring-1 ring-white/20 transition-all duration-300 ease-out hover:scale-110 hover:rounded-full hover:shadow-[0_12px_40px_rgba(31,113,104,0.5)] active:scale-95"
    >
      {open ? (
        <FiX size={25} strokeWidth={1.8} />
      ) : (
        <FiMessageCircle
          size={25}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
        />
      )}

      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-2xl bg-[#1F7168] opacity-30 blur-xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-60"
      />
    </button>
  );
}
