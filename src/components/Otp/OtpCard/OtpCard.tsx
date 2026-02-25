"use client";

import * as O from "@/Imports/OtpImports/OtpImports";

interface OtpCardProps {
  otp: string[];
  setOtp: O.Dispatch<O.SetStateAction<string[]>>; // از react type مستقیم استفاده شد
  inputRefs: O.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const OtpCard: O.FC<OtpCardProps> = ({
  otp,
  setOtp,
  inputRefs,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <div className="w-[95%] max-w-112.5 bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        وارد کردن کد تایید ایمیل
      </h1>
      <p className="text-sm text-gray-500 mb-4 text-center">
        لطفا کد ۸ رقمی ارسال شده به ایمیل خود را وارد کنید.
      </p>

      {/* کامپوننت OtpInput */}
      <O.OtpInput
        otp={otp}
        setOtp={setOtp}
        inputRefs={inputRefs}
        isSubmitting={isSubmitting}
      />

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#347469] hover:bg-[#2a5d54]"
        }`}
      >
        {isSubmitting ? "در حال تایید..." : "تایید و ورود به داشبورد"}
      </button>
    </div>
  );
};
