import React from "react";
import { IconType } from "react-icons";
import * as C from "@/Imports/Contact usImports/ContactusImports";

interface SocialLink {
  Icon: IconType;
  label: string;
  href: string;
}

interface ContactCard {
  Icon: IconType;
  title: string;
  lines: string[];
}

const socialLinks: SocialLink[] = [
  { Icon: C.PiInstagramLogoLight, label: "اینستاگرام", href: "#" },
  { Icon: C.FiPhoneCall, label: "تماس", href: "#" },
  { Icon: C.TbSend, label: "تلگرام", href: "#" },
  { Icon: C.PiYoutubeLogo, label: "یوتیوب", href: "#" },
];

const contactCards: ContactCard[] = [
  {
    Icon: C.FiPhoneCall,
    title: "تماس با پشتیبانی",
    lines: ["۰۲۱-۱۲۳۴۵۶۷۸", "۰۲۱-۱۲۳۴۵۶۷۸"],
  },
  {
    Icon: C.MdOutlineMailOutline,
    title: "ایمیل ما",
    lines: ["smartix@yahoo.com"],
  },
  {
    Icon: C.IoLocationOutline,
    title: "آدرس دفتر مرکزی",
    lines: ["تهران - میدان آرژانتین", "خیابان لاله - کوچه صاد - پلاک ۱۸"],
  },
];

const Page: React.FC = () => {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-linear-to-b from-[#F7FBFA] via-white to-[#F3F7F6] py-24 px-5"
    >
      {/* Background Blur */}
      <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-[#1F7168]/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center rounded-full bg-[#1F7168]/10 px-5 py-2 text-sm font-semibold text-[#1F7168]">
            ارتباط با ما
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            همیشه در کنار شما هستیم
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-gray-500 leading-8 text-base">
            از طریق شبکه‌های اجتماعی، تماس تلفنی یا ایمیل با ما در ارتباط باشید.
            تیم پشتیبانی اسمارتیکس در سریع‌ترین زمان پاسخگوی شما خواهد بود.
          </p>
        </div>

        {/* Social */}
        <div className="flex justify-center flex-wrap gap-6 mb-20">
          {socialLinks.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#1F7168] to-emerald-500 blur-xl opacity-0 transition-all duration-500 group-hover:opacity-30" />

              <div
                className="
                relative
                w-20 h-20
                rounded-3xl
                bg-white/90
                backdrop-blur-xl
                border border-white
                shadow-lg
                flex
                items-center
                justify-center
                transition-all
                duration-500
                group-hover:-translate-y-3
                group-hover:scale-110
               group-hover:bg-linear-to-br
                group-hover:from-[#1F7168]
                group-hover:to-emerald-500
                group-hover:shadow-[0_15px_40px_rgba(31,113,104,.35)]
              "
              >
                <Icon className="text-3xl text-[#1F7168] transition-all duration-300 group-hover:text-white" />
              </div>

              <span className="absolute left-1/2 -translate-x-1/2 mt-3 text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map(({ Icon, title, lines }) => (
            <div
              key={title}
              className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              bg-white/80
              backdrop-blur-xl
              border
              border-white
              p-8
              transition-all
              duration-500
              hover:-translate-y-4
              hover:shadow-[0_25px_60px_rgba(31,113,104,.18)]
            "
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-[#1F7168]/5 via-transparent to-emerald-400/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  className="
                  w-20
                  h-20
                  rounded-3xl
                 bg-linear-to-br
                  from-[#1F7168]
                  to-emerald-500
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:rotate-6
                "
                >
                  <Icon className="text-4xl text-white" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-800">
                  {title}
                </h3>

                <div className="mt-5 space-y-2">
                  {lines.map((line, index) => (
                    <p key={index} className="text-gray-500 leading-8 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#1F7168] to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
