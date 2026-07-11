"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as S from "@/Imports/signupImports/signupImports";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "لطفا ایمیل یا شماره موبایل خود را وارد کنید")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, "لطفا ایمیل یا شماره موبایل معتبر وارد کنید"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const identifier = data.identifier.trim();

    try {
      // The identifier is sent to the server and stored there in an
      // HttpOnly cookie. It's never written to localStorage and never
      // put in the URL, so it can't be read or tampered with from the
      // browser.
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "خطا در ارسال لینک یا کد تایید");
      }

      S.toast.success(
        result.channel === "email"
          ? "لینک ورود به ایمیل شما ارسال شد. لطفا ایمیل خود را بررسی کنید."
          : "کد ورود به شماره موبایل شما ارسال شد. لطفا پیامک خود را بررسی کنید.",
      );

      reset();
      onSuccess?.();

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <input
        type="text"
        {...register("identifier")}
        placeholder="ایمیل یا شماره موبایل"
        disabled={isSubmitting}
        dir="ltr"
        className="w-full px-4 py-4 rounded-xl text-right border border-gray-300 bg-white focus:outline-none text-black focus:ring-2 focus:ring-[#347469]"
      />

      {errors.identifier && (
        <p className="text-sm text-red-500">{errors.identifier.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#347469] hover:bg-[#2a5d54]"
        }`}
      >
        {isSubmitting ? "در حال ارسال..." : "ارسال لینک/کد تایید"}
      </button>
    </form>
  );
}
