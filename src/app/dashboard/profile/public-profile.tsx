"use client";

import React from "react";
import * as P from "@/Imports/publicprofileImports/publicprofileImports";

export default function ProfilePage() {
  const { register, handleSubmit } = P.useForm();

  const onSubmit = (data: any) => {
    console.log("Data submitted:", data);
  };

  return (
    <div
      className="w-full min-h-screen pl-6 pr-10 md:pl-12 md:pr-20 py-6 md:py-12 font-[tahoma]"
      dir="rtl"
    >
      <div className="w-full space-y-6">
        <div className="w-full bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-700">
              اطلاعات حساب کاربری
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#1F7168] font-bold mr-1 text-right">
                  نام
                </label>
                <input
                  {...register("firstName")}
                  className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#1F7168] font-bold mr-1">
                  نام خانوادگی
                </label>
                <input
                  {...register("lastName")}
                  className="w-full text-black bg-[#F2F2F2]  border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#1F7168] font-bold mr-1">
                  کدملی
                </label>
                <input
                  {...register("nationalId")}
                  className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white  rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-[#1F7168] font-bold mr-1 text-right">
                  شماره تلفن
                </label>
                <input
                  {...register("phoneNumber")}
                  className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-whit  rounded-xl py-3 px-4 outline-none opacity-70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm text-[#1F7168] font-bold mr-1">
                  کشور
                </label>
                <select className="appearance-none w-full bg-[#F2F2F2] text-black border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none opacity-70 ">
                  <option>ایران</option>
                  <option value="tehran">ترکیه</option>
                  <option value="shiraz">المان</option>
                  <option value="isfahan">امستردام</option>
                </select>
                <P.FaChevronDown className="absolute left-4 top-[70%] -translate-y-1/2 text-gray-400 text-xs" />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm text-gray-400 font-bold mr-1">
                  استان
                </label>
                <select className="appearance-none w-full bg-[#F2F2F2] text-black border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none opacity-70">
                  <option value="">انتخاب کنید</option>
                  <option value="tehran">تهران</option>
                  <option value="shiraz">شیراز</option>
                  <option value="isfahan">اصفهان</option>
                </select>
                <P.FaChevronDown className="absolute left-4 top-[70%] -translate-y-1/2 text-gray-400 text-xs" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-50 gap-4">
              <p className="text-[15px] text-[#347469]/70 font-medium text-center md:text-right">
                برای تغییر هر بخش از اطلاعات کافی است به روی آن کلیک کنید و پس
                از اعمال تغییرات بر روی دکمه ذخیره کلیک کنید
              </p>

              <button
                type="submit"
                className="bg-[#347469] hover:bg-[#2a5d54] text-white font-bold w-34 py-2 px-2 rounded-md shadow-md transition-all active:scale-95"
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
