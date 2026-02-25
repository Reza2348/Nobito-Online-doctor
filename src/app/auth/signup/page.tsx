"use client";

import { useState } from "react";
import LogoSection from "@/components/Signup/LogoSection/LogoSection"; // مسیر فرضی فایل‌ها
import HeaderSection from "@/components/Signup/HeaderSection/HeaderSection";
import LoginForm from "@/components/Signup/LoginForm/LoginForm";
import TermsSection from "@/components/Signup/TermsSection/TermsSection";
import ToastProvider from "@/components/Signup/ToastProvider/ToastProvider";

export default function MagicLinkPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-[tahoma]">
      <div className="w-[95%] max-w-112.5 bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        {/* بلوک لوگو */}
        <LogoSection />

        {/* بلوک عنوان و توضیح */}
        <HeaderSection />

        {/* بلوک فرم ورود */}
        <LoginForm />

        {/* بلوک متن شرایط و قوانین */}
        <TermsSection />
      </div>

      {/* Toast */}
      <ToastProvider />
    </div>
  );
}
