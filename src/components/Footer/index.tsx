"use client";

import React from "react";
import * as F from "@/Imports/FooterImports/FooterImports";

const FOOTER_NAV: F.FooterSection[] = [
  {
    title: "نوبیتو",
    links: [
      { name: "سوالات متداول", href: "#" },
      { name: "تماس با ما", href: "#" },
      { name: "میثاق‌نامه", href: "#" },
      { name: "درباره ما", href: "/about" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { name: "خدمات پزشکی در منزل", href: "#" },
      { name: "مشاوره غیرحضوری", href: "#" },
      { name: "مراکز درمانی", href: "#" },
      { name: "نوبت‌دهی", href: "#" },
    ],
  },
  {
    title: "نیکوکاری",
    links: [
      { name: "درمانگر داوطلب", href: "#" },
      { name: "بیشتر بدانید", href: "#" },
      { name: "کمک مالی", href: "#" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { name: "شبکه‌های اجتماعی", href: "#" },
      { name: "واحد انفورماتیک", href: "#" },
      { name: "حریم شخصی", href: "#" },
      { name: "تماس با ما", href: "#" },
    ],
  },
];

function MobileSection({ title, links }: F.FooterSection) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 font-medium text-gray-800"
      >
        {title}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <ul className="pb-4 space-y-2 text-sm text-gray-600">
          {links.map((link: F.FooterLink) => (
            <li key={link.name}>
              <F.Link href={link.href}>{link.name}</F.Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Newsletter({
  mobile = false,
  onSubmit,
}: {
  mobile?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${mobile ? "w-full pt-8 pb-4" : "col-span-2"}`}
    >
      {/* عنوان و متن راهنما کاملاً راست‌چین */}
      <div className="text-right">
        <h3 className="font-bold text-gray-800 text-[16px]">خبرنامه</h3>
        <p className="text-[12px] text-gray-500 mt-1">
          برای اینکه از جدیدترین اخبار نوبیتو جا نمونید...
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-1">
        {/* ردیف اصلی: دکمه سمت چپ، اینپوت سمت راست */}
        <div className="flex flex-row-reverse items-center gap-2 w-full">
          {/* اینپوت با کادر ملایم مطابق عکس */}
          <input
            name="email"
            type="email"
            required
            placeholder="ایمیل خود را اینجا وارد کنید"
            className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-lg px-4 py-3 text-[13px] text-right outline-none focus:border-[#1F7168] placeholder:text-gray-300"
          />

          {/* دکمه ارسال با استایل خاص عکس (رنگ کله‌غازی و آیکون دایره‌ای) */}
          <button
            type="submit"
            className="bg-[#3E7B71] text-white rounded-lg flex items-center justify-center gap-2 h-[48px] px-5 hover:bg-[#2d5c54] transition-all shrink-0"
          >
            <span className="text-[14px] font-bold">ارسال</span>
            <div className="bg-[#568D85] rounded-full p-1.5 flex items-center justify-center">
              <F.IoSend className="rotate-180 text-white" size={14} />
            </div>
          </button>
        </div>

        {/* متن ریز زیر اینپوت - دقیقاً زیر کادر ایمیل */}
        <p className="text-[10px] text-gray-400 text-right mt-1 mr-1">
          تلاش ما ارائه بهترین خدمات ممکن به شما همراهان نوبیتو است.
        </p>
      </form>
    </div>
  );
}

// در بدنه اصلی فوتر (بخش دسکتاپ) برای اینکه خبرنامه بزرگ شود:
// <div className="grid grid-cols-5 gap-8">  <-- گرید ۵ ستونه
//   {/* ۴ ستون برای لینک‌ها */}
//   <Newsletter /> {/* ستون ۵ام که با col-span-2 بزرگ شده */}
// </div>

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    console.log("newsletter:", email);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-white text-gray-600">
      {/* معرفی */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 items-center">
          <F.Link href="/">
            <F.Image src="/logo1.svg" alt="logo" width={90} height={90} />
          </F.Link>

          <div className="space-y-4 text-center md:text-right">
            <h2 className="text-lg font-semibold text-gray-800">
              تلاش ما دسترسی آسان‌تر شما به خدمات پزشکی است
            </h2>

            <p className="text-sm leading-relaxed text-gray-600">
              <span>
                با افتخار به شما پلتفرم نوبیتو را معرفی میکنیم. ما با افتخار به
                عنوان یک پلتفرم جامع ارائه دهنده خدمات پزشکی مثل نوبت‌دهی
                آنلاین، خدمات مشاوره حضوری و غیرحضوری و خدمات پزشکی در منزل را
                ارائه می‌دهیم. از اختصاص نوبت‌های پزشکی تا امکان مشاوره آنلاین و
                حضوری، همه چیز در اینجاست تا به شما یک تجربه
              </span>

              <span className="block md:inline mr-4 md:mr-0">
                درمانی راحت و بی‌دردسر ارائه دهیم. تمام تلاش و سعی ما بر این
                باور است که دغدغه‌های دسترسی و درمان را برای بیماران و
                همراهانشان کمتر کنیم، امیدواریم نوبیتو در روزهای ناخوش احوالی
                همراه و همیار شما باشد.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* دسکتاپ */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-5 gap-8 text-right">
          {FOOTER_NAV.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-bold text-gray-800">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <F.Link href={link.href} className="hover:text-gray-800">
                      {link.name}
                    </F.Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Newsletter onSubmit={handleNewsletterSubmit} />
        </div>
      </div>

      {/* موبایل */}
      <div className="md:hidden px-4">
        {FOOTER_NAV.map((section) => (
          <MobileSection key={section.title} {...section} />
        ))}

        <Newsletter mobile onSubmit={handleNewsletterSubmit} />
      </div>

      {/* اطلاعات تماس */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <F.TbPhoneCall className="text-[#1F7168]" />
          <span>تماس با پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸</span>
        </div>
        <div className="flex items-center gap-2">
          <F.CiMail className="text-[#1F7168]" />
          <span>smartix@yahoo.com</span>
        </div>
        <div className="flex items-center gap-2">
          <F.FaRegBuilding className="text-[#1F7168]" />
          <span>تهران، میدان آرژانتین، خیابان لاله، کوچه صاد، پلاک ۱۸</span>
        </div>
      </div>

      <div className="border-t text-center text-sm py-4">
        © {new Date().getFullYear()} Nobito. All rights reserved.
      </div>
    </footer>
  );
}
