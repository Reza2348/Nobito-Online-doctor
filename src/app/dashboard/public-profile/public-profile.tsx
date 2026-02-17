"use client";

import React from "react";
import * as P from "@/Imports/publicprofileImports/publicprofileImports"; // با فرض وجود ایمپورت‌های قبلی شما

export default function ProfilePage() {
  // استفاده از React Hook Form برای مدیریت فرم
  const { register, handleSubmit } = P.useForm();

  const onSubmit = (data: any) => {
    console.log("Data submitted:", data);
  };

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-[tahoma]"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* بنر اطلاع‌رسانی (Alert Box) */}
        <div className="w-full bg-[#E3F2FD] border border-[#BBDEFB] rounded-xl p-4 flex items-center justify-between text-[#1976D2]">
          <div className="flex items-center gap-3">
            <span className="bg-[#1976D2] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
              !
            </span>
            <p className="text-sm md:text-base font-medium">
              با تکمیل اطلاعات هویتی خود می‌توانید از امکاناتی مثل فروشگاه
              استفاده کنید
            </p>
          </div>
          <P.FaChevronLeft className="text-xs opacity-50" />
        </div>

        {/* کارت اصلی فرم */}
        <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
          {/* هدر بخش اطلاعات */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-700">
              اطلاعات حساب کاربری
            </h2>
            <h2 className="text-xl font-bold text-gray-700">شمان یسخاره</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* ردیف اول: نام و نام خانوادگی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#347469] font-bold mr-1 text-left">
                  نام
                </label>
                <input
                  {...register("firstName")}
                  className="w-full bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-bold mr-1">
                  نام خانوادگی
                </label>
                <input
                  {...register("lastName")}
                  className="w-full bg-[#F2F2F2] border-none rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>
            </div>

            {/* ردیف دوم: کدملی و شماره تلفن */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-bold mr-1">
                  کدملی
                </label>
                <input
                  {...register("nationalId")}
                  className="w-full bg-[#F2F2F2] border-none rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-bold mr-1 text-left">
                  شماره تلفن
                </label>
                <input
                  {...register("phoneNumber")}
                  className="w-full bg-[#F2F2F2] border-none rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>
            </div>

            {/* ردیف سوم: کشور و استان */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm text-gray-400 font-bold mr-1">
                  کشور
                </label>
                <select className="appearance-none w-full bg-[#F2F2F2] border-none rounded-xl py-3 px-4 outline-none opacity-70 cursor-not-allowed">
                  <option>ایران</option>
                </select>
                <P.FaChevronDown className="absolute left-4 top-[70%] -translate-y-1/2 text-gray-400 text-xs" />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm text-gray-400 font-bold mr-1">
                  استان
                </label>
                <select className="appearance-none w-full bg-[#F2F2F2] border-none rounded-xl py-3 px-4 outline-none opacity-70">
                  <option value="">انتخاب کنید</option>
                </select>
                <P.FaChevronDown className="absolute left-4 top-[70%] -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            {/* بخش فوتر فرم (دکمه و راهنما) */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-50 gap-4">
              <button
                type="submit"
                className="bg-[#347469] hover:bg-[#2a5d54] text-white font-bold py-3 px-10 rounded-xl shadow-md transition-all active:scale-95"
              >
                ذخیره تغییرات
              </button>

              <p className="text-[11px] text-[#347469]/70 font-medium text-center md:text-right">
                برای تغییر هر بخش از اطلاعات کافی است بر روی آن کلیک کنید و پس
                از اعمال تغییرات بر روی دکمه ذخیره کلیک کنید
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
