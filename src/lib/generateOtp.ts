import crypto from "crypto";

export function generateOtp(length = 8): string {
  if (length !== 8) {
    throw new Error("OTP must be exactly 8 digits");
  }

  const number = crypto.randomInt(0, 100_000_000);

  return number.toString().padStart(8, "0");
}
