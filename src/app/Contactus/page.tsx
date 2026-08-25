"use client";

import Image from "next/image";

import * as C from "@/Imports/Contact usImports/ContactusImports";

const contactSchema = C.z.object({
  name: C.z.string().min(1, "نام الزامی است"),
  Lastname: C.z.string().min(1, "نام خانوادگی الزامی است"),
  number: C.z.string().min(1, "شماره موبایل معتبر وارد کنید"),
  email: C.z.string().email("ایمیل معتبر نمی‌باشد"),
  message: C.z.string().min(1, "پیام الزامی است"),
});

type ContactFormData = C.z.infer<typeof contactSchema>;

export default function Contact() {
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

  return (
    <section
      dir="rtl"
      className="
relative
overflow-hidden
py-16
md:py-24
bg-gradient-to-br
from-green-50
via-white
to-blue-50
"
    >
      <div
        className="
absolute
top-0
left-0
w-[500px]
h-[500px]
bg-green-200/30
blur-3xl
rounded-full
"
      />

      <div
        className="
relative
max-w-7xl
mx-auto
px-4
sm:px-6
"
      >
        <div
          className="
flex
flex-col
md:flex-row
items-center
gap-12
"
        >
          {/* FORM RIGHT */}

          <div
            className="
w-full
md:w-1/2
order-1
space-y-6
"
          >
            <div
              className="
text-center
md:text-right
"
            >
              <span
                className="
inline-flex
items-center
rounded-full
bg-green-100
px-4
py-2
text-sm
font-medium
text-green-700
"
              >
                ارتباط امن با ما
              </span>

              <h2
                className="
mt-5
text-3xl
md:text-5xl
font-black
text-gray-900
leading-tight
"
              >
                با ما در ارتباط باشید
              </h2>

              <p
                className="
mt-4
text-gray-600
leading-8
"
              >
                اگر سوال، پیشنهاد یا انتقادی دارید، تیم ما آماده پاسخگویی به
                شماست.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="
rounded-[35px]
bg-white/80
backdrop-blur-xl
border
border-white
shadow-xl
p-6
md:p-10
space-y-6
"
            >
              <div
                className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
              >
                <div>
                  <input
                    type="text"
                    placeholder="نام"
                    {...register("name")}
                    className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
text-black
outline-none
transition
focus:ring-2
focus:ring-[#1F7168]
"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="نام خانوادگی"
                    {...register("Lastname")}
                    className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
text-black
outline-none
transition
focus:ring-2
focus:ring-[#1F7168]
"
                  />

                  {errors.Lastname && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.Lastname.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="ایمیل"
                    {...register("email")}
                    className="
w-full
h-14
rounded-2xl
border
border-gray-200
px-5
text-black
outline-none
transition
focus:ring-2
focus:ring-[#1F7168]
"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="شماره موبایل"
                    {...register("number")}
                    className="
w-full
h-14
rounded-2xl
border
border-gray-200 text-right
px-5
text-black
outline-none
transition
focus:ring-2
focus:ring-[#1F7168]
"
                  />

                  {errors.number && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.number.message}
                    </p>
                  )}
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="پیام خود را بنویسید..."
                {...register("message")}
                className="
w-full
rounded-2xl
border
border-gray-200
p-5
text-black
outline-none
resize-none
focus:ring-2
focus:ring-[#1F7168]
"
              />

              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
w-full
rounded-2xl
bg-[#1F7168]
py-4
text-white
font-bold
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
disabled:opacity-50
"
              >
                {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
              </button>
            </form>
          </div>

          {/* IMAGE LEFT */}

          <div
            className="
hidden
md:block
w-full
md:w-1/2
order-2
relative
"
          >
            <div
              className="
absolute
inset-5
bg-green-300/30
blur-3xl
rounded-full
"
            />

            <div
              className="
relative
overflow-hidden
rounded-[45px]
border
border-white
shadow-2xl
"
            >
              <Image
                src="/card1.png"
                alt="ارتباط با ما"
                width={700}
                height={700}
                className="
w-full
object-cover
"
              />
            </div>

            <div
              className="
absolute
bottom-6
right-6
bg-white/90
backdrop-blur-xl
rounded-2xl
px-5
py-4
shadow-xl
"
            >
              <p
                className="
font-bold
text-gray-900
"
              >
                پشتیبانی مطمئن
              </p>

              <p
                className="
text-sm
text-gray-500
"
              >
                همراه شما در مسیر سلامت
              </p>
            </div>
          </div>
        </div>
      </div>

      <C.Socialnetwork />

      <C.ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
