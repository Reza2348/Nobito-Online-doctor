import crypto from "crypto";

import { OTP_LENGTH } from "@/lib/otp";

export function generateOtp(length: number = OTP_LENGTH): string {
  if (!Number.isInteger(length) || length < 6 || length > 8) {
    throw new Error("OTP length must be between 6 and 8 digits");
  }

  const number = crypto.randomInt(0, 10 ** length);

  return number.toString().padStart(length, "0");
}
