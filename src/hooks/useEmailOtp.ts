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
    if (otpValue.length < OTP_LENGTH) {
      O.toast.error("لطفاً تمام ۸ رقم را وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: result } = await axiosClient.post("/api/auth/verify-otp", {
        otp: otpValue,
      });

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
      const message = getAxiosErrorMessage(err, "خطا در تایید کد OTP");

      if (message.includes("منقضی")) {
        O.toast.error(
          "شما هنوز ورود را شروع نکرده‌اید. لطفا دوباره ایمیل خود را وارد کنید.",
        );
        router.push("/auth/signup");
        return;
      }

      console.error(err);
      O.toast.error(message);
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
