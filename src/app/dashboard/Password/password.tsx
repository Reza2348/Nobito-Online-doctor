"use client";

import React from "react";
import * as P from "@/Imports/publicprofileImports/publicprofileImports";

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default function Password() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = P.useForm<PasswordFormData>();

  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const confirmPassword = watch("confirmPassword");

  // محاسبه قدرت رمز
  const checkStrength = (value: string) => {
    let score = 0;

    if (value.length >= 8) score++;

    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
      score++;
    }

    if (/[0-9]/.test(value)) {
      score++;
    }

    if (/[!@#$%^&*]/.test(value)) {
      score++;
    }

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

  const onSubmit = async (data: PasswordFormData) => {
    setMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/dashboard/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "تغییر رمز عبور انجام نشد.",
        );
      }

      setMessage(result.message || "رمز عبور با موفقیت تغییر کرد.");

      setPassword("");
      setStrength(0);
      reset({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "خطایی هنگام تغییر رمز عبور رخ داد.",
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen px-4 md:px-12 py-6 md:py-12 font-[tahoma]"
      dir="rtl"
    >
      <div className="w-full bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
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

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm text-[#919191] font-bold text-right"
            >
              رمز عبور جدید
              <span className="text-red-400 mr-1">*</span>
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "رمز عبور الزامی است",

                minLength: {
                  value: 8,
                  message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
                },

                validate: {
                  lowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "رمز عبور باید شامل حروف کوچک انگلیسی باشد.",

                  uppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "رمز عبور باید شامل حروف بزرگ انگلیسی باشد.",

                  number: (value) =>
                    /[0-9]/.test(value) || "رمز عبور باید شامل عدد باشد.",

                  special: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    "رمز عبور باید شامل علامت ویژه باشد.",
                },
              })}
              onChange={(e) => {
                const value = e.target.value;

                setPassword(value);
                checkStrength(value);
              }}
              className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Password strength */}
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

            {password.length > 0 && (
              <p className={`text-sm font-bold ${getStrengthColor()}`}>
                قدرت رمز: {getStrengthText()}
              </p>
            )}
          </div>

          {/* Password rules */}
          <div className="space-y-1 text-[#919191] text-sm">
            <p>• حداقل 8 کاراکتر</p>
            <p>• شامل حروف بزرگ و کوچک</p>
            <p>• شامل عدد</p>
            <p>• شامل علامت (!@#$%^&*)</p>
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-[#919191] font-bold text-right"
            >
              تکرار رمز عبور
              <span className="text-red-400 mr-1">*</span>
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "تکرار رمز عبور الزامی است",

                validate: (value) =>
                  value === password || "رمزهای عبور یکسان نیستند.",
              })}
              className="w-full text-black bg-[#F2F2F2] border-2 border-transparent focus:border-[#347469] focus:bg-white rounded-xl py-3 px-4 outline-none transition-all"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Success message */}
          {message && (
            <div
              role="alert"
              className="rounded-xl bg-green-50 border border-green-200 text-green-700 p-4 text-sm"
            >
              {message}
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm"
            >
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#347469] hover:bg-[#2a5d54] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold w-full md:w-40 py-2 rounded-md shadow-md transition-all active:scale-95"
            >
              {isSubmitting ? "در حال تغییر..." : "تغییر رمز عبور"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
