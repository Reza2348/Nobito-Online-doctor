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
    <div className="border-b border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between flex-row-reverse  items-center py-4 font-bold text-gray-700 focus:outline-none"
      >
        {/* علامت مثبت و منفی در سمت چپ (مطابق عکس موبایل) */}
        <span className="text-xl font-light text-black">
          {open ? "−" : "+"}
        </span>

        {/* عنوان بخش در سمت راست */}
        <span>{title}</span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="pb-4 space-y-3 text-sm text-gray-500 text-right">
          {links.map((link: F.FooterLink) => (
            <li key={link.name}>
              <F.Link
                href={link.href}
                className="hover:text-[#1F7168] transition-colors"
              >
                {link.name}
              </F.Link>
            </li>
          ))}
        </ul>
      </div>
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
      className={`flex flex-col gap-3 text-right ${mobile ? "w-full pt-8 pb-4" : "w-full"}`}
    >
      <h3 className="text-gray-800 text-[16px]">خبرنامه</h3>
      <p className="text-[12px] text-gray-500 leading-relaxed">
        برای اینکه از جدیدترین اخبار نوبیتو جا نمونید...
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-row-reverse items-center gap-2">
          <input
            name="email"
            type="email"
            required
            placeholder="ایمیل خود را اینجا وارد کنید"
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-[13px] text-right outline-none focus:border-[#1F7168] placeholder:text-gray-300 transition-colors"
          />
          {!mobile && (
            <button
              type="submit"
              className="bg-[#3E7B71] text-white rounded-xl flex items-center gap-2 px-6 py-3 hover:bg-[#2d5c54] transition-all"
            >
              <span className="text-[14px] font-bold">ارسال</span>
              <div className="bg-white/20 rounded-full p-1.5 flex items-center justify-center">
                <F.IoSend className="rotate-180" size={14} />
              </div>
            </button>
          )}
        </div>
        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
          تلاش ما ارائه بهترین خدمات ممکن به شما همراهان نوبیتو است.
        </p>
        {mobile && (
          <button
            type="submit"
            className="w-full bg-[#3E7B71] text-white rounded-xl flex items-center justify-center gap-2 py-3 mt-2 font-bold hover:bg-[#2d5c54] transition-all"
          >
            <span>ارسال</span>
            <div className="bg-white/20 rounded-full p-1.5 flex items-center justify-center">
              <F.IoSend className="rotate-180" size={14} />
            </div>
          </button>
        )}
      </form>
    </div>
  );
}

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    console.log("Newsletter subscription:", email);
    alert("با تشکر! ایمیل شما ثبت شد.");
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-100 pt-10 font-[Vazirmatn,Tahoma]">
      <div className=" mx-9 px-4 py-10 flex flex-col md:flex-row gap-8 items-center">
        <F.Link href="/">
          <F.Image src="/logo1.svg" alt="logo" width={90} height={90} />
        </F.Link>

        <div
          className="flex flex-col gap-6 md:gap-4 md:flex-1 items-center md:items-start text-center md:text-right"
          dir="rtl"
        >
          <h2 className="text-gray-800  text-xl md:text-2xl leading-snug">
            تلاش ما دسترسی آسان‌تر شما به خدمات پزشکی است
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-loose px-4 md:px-0 text-justify md:text-right">
            با افتخار به شما پلتفرم نوبیتو را معرفی میکنیم. ما با افتخار به
            عنوان یک پلتفرم جامع ارائه دهنده خدمات پزشکی مثل نوبت‌دهی آنلاین،
            خدمات مشاوره حضوری و غیرحضوری و خدمات پزشکی در منزل را ارائه
            می‌دهیم. از اختصاص نوبت‌های پزشکی تا امکان مشاوره آنلاین و حضوری،
            همه چیز در اینجاست تا به شما یک تجربه
            <span className="block mt-4 md:mt-0 md:inline">
              درمانی راحت و بی دردسر ارائه دهیم.تمام تلاش و سعی ما بر این باور
              است که دغدغه های دسترسی و درمان را برای بیماران و همراهانشان کمتر
              کنیم،امیدواریم نوبیتو در روزهای ناخوش احوالی همراه و همیار شما
              باشد.
            </span>
          </p>
        </div>
      </div>

      <div className="hidden md:grid max-w-7xl mx-auto px-6 grid-cols-5 gap-8 py-14">
        <div className="text-right space-y-5">
          <h3 className="font-bold  leading-none">نوبیتو</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <F.Link
                href="/FAQ"
                className="hover:text-[#1F7168] transition-colors"
              >
                سوالات متداول
              </F.Link>
            </li>
            <li>
              <F.Link
                href="/Contactus"
                className="hover:text-[#1F7168] transition-colors"
              >
                تماس با ما
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                میثاق‌نامه
              </F.Link>
            </li>
            <li>
              <F.Link
                href="/aboutus"
                className="hover:text-[#1F7168] transition-colors"
              >
                درباره ما
              </F.Link>
            </li>
          </ul>
        </div>

        {/* ستون دوم - خدمات */}
        <div className="text-right space-y-5">
          <h3 className="font-bold text-gray-900 leading-none">خدمات</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                خدمات پزشکی در منزل
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                مشاوره غیرحضوری
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                مراکز درمانی
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                نوبت‌دهی
              </F.Link>
            </li>
          </ul>
        </div>

        {/* ستون سوم - نیکوکاری */}
        <div className="text-right space-y-5">
          <h3 className="font-bold text-gray-900 leading-none">نیکوکاری</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                درمانگر داوطلب
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                بیشتر بدانید
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                کمک مالی
              </F.Link>
            </li>
          </ul>
        </div>

        {/* ستون چهارم - پشتیبانی */}
        <div className="text-right space-y-5">
          <h3 className="font-bold text-gray-900 leading-none">پشتیبانی</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                شبکه‌های اجتماعی
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                واحد انفورماتیک
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                حریم شخصی
              </F.Link>
            </li>
            <li>
              <F.Link
                href="#"
                className="hover:text-[#1F7168] transition-colors"
              >
                تماس با ما
              </F.Link>
            </li>
          </ul>
        </div>

        {/* ستون پنجم - خبرنامه */}
        <Newsletter onSubmit={handleNewsletterSubmit} />
      </div>

      {/* بخش لینک‌های موبایل (آکاردئونی) */}
      <div className="md:hidden px-6 my-6 bg-white rounded-2xl py-2">
        {FOOTER_NAV.map((section) => (
          <MobileSection key={section.title} {...section} />
        ))}
        <Newsletter mobile onSubmit={handleNewsletterSubmit} />
      </div>

      {/* بخش اطلاعات تماس و مجوزها */}
      <div className="max-w-7xl mx-auto px-6 py-10  flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
        {/* ستون راست: اطلاعات تماس */}
        <div className="flex flex-col gap-5 text-right w-full md:w-auto">
          <div className="flex items-start  gap-3 text-gray-700 group cursor-pointer">
            <F.TbPhoneCall
              size={20}
              className="text-[#1F7168] group-hover:scale-110 transition-transform "
            />
            <span className="font-medium text-sm">
              تماس با پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸ | ۰۲۱-۱۲۳۴۵۶۷۸
            </span>
          </div>
          <div className="flex items-start  gap-3 text-gray-700 group cursor-pointer">
            <F.CiMail
              size={20}
              className="text-[#1F7168] group-hover:scale-110 transition-transform"
            />
            <span className="font-medium text-sm">
              نشانی پست الکترونیکی: smartix@yahoo.com
            </span>
          </div>
          <div className="flex items-start  gap-3 text-gray-700">
            <F.FaRegBuilding size={20} className="text-[#1F7168]" />
            <span className="leading-6 text-sm">
              نشانی: تهران - میدان آرژانتین - خیابان لاله - کوچه صاد - پلاک ۱۸
            </span>
          </div>
        </div>

        {/* ستون چپ: نمادهای اعتماد */}
        <div className="flex flex-col items-center md:items-start gap-5 w-full md:w-auto">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <F.Image
                src="/"
                width={55}
                height={55}
                alt="نماد ساماندهی"
                className="object-contain"
              />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <F.Image
                src="/"
                width={55}
                height={55}
                alt="نماد اعتماد الکترونیکی"
                className="object-contain"
              />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <F.Image
                src="/"
                width={55}
                height={55}
                alt="اتحادیه کسب‌وکارهای مجازی"
                className="object-contain"
              />
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <F.Image
                src="/"
                width={55}
                height={55}
                alt="ISO"
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 text-center md:text-right max-w-[380px] leading-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است
          </p>
        </div>
      </div>

      {/* فوتر نهایی: شبکه های اجتماعی و کپی‌رایت */}
      <div className="bg-white py-6 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse justify-between items-center gap-4">
          {/* شبکه‌های اجتماعی */}
          <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium order-first md:order-last">
            <span className="text-lg leading-none">©</span>
            <span>تمامی حقوق این وب‌سایت متعلق به شرکت نوبیتو است</span>
          </div>

          {/* متن حقوقی */}
          <div className="flex gap-5 text-gray-400 order-last md:order-first">
            <a
              href="#"
              className="hover:text-red-600 cursor-pointer transition-colors"
              aria-label="یوتیوب"
            >
              <F.FaYoutube size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-500 cursor-pointer transition-colors"
              aria-label="تلگرام"
            >
              <F.FaTelegram size={22} />
            </a>
            <a
              href="#"
              className="hover:text-pink-600 cursor-pointer transition-colors"
              aria-label="اینستاگرام"
            >
              <F.FaInstagram size={22} />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 cursor-pointer transition-colors"
              aria-label="لینکدین"
            >
              <F.FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
