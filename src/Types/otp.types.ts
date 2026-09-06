import type { MutableRefObject } from "react";

// =========================================================
// OTP
// =========================================================

export interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
}
