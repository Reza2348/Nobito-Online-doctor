"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as S from "@/Imports/signupImports/signupImports";

import {
  emailRegex,
  loginSchema,
} from "@/components/Signup/LoginForm/login/login.schema";

import type { LoginFormData } from "@/components/Signup/LoginForm/login/login.schema";

import { sendLoginOtp } from "@/lib/login.api";

import { LoginIdentifierField } from "@/components/Signup/LoginForm/LoginIdentifierField/LoginIdentifierField";

import { LoginSubmitButton } from "@/components/Signup/LoginForm/LoginSubmitButton/LoginSubmitButton";

import type { LoginFormProps, IdentifierKind } from "@/Types/types";

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveValue, setLiveValue] = useState("");

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const { onBlur } = register("identifier");

  /**
   * تشخیص نوع ورودی
   */
  const inputKind = useMemo<IdentifierKind>(() => {
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

  /**
   * خطای validation
   */
  const error = errors.identifier?.message;

  /**
   * تغییر مقدار input
   */
  const handleIdentifierChange = (value: string) => {
    setLiveValue(value);

    setValue("identifier", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /**
   * ارسال OTP
   */
  const handleSubmitForm = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const identifier = data.identifier.trim();

      // Backend فعلاً فقط Email OTP دارد
      if (!emailRegex.test(identifier)) {
        S.toast.error("در حال حاضر ورود با OTP فقط از طریق ایمیل فعال است.");
        return;
      }

      const email = identifier.toLowerCase();

      // ذخیره ایمیل برای مرحله Verify OTP
      sessionStorage.setItem("norbin_otp_email", email);

      // ارسال درخواست به Backend
      const result = await sendLoginOtp(email);

      S.toast.success(result.message || "کد ورود به ایمیل شما ارسال شد.");

      reset();
      setLiveValue("");

      onSuccess?.();

      setTimeout(() => {
        router.push("/auth/verify");
      }, 1000);
    } catch (error) {
      // اگر ارسال OTP شکست خورد، ایمیل ذخیره‌شده را پاک می‌کنیم
      sessionStorage.removeItem("norbin_otp_email");

      const message =
        error instanceof Error ? error.message : "خطا در ارسال کد تأیید";

      console.error("Send OTP error:", error);

      S.toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      noValidate
      className="flex w-full flex-col gap-3"
    >
      <LoginIdentifierField
        value={liveValue}
        error={error}
        disabled={isSubmitting}
        kind={inputKind}
        onChange={handleIdentifierChange}
        onBlur={onBlur}
      />

      <LoginSubmitButton loading={isSubmitting} />
    </form>
  );
}
