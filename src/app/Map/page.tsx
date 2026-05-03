"use client";

import { useState } from "react";
import { FiSearch, FiMapPin, FiCheckCircle } from "react-icons/fi";

export default function Page() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-5 flex items-center gap-2">
          <FiMapPin className="text-2xl" />
          <h1 className="text-lg font-bold">انتخاب موقعیت روی نقشه</h1>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <FiSearch className="text-gray-500 text-lg" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی شهر، خیابان یا نام مکان..."
              className="w-full bg-transparent outline-none text-sm text-black"
            />
          </div>

          <div className="h-72 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500 gap-2">
            <FiMapPin className="text-3xl text-blue-500" />

            <p className="text-sm font-medium text-black">
              موقعیت خود را روی نقشه انتخاب کنید
            </p>

            <span className="text-xs text-black">
              (اینجا Google Map قرار می‌گیرد)
            </span>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border">
            برای دقت بیشتر، روی نقشه زوم کنید و محل دقیق را انتخاب کنید.
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 active:scale-[0.99] transition">
            <FiCheckCircle className="text-lg" />
            تأیید و ثبت آدرس
          </button>
        </div>
      </div>
    </div>
  );
}
