"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "@/Imports/signupImports/signupImports"; // zod, toast, useForm, Image
import { supabase } from "@/lib/supabaseClient";

const loginSchema = S.z.object({
  identifier: S.z
    .string()
    .min(1, "لطفا ایمیل یا شماره موبایل خود را وارد کنید")
    .refine((val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/;
      return emailRegex.test(val) || phoneRegex.test(val);
    }, "لطفا ایمیل یا شماره موبایل معتبر وارد کنید"),
});

type LoginFormData = S.z.infer<typeof loginSchema>;

export default function MagicLinkPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = S.useForm<LoginFormData>({
    resolver: S.zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const identifier = data.identifier.trim();

    try {
      const isEmail = identifier.includes("@");
      let response;

      if (isEmail) {
        // ارسال Magic Link برای ایمیل
        response = await supabase.auth.signInWithOtp({
          email: identifier.toLowerCase(),
          options: { shouldCreateUser: true },
        });
      } else {
        // ارسال OTP برای شماره موبایل
        response = await supabase.auth.signInWithOtp({
          phone: identifier,
          options: { shouldCreateUser: true },
        });
      }

      if (response.error) throw response.error;

      // ذخیره identifier در localStorage برای صفحه بعد
      localStorage.setItem("otp_identifier", identifier);

      S.toast.success(
        isEmail
          ? "لینک ورود به ایمیل شما ارسال شد. لطفا ایمیل خود را چک کنید."
          : "کد ورود به شماره شما ارسال شد. لطفا پیامک خود را بررسی کنید.",
      );

      reset();

      // هدایت به صفحه تایید بدون نمایش ایمیل در URL
      setTimeout(() => router.push("/auth/verify"), 1000);
    } catch (err: any) {
      console.error(err);
      S.toast.error(err.message || "خطا در ارسال لینک/کد تایید");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-[tahoma]">
      <div className="w-[95%] max-w-[450px] bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <S.Image
          src="/logo1.svg"
          alt="logo"
          width={100}
          height={100}
          priority
        />
        <h1 className="text-2xl font-bold mt-3 mb-2 text-[#414141]">
          ورود/ ثبت نام
        </h1>
        <p className="text-sm text-[#757575] mb-6 text-center">
          لطفا شماره موبایل یا ایمیل خود را وارد کنید
        </p>

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

        <p className="text-[10px] text-gray-500 mt-6 text-center leading-6">
          ورود شما به معنای پذیرش{" "}
          <span className="text-[#347469] border-b border-[#347469] cursor-pointer">
            شرایط و قوانین
          </span>{" "}
          و{" "}
          <span className="text-[#347469] border-b border-[#347469] cursor-pointer">
            حریم خصوصی
          </span>{" "}
          است
        </p>
      </div>

      <S.ToastContainer position="top-right" autoClose={2000} rtl />
    </div>
  );
}
