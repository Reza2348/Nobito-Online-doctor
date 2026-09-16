"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as O from "@/Imports/OtpImports/OtpImports";
import { axiosClient } from "@/lib/axiosClient";

import LogoSection from "@/components/Otp/LogoSection/LogoSection";

import OtpHeader from "@/components/Otp/OtpCard/OtpHeader/OtpHeader";
import OtpEmailInfo from "@/components/Otp/OtpCard/OtpEmailInfo/OtpEmailInfo";
import OtpActions from "@/components/Otp/OtpCard/OtpActions/OtpActions";
import OtpError from "@/components/Otp/OtpCard/OtpError/OtpError";
import OtpSubmitButton from "@/components/Otp/OtpCard/OtpSubmitButton/OtpSubmitButton";

import { useOtpResend } from "@/hooks/useOtpResend";
import { useOtpAutoSubmit } from "@/hooks/useOtpAutoSubmit";

interface OtpCardProps {
  otp: string[];
  setOtp: O.Dispatch<O.SetStateAction<string[]>>;
  inputRefs: O.MutableRefObject<(HTMLInputElement | null)[]>;

  isSubmitting: boolean;
  onSubmit: () => void;

  error?: string;
  email?: string;

  onChangeEmail?: () => void;
  onResend?: () => void | Promise<void>;

  resendCooldownSeconds?: number;
}

const OTP_LENGTH = 8;

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

  const [isChangingEmail, setIsChangingEmail] = useState(false);

  /*
   * وضعیت کلی کامپوننت
   */
  const isBusy = isSubmitting || isChangingEmail;

  /*
   * ارسال مجدد OTP
   */
  const { cooldown, isResending, handleResend } = useOtpResend({
    otpLength: OTP_LENGTH,
    cooldownSeconds: resendCooldownSeconds,
    isSubmitting: isBusy,
    onResend,
    setOtp,
    inputRefs,
  });

  /*
   * ارسال خودکار بعد از تکمیل ۸ رقم
   */
  useOtpAutoSubmit({
    otp,
    otpLength: OTP_LENGTH,
    isSubmitting: isBusy || isResending,
    onSubmit,
  });

  /*
   * تغییر ایمیل
   */
  const handleChangeEmail = async () => {
    if (isBusy || isResending) {
      return;
    }

    setIsChangingEmail(true);

    try {
      await axiosClient.post("/api/auth/cancel-otp");
    } catch (error) {
      console.warn("Could not clear OTP session:", error);
    } finally {
      setOtp(Array(OTP_LENGTH).fill(""));

      onChangeEmail?.();

      router.replace("/auth/signup");
    }
  };

  return (
    <div
      dir="rtl"
      className="
        flex
        w-[95%]
        max-w-112.5
        flex-col
        items-center
        rounded-2xl
        bg-white
        p-4
        shadow-lg
        sm:p-8
      "
    >
      <LogoSection />

      <OtpHeader />

      <OtpEmailInfo email={email} />

      <O.OtpInput
        otp={otp}
        setOtp={setOtp}
        inputRefs={inputRefs}
        isSubmitting={isSubmitting || isChangingEmail || isResending}
      />

      <OtpActions
        cooldown={cooldown}
        isResending={isResending}
        isChangingEmail={isChangingEmail}
        isSubmitting={isSubmitting}
        onResend={handleResend}
        onChangeEmail={handleChangeEmail}
      />

      <OtpError error={error} />

      <OtpSubmitButton
        isSubmitting={isSubmitting}
        disabled={isChangingEmail || isResending}
        onSubmit={onSubmit}
      />
    </div>
  );
};
