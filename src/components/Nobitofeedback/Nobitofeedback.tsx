"use client";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight, FaRegThumbsUp } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

const feedback = [
  {
    id: 1,
    name: "لیلا میرزایی",
    date: "1402/08/12",
    rating: "۴/۳",
    avatar: "https://i.pravatar.cc/100?img=45",
    text: "خیلی وقت بود که می خواستم برم دکتر اما همش پشت گوش مینداختم خداروشکر با نوبیتو تونستم یه مشاوره غیرحضوری بگیرم و مشکلمو حل کنم",
  },

  {
    id: 2,
    name: "علیرضا حسابی",
    date: "1402/08/13",
    rating: "۴/۵",
    avatar: "https://i.pravatar.cc/100?img=33",
    text: "مدت ها بود که سعی میکردم برای نگهداری از برادر معلولم فیزیوتراپی پیدا کنم که امکان اینو داشته باشه به منزل ما بیاد چونکه برای داداشم خیلی سخت بود هر هفته ببریم و بیاریمش اما خب نوبیتو این مشکل رو برای من حل کرد و تونستم فیزیوتراپ مطمئن و حرفه ای رو پیدا کنم که نیاز نباشه برادرم رو ببرم و بیارم.",
  },
  {
    id: 3,
    name: "خسرو باقری",
    date: "1402/08/12",
    rating: "۴/۲",
    avatar: "https://i.pravatar.cc/100?img=12",
    text: "فک نمیکردم بتونم کلینیک های رو پیدا کنم که روی خدماتشون تخفیف گذاشتن ولی خب تونستم یک کیلینیک دندون پزشکی رو پیدا کنم با قیمت خوب کارمو انجام بدم",
  },
];

const Nobitofeedback = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div dir="rtl" className="w-full py-8">
      {/* Title */}
      <div className="flex items-center justify-center m-auto mt-4 mb-8 gap-4 max-w-xl mx-auto">
        <div className="flex-1 border-t border-gray-300"></div>
        <p className="text-[#414141] text-2xl whitespace-nowrap font-medium">
          <span className="text-[#1F7168]">بازخورد</span> بیماران نوبیتو
        </p>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Cards */}
      <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
        {feedback.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-sm p-5 w-full md:w-80 transition-all duration-300 ${
                isActive
                  ? "border border-gray-200 scale-100"
                  : "opacity-70 scale-95"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        تاریخ: {item.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <CiStar size={18} />
                  <span className="text-gray-700">{item.rating}</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {item.text}
              </p>

              <button className="flex items-center justify-start  gap-1 text-[#1F7168] text-xs font-medium hover:opacity-80 ml-auto">
                <FaRegThumbsUp size={14} />
                پیشنهاد میکنم
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          <FaChevronRight size={14} />
        </button>

        <div className="flex items-center gap-2">
          {feedback.map((item, index) => (
            <span
              key={item.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-[#1F7168]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setActiveIndex((prev) => Math.min(prev + 1, feedback.length - 1))
          }
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          <FaChevronLeft size={14} />
        </button>
      </div>

      {/* Floating chat icon */}
      <button
        type="button"
        aria-label="پشتیبانی"
        className="
    group fixed bottom-6 left-6 z-50
    w-14 h-14
    rounded-2xl
    bg-[#1F7168]
    text-white
    flex items-center justify-center
    shadow-[0_8px_30px_rgba(31,113,104,0.35)]
    ring-1 ring-white/20
    transition-all duration-300 ease-out
    hover:scale-110
    hover:rounded-full
    hover:shadow-[0_12px_40px_rgba(31,113,104,0.5)]
    active:scale-95
  "
      >
        <FiMessageCircle
          size={25}
          strokeWidth={1.8}
          className="
      transition-transform duration-300
      group-hover:scale-110
      group-hover:-rotate-6
    "
        />

        {/* Glow */}
        <span
          className="
      absolute inset-0 -z-10
      rounded-2xl
      bg-[#1F7168]
      opacity-30
      blur-xl
      transition-all duration-300
      group-hover:opacity-60
      group-hover:scale-125
    "
        />
      </button>
    </div>
  );
};

export default Nobitofeedback;
