"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

const OTP_LENGTH = 8;

export interface OtpInputProps {
  otp: string[];
  setOtp: O.Dispatch<O.SetStateAction<string[]>>;
  inputRefs: O.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
}

export const OtpInput: O.FC<OtpInputProps> = ({
  otp,
  setOtp,
  inputRefs,
  isSubmitting,
}) => {
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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

    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }

    e.preventDefault();
  };

  return (
    <>
      {/* موبایل */}
      <div className="mb-6 w-full sm:hidden">
        <input
          type="text"
          inputMode="numeric"
          maxLength={OTP_LENGTH}
          value={otp.join("")}
          onChange={(e) => {
            const value = e.target.value
              .replace(/\D/g, "")
              .slice(0, OTP_LENGTH);

            const newOtp = value
              .split("")
              .concat(Array(OTP_LENGTH).fill(""))
              .slice(0, OTP_LENGTH);

            setOtp(newOtp);
          }}
          disabled={isSubmitting}
          placeholder="کد ۸ رقمی را اینجا وارد کنید"
          className="
            h-14 w-full rounded-xl border-2 border-gray-300
            text-center text-xl font-bold text-black
            transition-colors
            placeholder:text-sm placeholder:font-normal
            placeholder:text-gray-400
            focus:border-brand focus:outline-none
            disabled:bg-gray-200
          "
        />
      </div>

      {/* دسکتاپ */}
      <div className="mb-6 hidden justify-center gap-2 sm:flex" dir="ltr">
        {otp.map((digit, index) => (
          <input
            key={`otp-digit-${index}`}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isSubmitting}
            aria-label={`رقم ${index + 1} کد تایید`}
            className="
              h-12 w-12 rounded-xl border-2 border-gray-300
              text-center text-xl font-bold text-black
              transition-colors 
              focus:border-brand focus:outline-none
              disabled:bg-gray-200
            "
          />
        ))}
      </div>
    </>
  );
};
