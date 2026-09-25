"use client";

import { useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiCheckCircle,
  FiNavigation,
} from "react-icons/fi";

export default function LocationPicker() {
  const [search, setSearch] = useState("");

  return (
    <section
      dir="rtl"
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-emerald-200/30 blur-3xl rounded-full" />

      <div className="relative w-full max-w-2xl rounded-[40px] bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-l from-emerald-600 to-blue-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FiMapPin className="text-2xl" />
            </div>

            <div>
              <h1 className="text-xl font-black">انتخاب موقعیت</h1>

              <p className="text-sm text-white/80 mt-1">
                آدرس دقیق خود را مشخص کنید
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-5 h-14 transition focus-within:ring-4 focus-within:ring-emerald-100">
            <FiSearch className="text-gray-400 text-xl" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی شهر، خیابان یا مکان..."
              className="flex-1 bg-transparent outline-none text-gray-900 text-sm"
            />
          </div>

          <div className="relative h-80 rounded-[32px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_40%)]" />

            <div className="relative text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <FiNavigation className="text-3xl text-emerald-600" />
              </div>

              <p className="font-bold text-gray-900">
                موقعیت خود را روی نقشه انتخاب کنید
              </p>

              <span className="text-xs text-gray-500">
                Google Maps / Mapbox در این بخش قرار می‌گیرد
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 border p-4 text-sm text-gray-600 leading-6">
            برای دقت بیشتر، روی نقشه زوم کنید و محل دقیق را انتخاب نمایید.
          </div>

          <button className="w-full h-14 rounded-2xl bg-gradient-to-l from-emerald-600 to-blue-600 text-white font-bold flex items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]">
            <FiCheckCircle className="text-xl" />
            تأیید و ثبت آدرس
          </button>
        </div>
      </div>
    </section>
  );
}
