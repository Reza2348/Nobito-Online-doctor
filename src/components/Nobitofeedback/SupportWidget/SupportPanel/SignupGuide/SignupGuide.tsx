"use client";

import { useState } from "react";
import { FiCheck, FiMail, FiShield, FiUser } from "react-icons/fi";

const steps = [
  {
    title: "ایمیل خود را وارد کنید",
    description:
      "در صفحه ورود یا ثبت نام، ایمیل خود را وارد کنید و روی ادامه بزنید.",
    icon: FiMail,
  },
  {
    title: "کد تأیید را دریافت کنید",
    description: "یک کد یکبار مصرف (OTP) به ایمیل شما ارسال می‌شود.",
    icon: FiShield,
  },
  {
    title: "کد را وارد کنید",
    description: "کدی که به ایمیل شما ارسال شده را در قسمت مربوطه وارد کنید.",
    icon: FiCheck,
  },
  {
    title: "وارد نوبیتو شوید",
    description:
      "پس از تأیید کد، حساب شما فعال شده و وارد سایت نوبیتو می‌شوید.",
    icon: FiUser,
  },
];

type Props = {
  onClose: () => void;
};

export default function SignupGuide({ onClose }: Props) {
  const [step, setStep] = useState(0);

  const current = steps[step];
  const Icon = current.icon;

  const next = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const previous = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="text-center mb-5">
        <div
          className="
          w-14 h-14 mx-auto rounded-2xl
          bg-[#1F7168]/10 text-[#1F7168]
          flex items-center justify-center mb-3
        "
        >
          <Icon size={26} />
        </div>

        <h3 className="text-lg font-bold text-gray-800">آموزش ثبت نام</h3>

        <p className="text-xs text-gray-400 mt-2">مراحل ثبت نام در نوبیتو</p>
      </div>

      <div className="flex items-center gap-1.5 mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`
              h-1.5 flex-1 rounded-full
              ${index <= step ? "bg-[#1F7168]" : "bg-gray-200"}
            `}
          />
        ))}
      </div>

      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
        <div className="flex justify-center mb-5">
          <div
            className="
            w-24 h-24 rounded-3xl
            bg-[#1F7168]/10 text-[#1F7168]
            flex items-center justify-center
          "
          >
            <Icon size={42} />
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-[#1F7168] font-semibold mb-2">
            مرحله {step + 1} از {steps.length}
          </div>

          <h4 className="text-base font-bold text-gray-800">{current.title}</h4>

          <p className="text-sm text-gray-500 leading-7 mt-3">
            {current.description}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {steps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setStep(index)}
            className={`
              w-8 h-8 rounded-full
              text-xs font-semibold
              ${
                index === step
                  ? "bg-[#1F7168] text-white"
                  : index < step
                    ? "bg-[#1F7168]/10 text-[#1F7168]"
                    : "bg-gray-100 text-gray-400"
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6">
        <button
          type="button"
          disabled={step === 0}
          onClick={previous}
          className="
            flex-1 h-11 rounded-xl
            border border-gray-200
            text-gray-600
            disabled:opacity-40
          "
        >
          مرحله قبل
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="
              flex-1 h-11 rounded-xl
              bg-[#1F7168] text-white
            "
          >
            مرحله بعد
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 h-11 rounded-xl
              bg-[#1F7168] text-white
            "
          >
            متوجه شدم ✓
          </button>
        )}
      </div>
    </div>
  );
}
