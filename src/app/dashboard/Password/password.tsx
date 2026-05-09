"use client";

import React from "react";
import * as P from "@/Imports/publicprofileImports/publicprofileImports";

export default function Password() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = P.useForm();

  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState(0);

  const confirmPassword = watch("confirmPassword");

  // محاسبه قدرت رمز
  const checkStrength = (value: string) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[!@#$%^&*]/.test(value)) score++;

    setStrength(score);
  };

  const getStrengthText = () => {
    if (strength <= 1) return "ضعیف";
    if (strength <= 3) return "متوسط";
    return "قوی";
  };

  const getStrengthColor = () => {
    if (strength <= 1) return "text-red-500";
    if (strength <= 3) return "text-yellow-500";
    return "text-green-500";
  };

  const onSubmit = (data: any) => {
    console.log("Data submitted:", data);
  };

  return (
    <div
      className="w-full min-h-screen px-4 md:px-12 py-6 md:py-12 font-[tahoma]"
      dir="rtl"
    >
      <div className="w-full bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center px-6 md:px-8 py-6 border-b border-[#C0C0C0]">
          <h2 className="text-xl font-bold text-gray-700">رمز عبور</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            رمز عبور شما باید حداقل 8 کاراکتر باشد.
          </h2>

          {/* پسورد */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#919191] font-bold text-right">
              رمز عبور جدید<span className="text-red-400 mr-1">*</span>
            </label>

            <input
              type="password"
              {...register("password", {
                required: "رمز عبور الزامی است",
                minLength: {
                  value: 8,
                  message: "حداقل 8 کاراکتر",
                },
              })}
              onChange={(e) => {
                setPassword(e.target.value);
                checkStrength(e.target.value);
              }}
              className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* نوار قدرت */}
          <div className="space-y-2">
            <div className="flex gap-2 w-full">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-md transition-all ${
                    strength >= level
                      ? strength <= 1
                        ? "bg-red-500"
                        : strength <= 3
                          ? "bg-yellow-400"
                          : "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* متن قدرت */}
            {password.length > 0 && (
              <p className={`text-sm font-bold ${getStrengthColor()}`}>
                قدرت رمز: {getStrengthText()}
              </p>
            )}
          </div>

          {/* قوانین */}
          <div className="space-y-1 text-[#919191] text-sm">
            <p>• حداقل 8 کاراکتر</p>
            <p>• شامل حروف بزرگ و کوچک</p>
            <p>• شامل عدد</p>
            <p>• شامل علامت (!@#$%^&*)</p>
          </div>

          {/* تکرار رمز */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#919191] font-bold text-right">
              تکرار رمز عبور<span className="text-red-400 mr-1">*</span>
            </label>

            <input
              type="password"
              {...register("confirmPassword", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value: string) =>
                  value === password || "رمزها یکسان نیستند",
              })}
              className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          {/* دکمه */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#347469] hover:bg-[#2a5d54] text-white font-bold w-full md:w-40 py-2 rounded-md shadow-md transition-all active:scale-95"
            >
              تغییر رمز عبور
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
