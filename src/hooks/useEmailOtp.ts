"use client";

import * as O from "@/Imports/OtpImports/OtpImports";
import { supabase } from "@/lib/supabaseClient";

export const OTP_LENGTH = 8;

export function useEmailOtp() {
  const [otp, setOtp] = O.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = O.useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = O.useState(false);
  const router = O.useRouter();

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      O.toast.error("لطفاً تمام ۸ رقم را وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpValue }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.error?.includes("منقضی")) {
          O.toast.error(
            "شما هنوز ورود را شروع نکرده‌اید. لطفا دوباره ایمیل خود را وارد کنید.",
          );
          router.push("/auth/signup");
          return;
        }
        throw new Error(result.error ?? "خطا در تایید کد OTP");
      }

      // همگام‌سازی کلاینت مرورگری با سشنی که سرور ساخته
      // این خط باعث می‌شه onAuthStateChange در useAuthUser بلافاصله
      // فایر بشه و Header بدون نیاز به رفرش آپدیت شه
      if (result.session?.access_token && result.session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: result.session.access_token,
          refresh_token: result.session.refresh_token,
        });
      }

      O.toast.success("ورود موفق! در حال هدایت به داشبورد...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      O.toast.error(err instanceof Error ? err.message : "خطا در تایید کد OTP");
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
