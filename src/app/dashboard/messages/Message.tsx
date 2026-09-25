"use client";

import React, { useState } from "react";
import { FaBullhorn, FaBell, FaStethoscope } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function Message() {
  const [tab, setTab] = useState("all");

  const messages = [
    {
      id: 1,
      title: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      body: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
      date: "۱۲ بهمن",
      icon: (
        <FaBullhorn className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#1F7168] text-white rounded-full" />
      ),
      unread: true,
    },
    {
      id: 2,
      title: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      body: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
      date: "۱۲ بهمن",
      icon: (
        <FaBell className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#FFB342] text-[#292D32] rounded-full" />
      ),
    },
    {
      id: 3,
      title: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
      body: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است",
      date: "۱۲ بهمن",
      icon: (
        <FaStethoscope className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#0683C9] text-white rounded-full" />
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen  px-4 md:px-12 py-6 md:py-12 font-[Tahoma]">
      <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        {/* هدر */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-8 py-4 md:py-6 border-b border-[#E4E4E4]">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            پیغام‌ها
          </h2>

          <div className="flex items-center gap-2 text-sm text-[#1F7168] cursor-pointer">
            <FaBell className="w-4 h-4" />
            تغییر پیغام‌ها به خوانده شده
          </div>
        </div>

        {/* تب‌ها */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 px-4 md:px-8 py-4 border-b border-[#E4E4E4]">
          {["all", "notify", "doctor"].map((t) => (
            <button
              key={t}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm rounded-full border whitespace-nowrap transition-all ${
                tab === t
                  ? "text-[#1F7168] border-[#1F7168]"
                  : "text-[#919191] border-[#E4E4E4]"
              }`}
              onClick={() => setTab(t)}
            >
              {t === "all" && "همه پیام‌ها"}
              {t === "notify" && (
                <>
                  <FaBell className="w-3 h-3 md:w-4 md:h-4" /> اطلاع رسانی‌ها
                </>
              )}
              {t === "doctor" && (
                <>
                  <FaStethoscope className="w-3 h-3 md:w-4 md:h-4" /> دستور پزشک
                </>
              )}
            </button>
          ))}
        </div>

        {/* لیست پیام‌ها */}
        <div className="px-4 md:px-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start gap-3 md:gap-4 py-4 md:py-5 border-b border-[#E4E4E4] last:border-0"
            >
              {/* 🔵 نقطه نخوانده سمت چپ */}
              {msg.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
              )}

              {/* آیکون */}
              <div className="shrink-0">{msg.icon}</div>

              {/* محتوا */}
              <div className="flex-1">
                <h3 className="text-[#414141] font-semibold text-sm md:text-base leading-6">
                  {msg.title}
                </h3>

                <p className="text-[#919191] text-xs md:text-sm mt-1 leading-5">
                  {msg.body}
                </p>

                {/* 🔁 footer جابجا شده */}
                <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-2 mt-3">
                  {/* 👈 سمت چپ */}
                  <button className="flex items-center gap-1 text-[#0683C9] text-xs md:text-sm">
                    جزئیات بیشتر
                    <FaChevronDown className="w-3 h-3" />
                  </button>

                  {/* 👉 سمت راست */}
                  <span className="text-[#919191] text-[11px] md:text-xs">
                    {msg.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
