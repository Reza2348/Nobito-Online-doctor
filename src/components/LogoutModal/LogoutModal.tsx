"use client";

import React from "react";
import { HiOutlineX } from "react-icons/hi";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<Props> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-5"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            خروج از حساب کاربری
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        <p className="text-sm text-gray-600 leading-6">
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
