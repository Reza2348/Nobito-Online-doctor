"use client";

import { FaShieldAlt } from "react-icons/fa";

export default function LoginHeader() {
  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
        <FaShieldAlt size={40} />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-gray-800">پنل مدیریت</h1>

      <p className="mt-2 text-sm text-gray-500">ورود امن Nobito</p>
    </div>
  );
}
