"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as S from "@/Imports/signupImports/signupImports";
import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

/* اعتبارسنجی فرم */
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
  onSuccess?: () => void; // callback در صورت موفقیت (اختیاری)
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
      const isEmail = identifier.includes("@");
      let response;

      if (isEmail) {
        response = await supabase.auth.signInWithOtp({
          email: identifier.toLowerCase(),
          options: { shouldCreateUser: true },
        });
      } else {
        response = await supabase.auth.signInWithOtp({
          phone: identifier,
          options: { shouldCreateUser: true },
        });
      }

      if (response.error) throw response.error;

      localStorage.setItem("otp_identifier", identifier);

      S.toast.success(
        isEmail
          ? "لینک ورود به ایمیل شما ارسال شد. لطفا ایمیل خود را چک کنید."
          : "کد ورود به شماره شما ارسال شد. لطفا پیامک خود را بررسی کنید.",
      );

      reset();
      onSuccess?.();
      setTimeout(() => router.push("/auth/verify"), 1000);
    } catch (err: any) {
      console.error(err);
      S.toast.error(err.message || "خطا در ارسال لینک/کد تایید");
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
        <p className="text-red-500 text-sm">{errors.identifier.message}</p>
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
