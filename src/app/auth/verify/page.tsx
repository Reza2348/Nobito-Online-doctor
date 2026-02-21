"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";

export default function EmailOtpVerifyPage() {
  const OTP_LENGTH = 8;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState<string | null>(null);

  const router = useRouter();

  // بررسی identifier از localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("otp_identifier");
    if (!storedId) {
      toast.error(
        "شما هنوز ورود را شروع نکرده‌اید. لطفا دوباره ایمیل خود را وارد کنید.",
      );
      router.push("/auth/signup");
    } else {
      setIdentifier(storedId);
    }
  }, [router]);

  // تغییر مقدار هر باکس
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // فقط اعداد
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  // مدیریت کلیدها
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // پشتیبانی Paste کامل OTP
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData
      .split("")
      .concat(Array(OTP_LENGTH).fill(""))
      .slice(0, OTP_LENGTH);
    setOtp(newOtp);

    const lastIndex = pasteData.length - 1;
    if (lastIndex >= 0) inputRefs.current[lastIndex]?.focus();

    e.preventDefault();
  };

  // تایید OTP
  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      toast.error("لطفاً تمام ۸ رقم را وارد کنید.");
      return;
    }

    if (!identifier) return;

    setIsSubmitting(true);

    try {
      // تایید OTP برای ایمیل
      const { data, error } = await supabase.auth.verifyOtp({
        email: identifier,
        token: otpValue,
        type: "email",
      });

      if (error) throw error;
      if (!data?.session)
        throw new Error("ورود ناموفق. لطفا دوباره تلاش کنید.");

      toast.success("ورود موفق! در حال هدایت به داشبورد...");
      localStorage.removeItem("otp_identifier");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "خطا در تایید کد OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] font-[tahoma]">
      <div className="w-[95%] max-w-[450px] bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">وارد کردن کد تایید ایمیل</h1>
        <p className="text-sm text-[#757575] mb-4 text-center">
          لطفا کد ۸ رقمی ارسال شده به ایمیل خود را وارد کنید.
        </p>

        <div className="flex gap-2 mb-6" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el; // ✅ type-safe
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#347469] text-black transition-colors"
              disabled={isSubmitting}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#347469] hover:bg-[#2a5d54]"
          }`}
        >
          {isSubmitting ? "در حال تایید..." : "تایید و ورود به داشبورد"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} rtl />
    </div>
  );
}
