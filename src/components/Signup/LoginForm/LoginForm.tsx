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
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  /**
   * React Hook Form
   *
   * فقط onBlur را از register می‌گیریم.
   * مقدار input توسط setValue مدیریت می‌شود.
   */
  const { onBlur } = register("identifier");

  /**
   * تشخیص نوع identifier
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
   * Validation error
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
   * Submit
   */
  const handleSubmitForm = async (data: LoginFormData) => {
    setIsSubmitting(true);

    try {
      const identifier = data.identifier.trim();

      const result = await sendLoginOtp(identifier);

      S.toast.success(
        result.channel === "email"
          ? "لینک ورود به ایمیل شما ارسال شد. لطفا ایمیل خود را بررسی کنید."
          : "کد ورود به شماره موبایل شما ارسال شد. لطفا پیامک خود را بررسی کنید.",
      );

      reset();
      setLiveValue("");

      onSuccess?.();

      setTimeout(() => {
        router.push("/auth/verify");
      }, 1000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "خطا در ارسال لینک یا کد تایید";

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
