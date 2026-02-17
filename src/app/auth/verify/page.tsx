"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("otp_email");

    if (!savedEmail) {
      router.push("/auth/login");
      return;
    }

    setEmail(savedEmail);
    inputRefs.current[0]?.focus();

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 6) {
      setOtp(pasteData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("لطفا کد ۶ رقمی را کامل وارد کنید");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) throw error;

      sessionStorage.removeItem("otp_email");

      toast.success("ورود موفقیت‌آمیز بود!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: any) {
      console.error(err);
      toast.error("کد وارد شده اشتباه یا منقضی شده است");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (error) throw error;

      setCountdown(120);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.success("کد جدید ارسال شد!");
    } catch (err: any) {
      toast.error(err.message || "خطا در ارسال مجدد کد");
    }
  };

  const formatCountdown = () => {
    const m = Math.floor(countdown / 60);
    const s = countdown % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-[tahoma]">
      <div className="w-[95%] max-w-[450px] bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <Image src="/logo1.svg" alt="logo" width={100} height={100} priority />

        <h1 className="text-2xl font-bold mt-3 mb-2 text-[#414141]">
          تایید کد
        </h1>

        <p className="text-sm text-[#757575] mb-1 text-center">
          کد ۶ رقمی ارسال شده به ایمیل
        </p>
        <p
          className="text-sm font-bold text-[#347469] mb-6 text-center"
          dir="ltr"
        >
          {email}
        </p>

        {/* باکس‌های OTP */}
        <div className="flex gap-2 mb-6" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#347469] text-black transition-colors"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isSubmitting || otp.join("").length !== 6}
          className={`w-full py-4 rounded-xl text-white font-bold transition-colors mb-4 ${
            isSubmitting || otp.join("").length !== 6
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#347469] hover:bg-[#2a5d54]"
          }`}
        >
          {isSubmitting ? "در حال تایید..." : "تایید و ورود"}
        </button>

        {/* تایمر و ارسال مجدد */}
        <div className="text-sm">
          {countdown > 0 ? (
            <p className="text-gray-500">
              ارسال مجدد کد تا{" "}
              <span className="font-bold text-[#347469]">
                {formatCountdown()}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#347469] font-bold border-b border-[#347469]"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>

        <button
          onClick={() => router.push("/auth/signup")}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          بازگشت به صفحه ورود
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} rtl />
    </div>
  );
}
