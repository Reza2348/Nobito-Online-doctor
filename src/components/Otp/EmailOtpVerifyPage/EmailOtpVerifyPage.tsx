"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

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

    setIsSubmitting(true);

    try {
      // The server reads the identifier from the HttpOnly cookie set by
      // /api/auth/send-otp - the client only ever handles the OTP digits.
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpValue }),
      });

      const result = await res.json();

      if (!res.ok) {
        // If the identifier cookie expired (or was never set, e.g. the
        // user landed here directly), send them back to request a new code.
        if (res.status === 400 && !result?.error?.includes("نامعتبر")) {
          router.replace("/auth/signup");
        }
        throw new Error(result.error ?? "خطا در تایید کد");
      }

      O.toast.success("ورود موفق! در حال انتقال...");

      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } catch (err: unknown) {
      O.toast.error(err instanceof Error ? err.message : "خطا در تایید کد");
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
