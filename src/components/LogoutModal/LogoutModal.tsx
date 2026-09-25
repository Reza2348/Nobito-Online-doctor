"use client";

import React, { useEffect, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // مدیریت باز/بسته شدن: ذخیره و بازگردانی فوکوس
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    closeBtnRef.current?.focus();

    // جلوگیری از اسکرول پس‌زمینه
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // بستن با Esc و تله‌ی فوکوس با Tab
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        aria-describedby="logout-modal-desc"
        className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-5"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="logout-modal-title"
            className="text-lg font-bold text-gray-800"
          >
            خروج از حساب کاربری
          </h2>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="بستن"
            className="text-gray-500 hover:text-red-500 transition"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        <p id="logout-modal-desc" className="text-sm text-gray-600 leading-6">
          با خروج از حساب کاربریتان به اطلاعاتی که وارد کردید دسترسی نخواهید
          داشت و باید مجدداً وارد شوید.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            انصراف
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
