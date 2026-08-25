"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import * as S from "@/Imports/signupImports/signupImports";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineArrowLeft,
} from "react-icons/hi";

import { CgSpinner } from "react-icons/cg";

// -----------------------------------------
// Regex
// -----------------------------------------

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// موبایل ایران:
// با یا بدون 0 / 98 / +98
// شروع با 9
// مجموعاً 10 رقم بعد از کد
const irPhoneRegex = /^(?:0|98|\+98)?9\d{9}$/;

// -----------------------------------------
// Validation Schema
// -----------------------------------------

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "لطفا ایمیل یا شماره موبایل خود را وارد کنید")
    .refine(
      (value) =>
        emailRegex.test(value) || irPhoneRegex.test(value.replace(/\s/g, "")),
      "لطفا ایمیل یا شماره موبایل معتبر وارد کنید",
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

// -----------------------------------------
// Props
// -----------------------------------------

interface LoginFormProps {
  onSuccess?: () => void;
}

// -----------------------------------------
// Component
// -----------------------------------------

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const [liveValue, setLiveValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // -----------------------------------------
  // تشخیص نوع ورودی
  // -----------------------------------------

  const inputKind = useMemo<"email" | "phone" | "neutral">(() => {
    const value = liveValue.trim();

    if (!value) {
      return "neutral";
    }

    if (emailRegex.test(value)) {
      return "email";
    }

    if (/^[0-9+]+$/.test(value)) {
      return "phone";
    }

    return "neutral";
  }, [liveValue]);

  // -----------------------------------------
  // Validation states
  // -----------------------------------------

  const hasError = !!errors.identifier;

  const isValidTouched =
    !!touchedFields.identifier && !hasError && liveValue.length > 0;

  // -----------------------------------------
  // React Hook Form field
  // -----------------------------------------

  const { onChange: rhfOnChange, ...identifierField } = register("identifier");

  // -----------------------------------------
  // Submit
  // -----------------------------------------

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const identifier = data.identifier.trim();

    try {
      // شناسه به سرور ارسال می‌شود
      //
      // سرور باید آن را در HttpOnly Cookie نگه دارد.
      //
      // بنابراین:
      // - در localStorage ذخیره نمی‌شود
      // - در URL قرار نمی‌گیرد
      // - قابل خواندن توسط JavaScript مرورگر نیست

      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "خطا در ارسال لینک یا کد تایید");
      }

      // -----------------------------------------
      // Success Toast
      // -----------------------------------------

      S.toast.success(
        result.channel === "email"
          ? "لینک ورود به ایمیل شما ارسال شد. لطفا ایمیل خود را بررسی کنید."
          : "کد ورود به شماره موبایل شما ارسال شد. لطفا پیامک خود را بررسی کنید.",
      );

      // -----------------------------------------
      // Reset Form
      // -----------------------------------------

      reset();
      setLiveValue("");

      onSuccess?.();

      // -----------------------------------------
      // Redirect
      // -----------------------------------------

      setTimeout(() => {
        router.push("/auth/verify");
      }, 1000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "خطا در ارسال لینک یا کد تایید";

      S.toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------------------
  // Render
  // -----------------------------------------

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full flex-col gap-3"
    >
      {/* Input */}
      <div className="relative">
        {/* آیکون سمت راست */}
        <span
          className={`
            pointer-events-none
            absolute inset-y-0 right-4
            flex items-center
            transition-colors duration-200

            ${
              hasError
                ? "text-red-400"
                : isFocused || isValidTouched
                  ? "text-brand"
                  : "text-gray-400"
            }
          `}
        >
          {inputKind === "email" ? (
            <HiOutlineMail size={20} />
          ) : (
            <HiOutlinePhone size={20} />
          )}
        </span>

        <input
          type="text"
          inputMode="email"
          autoComplete="username"
          placeholder="ایمیل یا شماره موبایل"
          disabled={isSubmitting}
          dir="ltr"
          aria-invalid={hasError}
          aria-describedby={hasError ? "identifier-error" : undefined}
          {...identifierField}
          onChange={(event) => {
            setLiveValue(event.target.value);
            rhfOnChange(event);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            identifierField.onBlur(event);
          }}
          className={`
            peer w-full
            rounded-xl
            border
            bg-white
            py-4
            pr-12
            pl-4
            text-right
            text-black
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-200

            disabled:cursor-not-allowed
            disabled:opacity-60

            ${
              hasError
                ? `
                  border-red-400
                  focus:ring-2
                  focus:ring-red-200
                `
                : isValidTouched
                  ? `
                    border-brand/60
                    focus:ring-2
                    focus:ring-brand/25
                  `
                  : `
                    border-gray-300
                    focus:border-brand
                    focus:ring-2
                    focus:ring-brand/25
                  `
            }
          `}
        />
      </div>

      {/* Error */}
      {hasError && (
        <p
          id="identifier-error"
          role="alert"
          className="
            flex items-center
            gap-1
            text-sm
            text-red-500
            animate-in
            fade-in
            slide-in-from-top-1
            duration-200
          "
        >
          {errors.identifier?.message}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          group relative
          w-full
          overflow-hidden
           bg-[#1F7168]
          rounded-xl
          py-4
          font-bold
          text-white
          transition-all
          duration-200
          active:scale-[0.98]

          ${
            isSubmitting
              ? `
                cursor-not-allowed
                bg-gray-400
              `
              : `
                bg-brand
                hover:bg-brand-dark
                hover:shadow-lg
                hover:shadow-brand/25
              `
          }
        `}
      >
        <span
          className="
            flex items-center
            justify-center
            gap-2
          "
        >
          {isSubmitting ? (
            <>
              <CgSpinner size={20} className="animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              ارسال لینک/کد تایید
              <HiOutlineArrowLeft
                size={19}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-1
                "
              />
            </>
          )}
        </span>
      </button>
    </form>
  );
}
