"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as O from "@/Imports/OtpImports/OtpImports";
import LogoSection from "@/components/Otp/LogoSection/LogoSection";
import { MdArrowForward, MdErrorOutline, MdRefresh } from "react-icons/md";

interface OtpCardProps {
  otp: string[];
  setOtp: O.Dispatch<O.SetStateAction<string[]>>;
  inputRefs: O.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
  onSubmit: () => void;

  /** پیام خطا؛ اختیاری */
  error?: string;

  /** ایمیلی که کد به آن ارسال شده */
  email?: string;

  /** کلیک روی "تغییر ایمیل" */
  onChangeEmail?: () => void;

  /** درخواست ارسال مجدد کد */
  onResend?: () => void | Promise<void>;

  /** ثانیه‌های شمارش معکوس قبل از فعال‌شدن ارسال مجدد */
  resendCooldownSeconds?: number;
}

const OTP_LENGTH_DEFAULT = 8;

export const OtpCard: O.FC<OtpCardProps> = ({
  otp,
  setOtp,
  inputRefs,
  isSubmitting,
  onSubmit,
  error,
  email,
  onChangeEmail,
  onResend,
  resendCooldownSeconds = 60,
}) => {
  const router = useRouter();

  const [cooldown, setCooldown] = useState(resendCooldownSeconds);
  const [isResending, setIsResending] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);

  const hasAutoSubmitted = useRef(false);

  // -----------------------------------------
  // شمارش معکوس ارسال مجدد
  // -----------------------------------------
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // -----------------------------------------
  // ارسال خودکار وقتی همه خانه‌ها پر شدند
  // -----------------------------------------
  useEffect(() => {
    const isComplete = otp.length > 0 && otp.every((digit) => digit !== "");

    if (isComplete && !isSubmitting && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      onSubmit();
    }

    if (!isComplete) {
      hasAutoSubmitted.current = false;
    }
  }, [otp, isSubmitting, onSubmit]);

  // -----------------------------------------
  // ارسال مجدد کد
  // -----------------------------------------
  const handleResend = async () => {
    if (cooldown > 0 || isResending || isChangingEmail) {
      return;
    }

    setIsResending(true);

    try {
      await onResend?.();

      setCooldown(resendCooldownSeconds);

      setOtp(new Array(otp.length || OTP_LENGTH_DEFAULT).fill(""));

      hasAutoSubmitted.current = false;

      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("OTP resend failed:", error);
    } finally {
      setIsResending(false);
    }
  };

  // -----------------------------------------
  // تغییر ایمیل
  // -----------------------------------------
  const handleChangeEmail = async () => {
    if (isChangingEmail || isResending || isSubmitting) {
      return;
    }

    setIsChangingEmail(true);

    try {
      // حذف OTP session قبلی از سمت سرور
      const response = await fetch("/api/auth/cancel-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("Could not clear OTP session.");
      }

      // پاک کردن OTP فعلی از state
      setOtp(new Array(otp.length || OTP_LENGTH_DEFAULT).fill(""));

      hasAutoSubmitted.current = false;

      // اجرای callback والد
      onChangeEmail?.();

      // انتقال به صفحه signup
      router.replace("/auth/signup");
    } catch (error) {
      console.error("Change email failed:", error);

      // حتی در صورت خطا کاربر بتواند به signup برگردد
      onChangeEmail?.();

      router.replace("/auth/signup");
    }
  };

  return (
    <div
      dir="rtl"
      className="
        flex w-[95%] max-w-112.5
        flex-col items-center
        rounded-2xl bg-white
        p-4 shadow-lg
        sm:p-8
      "
    >
      {/* Logo */}
      <LogoSection />

      {/* عنوان */}
      <h1
        className="
          mb-2 text-center
          text-xl font-bold text-black
          sm:text-2xl
        "
      >
        وارد کردن کد تایید ایمیل
      </h1>

      {/* توضیحات */}
      <p
        className="
          mb-1 text-center
          text-xs text-gray-500
          sm:text-sm
        "
      >
        لطفا کد ۸ رقمی ارسال شده به ایمیل خود را وارد کنید.
      </p>

      {/* ایمیل */}
      {email && (
        <div
          className="
            mb-4 text-xs text-gray-600
            sm:text-sm
          "
        >
          کد به{" "}
          <span dir="ltr" className="font-medium text-gray-800">
            {email}
          </span>{" "}
          ارسال شد
        </div>
      )}

      {/* OTP Input */}
      <O.OtpInput
        otp={otp}
        setOtp={setOtp}
        inputRefs={inputRefs}
        isSubmitting={isSubmitting || isChangingEmail || isResending}
      />

      {/* ارسال مجدد + تغییر ایمیل */}
      <div
        className="
          mt-3 flex w-full
          items-center justify-center
          gap-2 text-xs
          sm:text-sm
        "
      >
        {cooldown > 0 ? (
          <span className="text-gray-500">
            ارسال مجدد کد تا{" "}
            <span dir="ltr" className="font-medium text-gray-700">
              {String(Math.floor(cooldown / 60)).padStart(2, "0")}:
              {String(cooldown % 60).padStart(2, "0")}
            </span>{" "}
            دیگر
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending || isChangingEmail || isSubmitting}
            className="
              inline-flex items-center
              gap-1.5 font-bold
              text-brand
              transition
              hover:text-brand-dark
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <MdRefresh
              size={15}
              className={isResending ? "animate-spin" : ""}
            />

            {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
          </button>
        )}

        <span className="text-gray-300">|</span>

        {/* تغییر ایمیل */}
        <button
          type="button"
          onClick={handleChangeEmail}
          disabled={isChangingEmail || isResending || isSubmitting}
          className="
            inline-flex items-center
            gap-1 font-medium
            text-gray-500
            transition
            hover:text-gray-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <MdArrowForward size={14} />

          {isChangingEmail ? "در حال تغییر..." : "تغییر ایمیل"}
        </button>
      </div>

      {/* پیام خطا */}
      <div
        role="alert"
        aria-live="polite"
        className="
          mt-3 min-h-5
          w-full text-center
        "
      >
        {error && (
          <p
            className="
              flex items-center
              justify-center gap-1.5
              text-sm font-medium
              text-red-500
            "
          >
            <MdErrorOutline size={17} />
            {error}
          </p>
        )}
      </div>

      {/* دکمه تایید */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting || isChangingEmail || isResending}
        aria-live="polite"
        className={`
          mt-2 w-full
          rounded-xl py-3
          text-sm font-bold text-white
          bg-[#1F7168]
          transition-colors
          sm:py-4 sm:text-base

          ${
            isSubmitting || isChangingEmail || isResending
              ? "cursor-not-allowed bg-gray-400"
              : "bg-brand hover:bg-brand-dark"
          }
        `}
      >
        {isSubmitting ? "در حال تایید..." : "تایید و ورود به داشبورد"}
      </button>
    </div>
  );
};
