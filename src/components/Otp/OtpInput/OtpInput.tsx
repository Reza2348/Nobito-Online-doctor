"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

const OTP_LENGTH = 8;

export interface OtpInputProps {
  otp: string[];
  setOtp: O.Dispatch<O.SetStateAction<string[]>>; // از react type مستقیم استفاده شد
  inputRefs: O.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
}

export const OtpInput: O.FC<OtpInputProps> = ({
  otp,
  setOtp,
  inputRefs,
  isSubmitting,
}) => {
  // تغییر مقدار هر باکس
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // فقط اعداد
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  // مدیریت کلیدها (Backspace و Arrow)
  const handleKeyDown = (
    index: number,
    e: O.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // پشتیبانی Paste کامل OTP
  const handlePaste = (e: O.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData
      .split("")
      .concat(Array(OTP_LENGTH).fill(""))
      .slice(0, OTP_LENGTH);
    setOtp(newOtp);

    const lastIndex = pasteData.length - 1;
    if (lastIndex >= 0) inputRefs.current[lastIndex]?.focus();

    e.preventDefault();
  };

  return (
    <div className="flex gap-2 mb-6 justify-center" dir="ltr">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el; // فقط assign، بدون return
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#347469] text-black transition-colors disabled:bg-gray-200"
          disabled={isSubmitting}
        />
      ))}
    </div>
  );
};
