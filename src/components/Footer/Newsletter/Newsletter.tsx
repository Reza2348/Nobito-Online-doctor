"use client";

import React from "react";
import * as F from "@/Imports/FooterImports/FooterImports";

type Props = {
  mobile?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Newsletter({ mobile = false, onSubmit }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 text-right w-full ${
        mobile ? "pt-8 pb-4" : ""
      }`}
    >
      {/* عنوان */}
      <h3 className="text-gray-800 text-[16px] font-semibold">خبرنامه</h3>

      {/* توضیح کوتاه */}
      <p className="text-[12px] text-gray-500 leading-relaxed">
        برای اینکه از جدیدترین اخبار نوبیتو جا نمونید...
      </p>

      {/* فرم */}
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {/* ردیف input و دکمه */}
        <div className="flex flex-col sm:flex-row-reverse gap-2">
          <input
            name="email"
            type="email"
            required
            placeholder="ایمیل خود را اینجا وارد کنید"
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-right outline-none focus:border-[#1F7168] transition-colors"
          />

          {/* دکمه دسکتاپ */}
          {!mobile && (
            <button
              type="submit"
              className="bg-[#3E7B71] text-white rounded-xl px-6 py-3 hover:bg-[#2d5c54] transition-colors whitespace-nowrap"
            >
              ارسال
            </button>
          )}
        </div>

        {/* متن توضیح تک‌خطی فقط در دسکتاپ */}
        <p className="text-[11px] text-gray-400 leading-relaxed whitespace-normal lg:whitespace-nowrap lg:truncate">
          تلاش ما ارائه بهترین خدمات ممکن به شما همراهان نوبیتو است.
        </p>

        {/* دکمه موبایل */}
        {mobile && (
          <button
            type="submit"
            className="w-full bg-[#3E7B71] text-white rounded-xl py-3 font-bold hover:bg-[#2d5c54] transition-colors"
          >
            ارسال
          </button>
        )}
      </form>
    </div>
  );
}
