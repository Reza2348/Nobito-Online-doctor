"use client";

import * as O from "@/Imports/OtpImports/OtpImports";
import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";
import { supabase } from "@/lib/supabaseClient";

export default function EmailOtpVerifyPage() {
  const OTP_LENGTH = 8;

  const [otp, setOtp] = O.useState<string[]>(Array(OTP_LENGTH).fill(""));

  const inputRefs = O.useRef<(HTMLInputElement | null)[]>([]);

  const [isSubmitting, setIsSubmitting] = O.useState(false);

  const router = O.useRouter();

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH) {
      O.toast.error(`لطفاً تمام ${OTP_LENGTH} رقم را وارد کنید.`);
      return;
    }

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
      // 1. ارسال OTP به Backend
      const { data: result } = await axiosClient.post("/api/auth/verify-otp", {
        email,
        token: otpValue,
      });

      // 2. دریافت Session از Backend
      const accessToken = result?.session?.access_token;

      const refreshToken = result?.session?.refresh_token;

      if (!accessToken || !refreshToken) {
        throw new Error("جلسه ورود از سرور دریافت نشد.");
      }

      // 3. ثبت Session در Supabase فرانت‌اند
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }

      // 4. ایمیل موقت دیگر لازم نیست
      sessionStorage.removeItem("norbin_otp_email");

      O.toast.success("ورود موفق! در حال انتقال...");

      // 5. برگشت به صفحه اصلی
      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 500);
    } catch (err: unknown) {
      const message = getAxiosErrorMessage(err, "خطا در تأیید کد");

      console.error("OTP verification error:", err);

      O.toast.error(message);

      const isInvalidOtp =
        message.includes("منقضی") ||
        message.includes("expired") ||
        message.includes("Invalid") ||
        message.includes("invalid");

      if (isInvalidOtp) {
        sessionStorage.removeItem("norbin_otp_email");

        setTimeout(() => {
          router.replace("/auth/signup");
        }, 1200);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] font-[tahoma] px-4">
      <O.OtpCard
        otp={otp}
        setOtp={setOtp}
        inputRefs={inputRefs}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />

      <O.ToastContainer position="top-right" autoClose={2000} rtl />
    </div>
  );
}
