"use client";

import * as C from "@/Imports/Contact usImports/ContactusImports";

import ContactField from "@/components/Contact/ContactField/ContactField";
import type { ContactFormData } from "@/Types/types";

const contactSchema = C.z.object({
  name: C.z.string().min(1, "نام الزامی است"),

  Lastname: C.z.string().min(1, "نام خانوادگی الزامی است"),

  number: C.z.string().min(1, "شماره موبایل معتبر وارد کنید"),

  email: C.z.string().email("ایمیل معتبر نمی‌باشد"),

  message: C.z.string().min(1, "پیام الزامی است"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = C.useForm<ContactFormData>({
    resolver: C.zodResolver(contactSchema),
  });

  const onSubmit: C.SubmitHandler<ContactFormData> = async (data) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,

          ...data,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        C.toast.error("ارسال پیام موفقیت‌آمیز نبود.");

        return;
      }

      C.toast.success("پیام شما با موفقیت ارسال شد!");

      reset();
    } catch {
      C.toast.error("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-6
        rounded-[35px]
        border
        border-white
        bg-white/80
        p-6
        shadow-xl
        backdrop-blur-xl
        md:p-10
      "
    >
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ContactField
          type="text"
          placeholder="نام"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <ContactField
          type="text"
          placeholder="نام خانوادگی"
          name="Lastname"
          register={register}
          error={errors.Lastname?.message}
        />

        <ContactField
          type="email"
          placeholder="ایمیل"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        <ContactField
          type="tel"
          placeholder="شماره موبایل"
          name="number"
          register={register}
          error={errors.number?.message}
        />
      </div>

      {/* Message */}
      <div>
        <textarea
          rows={5}
          placeholder="پیام خود را بنویسید..."
          {...register("message")}
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-gray-200
            p-5
            text-black
            outline-none
            focus:ring-2
            focus:ring-[#1F7168]
          "
        />

        {errors.message && (
          <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          rounded-2xl
          bg-[#1F7168]
          py-4
          font-bold
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
      </button>
    </form>
  );
}
