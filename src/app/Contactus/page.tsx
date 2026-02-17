"use client";

import * as C from "@/Imports/Contact usImports/ContactusImports";

export default function Contact() {
  const [mounted, setMounted] = C.useState(false);

  C.useEffect(() => {
    setMounted(true);
  }, []);

  const contactSchema = C.z.object({
    name: C.z.string().min(1, "نام الزامی است"),
    Lastname: C.z.string().min(1, "نام خانوادگی الزامی است"),
    number: C.z.string().min(1, "شماره موبایل معتبر وارد کنید"),
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
          access_key: "YOUR_ACCESS_KEY",
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
    } catch {
      C.toast.error("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="py-12 px-4 bg-gray-50">
      {/* تغییر flex-row-reverse به flex-row برای جابجایی فرم و عکس */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* عکس در دسکتاپ (سمت راست) */}

        {/* فرم و تیتر */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-3 text-center md:text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              اگر انتقاد یا پیشنهادی دارید می‌توانید با ما در میان بگذارید
            </h2>
            <p className="text-gray-500 text-sm">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان لازم است،
            </p>
          </div>

          {/* عکس در موبایل (بعد از فرم) */}
          <div className="md:hidden">
            <img
              src="/card1.png"
              alt="contact"
              className="w-full rounded-lg mt-4"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 md:p-8 space-y-4 md:space-y-6 md:bg-white md:shadow-xl md:rounded-xl md:border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="font-medium text-gray-700">نام</label>
                <input
                  type="text"
                  {...register("name")}
                  className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام خود را وارد کنید"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-medium text-gray-700">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  {...register("Lastname")}
                  className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
                {errors.Lastname && (
                  <span className="text-red-500 text-sm">
                    {errors.Lastname.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <label className="font-medium text-gray-700">ایمیل</label>
                <input
                  type="email"
                  {...register("email")}
                  className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ایمیل خود را وارد کنید"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-medium text-gray-700">
                  شماره موبایل
                </label>
                <input
                  type="text"
                  {...register("number")}
                  className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="شماره موبایل خود را وارد کنید"
                />
                {errors.number && (
                  <span className="text-red-500 text-sm">
                    {errors.number.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-gray-700">پیام</label>
              <textarea
                rows={4}
                {...register("message")}
                className="border border-gray-300 text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="پیام خود را بنویسید..."
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-between mt-4 gap-2">
              <p className="text-gray-700 text-sm">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
              </p>
              <button
                type="button"
                className="bg-[#1F7168] text-white text-sm md:text-base px-3 md:px-6 py-1 md:py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
              >
                ارسال پیغام
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block w-1/2">
          <img src="/card1.png" alt="contact" className="w-full rounded-2xl" />
        </div>
      </div>

      <div className="flex flex-col items-center text-2xl justify-center h-screen space-y-4">
        <p className="text-center text-black">
          ما را در شبکه‌ها اجتماعی دنبال کنید...
        </p>
        <div className="flex space-x-60 mt-[63px]">
          <C.PiInstagramLogoLight className="text-[#1F7168] text-3xl" />
          <C.FiPhoneCall className="text-[#1F7168] text-3xl" />
          <C.TbSend className="text-[#1F7168] text-3xl" />
          <C.PiYoutubeLogo className="text-[#1F7168] text-3xl" />
        </div>
      </div>

      <div className="flex flex-col items-center text-2xl justify-center h-screen space-y-4">
        <div className="flex space-x-5">
          <div className="flex flex-col items-center justify-center border  border-[#000000] rounded-lg p-4 space-y-2">
            <C.IoLocationOutline className="text-[#1F7168] text-3xl" />
            <p className="text-center text-black"> نشانی : تهران _ میدان</p>
            <p className="text-center text-black ">
              آرژانتین _ خیابان لاله _ کوچه صاد _ پلاک 18
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border  border-[#000000] rounded-lg p-4 space-y-2">
            <C.MdOutlineMailOutline className="text-[#1F7168] text-3xl" />
            <p className="text-center text-black">
              نشانی پست الکترونیک : smartix@yahoo.com
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border  border-[#000000] rounded-lg p-4 space-y-2">
            <C.FiPhoneCall className="text-[#1F7168] text-3xl" />
            <p className="text-center text-black">تماس با پشتیبانی :</p>
            <p className="text-center text-black ">
              ۱۲۳۴۵۶۷۸-۰۲۱ | ۱۲۳۴۵۶۷۸-۰۲۱
            </p>
          </div>
        </div>
      </div>

      <C.ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
