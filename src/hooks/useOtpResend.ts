"use client";

import { useCallback, useEffect, useState } from "react";

interface UseOtpResendOptions {
  otpLength?: number;
  cooldownSeconds?: number;
  isSubmitting?: boolean;
  onResend?: () => void | Promise<void>;
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

interface UseOtpResendReturn {
  cooldown: number;
  isResending: boolean;
  handleResend: () => Promise<void>;
}

const DEFAULT_OTP_LENGTH = 8;
const DEFAULT_COOLDOWN = 60;

export function useOtpResend({
  otpLength = DEFAULT_OTP_LENGTH,
  cooldownSeconds = DEFAULT_COOLDOWN,
  isSubmitting = false,
  onResend,
  setOtp,
  inputRefs,
}: UseOtpResendOptions): UseOtpResendReturn {
  const [cooldown, setCooldown] = useState(cooldownSeconds);

  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldown]);

  const clearOtp = useCallback(() => {
    setOtp(Array(otpLength).fill(""));
  }, [otpLength, setOtp]);

  const focusFirstInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRefs.current[0]?.focus();
    });
  }, [inputRefs]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || isResending || isSubmitting) {
      return;
    }

    setIsResending(true);

    try {
      await onResend?.();

      clearOtp();

      setCooldown(cooldownSeconds);

      focusFirstInput();
    } catch (error) {
      console.error("OTP resend failed:", error);
    } finally {
      setIsResending(false);
    }
  }, [
    cooldown,
    isResending,
    isSubmitting,
    onResend,
    clearOtp,
    cooldownSeconds,
    focusFirstInput,
  ]);

  return {
    cooldown,
    isResending,
    handleResend,
  };
}
