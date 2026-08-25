import type { Metadata } from "next";

import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi";

export const metadata: Metadata = {
  title: "درباره ما | Nobito",
  description:
    "با Nobito آشنا شوید؛ پلتفرمی برای دسترسی آسان‌تر به خدمات درمانی، نوبت‌دهی پزشکی و ارتباط با پزشکان و مراکز درمانی.",
  keywords: [
    "Nobito",
    "درباره Nobito",
    "خدمات درمانی",
    "نوبت دهی پزشکی",
    "پزشک",
    "کلینیک",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const features = [
  {
    icon: HiOutlineShieldCheck,
    title: "امنیت اطلاعات",
    desc: "اطلاعات پزشکی شما با استانداردهای مدرن امنیتی محافظت و مدیریت می‌شود.",
  },
  {
    icon: HiOutlineClock,
    title: "دسترسی سریع",
    desc: "در هر زمان به نوبت‌ها، پرونده‌ها و خدمات درمانی خود دسترسی دارید.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "ارتباط آسان",
    desc: "ارتباط سریع، شفاف و مطمئن با پزشکان و مراکز درمانی.",
  },
];

export default function About() {
  return (
    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        py-16
        sm:py-20
        md:py-28
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-150
          h-150
          bg-green-100/40
          blur-3xl
          rounded-full
          -z-10
        "
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-green-50
              px-4
              py-2
              text-sm
              font-medium
              text-green-700
            "
          >
            سلامت دیجیتال نسل جدید
          </span>

          <h1
            className="
              mt-5
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-gray-950
            "
          >
            درباره پلتفرم درمانی ما
          </h1>

          <p
            className="
              mt-6
              text-base
              sm:text-lg
              md:text-xl
              leading-loose
              text-gray-600
            "
          >
            ما یک تجربه هوشمند و امن برای مدیریت خدمات درمانی، نوبت‌دهی پزشکی و
            ارتباط مستقیم با پزشکان ایجاد کرده‌ایم.
          </p>

          <p
            className="
              mt-4
              text-base
              sm:text-lg
              leading-loose
              text-gray-600
            "
          >
            هدف ما ساده‌تر کردن مسیر درمان و ایجاد اعتماد میان بیمار، پزشک و
            مراکز درمانی است.
          </p>
        </div>

        {/* Features */}
        <div
          className="
            mt-14
            md:mt-20
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="
                  group
                  relative
                  rounded-3xl
                  border
                  border-gray-100
                  bg-white/80
                  backdrop-blur-xl
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
            >
              <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-50
                    transition
                    group-hover:bg-green-600
                  "
              >
                <Icon
                  className="
                      text-3xl
                      text-green-600
                      transition
                      group-hover:text-white
                    "
                  aria-hidden="true"
                />
              </div>

              <h2
                className="
                    mt-6
                    text-xl
                    font-bold
                    text-gray-950
                  "
              >
                {title}
              </h2>

              <p
                className="
                    mt-3
                    text-sm
                    leading-8
                    text-gray-600
                  "
              >
                {desc}
              </p>
            </article>
          ))}
        </div>

        {/* Trust Banner */}
        <div
          className="
            mt-12
            rounded-3xl
            bg-gray-950
            px-6
            py-8
            text-center
            text-white
            shadow-xl
          "
        >
          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
            "
          >
            همراه مطمئن شما در مسیر سلامت
          </h2>

          <p
            className="
              mt-3
              text-sm
              sm:text-base
              text-gray-300
            "
          >
            فناوری، امنیت و تجربه کاربری برای ساخت آینده درمان دیجیتال.
          </p>
        </div>
      </div>
    </section>
  );
}
