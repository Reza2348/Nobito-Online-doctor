"use client";

import * as F from "../FooterImports/FooterImports";

const FOOTER_NAV: F.FooterSection[] = [
  {
    title: "نوبیتو",
    links: [
      { name: "سوالات متداول", href: "#" },
      { name: "تماس با ما", href: "#" },
      { name: "میثاق نام", href: "#" },
      { name: "درباره ما", href: "#" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { name: "خدمات پزشکی در منزل", href: "#" },
      { name: "مشاوره غیرحضوری", href: "#" },
      { name: "مراکز درمانی", href: "#" },
      { name: "نوبت دهی", href: "#" },
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
      { name: "شبکه های اجتماعی", href: "#" },
      { name: "واحد انفورماتیک", href: "#" },
      { name: "حریم شخصی", href: "#" },
      { name: "تماس با ما", href: "#" },
    ],
  },
];

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    console.log("Newsletter signup:", email);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-white text-gray-600">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between px-4 py-6 md:py-8 gap-6 md:gap-12">
          {/* لوگو */}
          <F.Link href="/">
            <F.Image
              src="logo1.svg"
              alt="logo"
              width={85}
              height={85}
              priority
            />
          </F.Link>

          {/* متن‌ها */}
          <div className="flex flex-col gap-4 md:flex-1 items-center md:items-start text-center md:text-left">
            <p className="text-gray-700 font-medium text-base md:text-lg leading-relaxed text-center md:text-left">
              تلاش ما دسترسی آسان‌تر شما به <br className="block md:hidden" />
              خدمات پزشکی است
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed text-center md:text-left">
              با افتخار به شما پلتفرم نوبیتو را معرفی میکنیم. ما با افتخار به
              عنوان یک پلتفرم جامع ارائه دهنده خدمات پزشکی مثل نوبت‌دهی آنلاین،
              خدمات مشاوره حضوری و غیرحضوری و خدمات پزشکی در منزل را ارائه
              می‌دهیم. از اختصاص نوبت‌های پزشکی تا امکان مشاوره آنلاین و حضوری،
              همه چیز در اینجاست تا به شما یک تجربه درمانی راحت و بی دردسر ارائه
              دهیم.تمام تلاش و سعی ما بر این باور است که دغدغه های دسترسی و
              درمان را برای بیماران و همراهانشان کمتر کنیم،امیدواریم نوبیتو در
              روزهای ناخوش احوالی همراه و همیار شما باشد.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {FOOTER_NAV.map((section: F.FooterSection) => (
            <div key={section.title} className="text-center">
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link: F.FooterLink) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center text-sm hover:text-gray-800"
                    >
                      {link.name}
                      {link.external && (
                        <F.FiExternalLink className="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                      )}
                      {link.badge && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mr-10 mb-6  text-[#414141] flex-col gap-3 text-center md:text-left md:ml-8">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <F.TbPhoneCall className="text-lg text-[#1F7168]" />
          <span>تماس با پشتیبانی : ۱۲۳۴۵۶۷۸-۰۲۱ | ۱۲۳۴۵۶۷۸-۰۲۱</span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-2">
          <F.CiMail className="text-lg text-[#09463f]" />
          <span>نشانی پست الکترونیک : smartix@yahoo.com</span>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-2">
          <F.FaRegBuilding className="text-lg text-[#1F7168]" />
          <span>
            نشانی : تهران _ میدان آرژانتین _ خیابان لاله _ کوچه صاد _ پلاک 18
          </span>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-sm hover:text-gray-800">
              English
            </a>
            <a href="#" className="text-sm hover:text-gray-800">
              Privacy
            </a>
            <a href="#" className="text-sm hover:text-gray-800">
              Legal
            </a>
          </div>
          <p className="mt-4 sm:mt-0 text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Cadet UI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
