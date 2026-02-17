"use client";

import * as C from "@/Imports/Contact usImports/ContactusImports";

export default function Contact() {
  const [mounted, setMounted] = C.useState(false);

  C.useEffect(() => {
    setMounted(true);
  }, []);

  const contactSchema = C.z.object({
    name: C.z.string().min(1, "نام الزامی است"),
    email: C.z.string().email("ایمیل معتبر نمی‌باشد"),
    message: C.z.string().min(1, "پیام الزامی است"),
  });

  type ContactFormData = C.z.infer<typeof contactSchema>;

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
          access_key: "a526f686-a039-477b-9c1a-71f470a7ba94",
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        C.toast.success("پیام شما با موفقیت ارسال شد!");
        reset();
      } else {
        C.toast.error("ارسال پیام موفقیت‌آمیز نبود.");
      }
    } catch (error) {
      C.toast.error("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center py-10 px-4" dir="rtl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-6 border"
      >
        <h2 className="text-2xl font-semibold  text-black text-center">
          تماس با ما
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700 ">نام</label>
          <input
            type="text"
            {...register("name")}
            className="border border-gray-300 text-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="نام خود را وارد کنید"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">ایمیل</label>
          <input
            type="email"
            {...register("email")}
            className="border border-gray-300 text-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ایمیل خود را وارد کنید"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">پیام</label>
          <textarea
            rows={3}
            {...register("message")}
            className="border border-gray-300 text-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="پیام خود را بنویسید..."
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال"}
        </button>
      </form>

      <C.ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
