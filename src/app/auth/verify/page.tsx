"use client";

import * as O from "@/Imports/OtpImports/OtpImports";
import { OtpCard } from "@/Imports/OtpImports/OtpImports";
import { useEmailOtp } from "@/hooks/useEmailOtp";

export default function EmailOtpVerifyPage() {
  const { otp, setOtp, inputRefs, isSubmitting, handleSubmit } = useEmailOtp();

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
