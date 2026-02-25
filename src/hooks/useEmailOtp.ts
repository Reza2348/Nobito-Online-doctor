"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

export const OTP_LENGTH = 8;

export function useEmailOtp() {
  const [otp, setOtp] = O.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = O.useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = O.useState(false);
  const [identifier, setIdentifier] = O.useState<string | null>(null);
  const router = O.useRouter();

  // بررسی identifier از localStorage
  O.useEffect(() => {
    const storedId = localStorage.getItem("otp_identifier");
    if (!storedId) {
      O.toast.error(
        "شما هنوز ورود را شروع نکرده‌اید. لطفا دوباره ایمیل خود را وارد کنید.",
      );
      router.push("/auth/signup");
    } else {
      setIdentifier(storedId);
    }
  }, [router]);

  // تابع تایید OTP
  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      O.toast.error("لطفاً تمام ۸ رقم را وارد کنید.");
      return;
    }
    if (!identifier) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await O.supabase.auth.verifyOtp({
        email: identifier,
        token: otpValue,
        type: "email",
      });

      if (error) throw error;
      if (!data?.session)
        throw new Error("ورود ناموفق. لطفا دوباره تلاش کنید.");

      O.toast.success("ورود موفق! در حال هدایت به داشبورد...");
      localStorage.removeItem("otp_identifier");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      O.toast.error(err.message || "خطا در تایید کد OTP");
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
