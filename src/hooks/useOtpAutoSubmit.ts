"use client";

import { useEffect, useRef } from "react";

interface UseOtpAutoSubmitOptions {
  otp: string[];
  otpLength?: number;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

const DEFAULT_OTP_LENGTH = 8;

export function useOtpAutoSubmit({
  otp,
  otpLength = DEFAULT_OTP_LENGTH,
  isSubmitting = false,
  onSubmit,
}: UseOtpAutoSubmitOptions) {
  const hasSubmitted = useRef(false);

  const isComplete =
    otp.length === otpLength && otp.every((digit) => digit !== "");

  useEffect(() => {
    if (!isComplete) {
      hasSubmitted.current = false;
      return;
    }

    if (isSubmitting || hasSubmitted.current) {
      return;
    }

    hasSubmitted.current = true;

    onSubmit();
  }, [isComplete, isSubmitting, onSubmit]);

  const resetAutoSubmit = () => {
    hasSubmitted.current = false;
  };

  return {
    isComplete,
    resetAutoSubmit,
  };
}
