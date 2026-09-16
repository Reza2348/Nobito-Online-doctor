"use client";

import { useState } from "react";
import FeedbackCard from "@/components/Nobitofeedback/FeedbackSection/FeedbackCard/FeedbackCard";
import FeedbackNavigation from "@/components/Nobitofeedback/FeedbackSection/FeedbackNavigation/FeedbackNavigation";

const feedback = [
  {
    id: 1,
    name: "لیلا میرزایی",
    date: "1402/08/12",
    rating: "۴/۳",
    avatar: "https://i.pravatar.cc/100?img=45",
    text: "خیلی وقت بود که می خواستم برم دکتر اما همش پشت گوش مینداختم خداروشکر با نوبیتو تونستم یه مشاوره غیرحضوری بگیرم و مشکلمو حل کردم.",
  },
  {
    id: 2,
    name: "علیرضا حسابی",
    date: "1402/08/13",
    rating: "۴/۵",
    avatar: "https://i.pravatar.cc/100?img=33",
    text: "مدت ها بود که سعی میکردم برای نگهداری از برادر معلولم فیزیوتراپی پیدا کنم که امکان اینو داشته باشه به منزل ما بیاد.",
  },
  {
    id: 3,
    name: "خسرو باقری",
    date: "1402/08/12",
    rating: "۴/۲",
    avatar: "https://i.pravatar.cc/100?img=12",
    text: "فک نمیکردم بتونم کلینیک هایی رو پیدا کنم که روی خدماتشون تخفیف گذاشتن ولی خب تونستم یک کیلینیک دندون پزشکی رو پیدا کنم.",
  },
];

export default function FeedbackSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section dir="rtl" className="w-full py-8">
      <div className="flex items-center justify-center mt-4 mb-8 gap-4 max-w-xl mx-auto">
        <div className="flex-1 border-t border-gray-300" />

        <p className="text-[#414141] text-2xl whitespace-nowrap font-medium">
          <span className="text-[#1F7168]">بازخورد</span> بیماران نوبیتو
        </p>

        <div className="flex-1 border-t border-gray-300" />
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
        {feedback.map((item, index) => (
          <FeedbackCard
            key={item.id}
            item={item}
            active={index === activeIndex}
          />
        ))}
      </div>

      <FeedbackNavigation
        count={feedback.length}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
    </section>
  );
}
