"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

export default function EmailOtpVerifyPage() {
  const OTP_LENGTH = 8;
  const [otp, setOtp] = O.useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = O.useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = O.useState(false);
  const [identifier, setIdentifier] = O.useState<string | null>(null);
  const router = O.useRouter();

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
