"use client";

import FeedbackSection from "@/components/Nobitofeedback/FeedbackSection/FeedbackSection";
import SupportWidget from "@/components/Nobitofeedback/SupportWidget/SupportWidget";

export default function NobitoFeedback() {
  return (
    <div dir="rtl" className="w-full">
      <FeedbackSection />
      <SupportWidget />
    </div>
  );
}
