"use client";

import * as O from "@/Imports/OtpImports/OtpImports";
import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";
import { supabase } from "@/lib/supabaseClient";

export const OTP_LENGTH = 8;

export function useEmailOtp() {
  const [otp, setOtp] = O.useState<string[]>(Array(OTP_LENGTH).fill(""));

  const inputRefs = O.useRef<(HTMLInputElement | null)[]>([]);

  const [isSubmitting, setIsSubmitting] = O.useState(false);

  const router = O.useRouter();

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    // =========================================
    // بررسی کامل بودن OTP
    // =========================================

    if (otpValue.length !== OTP_LENGTH) {
      O.toast.error(`لطفاً تمام ${OTP_LENGTH} رقم را وارد کنید.`);
      return;
    }

    // =========================================
    // دریافت ایمیل
    // =========================================

    const email = sessionStorage.getItem("norbin_otp_email");

    if (!email) {
      O.toast.error(
        "ایمیل ورود پیدا نشد. لطفاً دوباره ایمیل خود را وارد کنید.",
      );

      router.replace("/auth/signup");
      return;
    }

    setIsSubmitting(true);

    try {
      // =========================================
      // Verify OTP در Backend
      // =========================================

      const { data: result } = await axiosClient.post("/api/auth/verify-otp", {
        email,
        token: otpValue,
      });

      // =========================================
      // بررسی Session برگشتی از Backend
      // =========================================

      const accessToken = result?.session?.access_token;

      const refreshToken = result?.session?.refresh_token;

      if (!accessToken || !refreshToken) {
        throw new Error("جلسه ورود از سرور دریافت نشد.");
      }

      // =========================================
      // ثبت Session در Supabase سمت فرانت‌اند
      // =========================================

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }

      // =========================================
      // Session با موفقیت ثبت شد
      // =========================================

      sessionStorage.removeItem("norbin_otp_email");

      O.toast.success("ورود موفق! در حال انتقال...");

      // =========================================
      // انتقال به صفحه اصلی
      // =========================================

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 500);
    } catch (error: unknown) {
      const message = getAxiosErrorMessage(error, "خطا در تأیید کد");

      console.error("OTP verification error:", error);

      O.toast.error(message);

      // =========================================
      // OTP نامعتبر / منقضی
      // =========================================

      const normalizedMessage = message.toLowerCase();

      if (
        message.includes("منقضی") ||
        message.includes("نامعتبر") ||
        normalizedMessage.includes("expired") ||
        normalizedMessage.includes("invalid")
      ) {
        sessionStorage.removeItem("norbin_otp_email");

        setTimeout(() => {
          router.replace("/auth/signup");
        }, 1200);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    otp,
    setOtp,
    inputRefs,
    isSubmitting,
    handleSubmit,
  };
}
