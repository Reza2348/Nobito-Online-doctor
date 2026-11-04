import React from "react";

import { SITE_CONTACT, SITE_SOCIAL } from "@/constants/site";

const socialLinks = [
  { label: "اینستاگرام", href: SITE_SOCIAL.instagram },
  { label: "تلگرام", href: SITE_SOCIAL.telegram },
  { label: "یوتیوب", href: SITE_SOCIAL.youtube },
].filter((item) => item.href);

const Page: React.FC = () => {
  const { phones, email, address } = SITE_CONTACT;

  const rows = [
    phones.length > 0 && { title: "پشتیبانی تلفنی", lines: phones },
    email && { title: "ایمیل", lines: [email] },
    address.length > 0 && { title: "نشانی دفتر", lines: address },
  ].filter(Boolean) as { title: string; lines: string[] }[];

  return (
    <section dir="rtl" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.2fr] md:py-20">
        <div>
          <h2 className="text-2xl font-bold leading-10 text-ink md:text-3xl">
            سؤالی دارید؟
            <br />
            مستقیم از تیم نوبیتو بپرسید
          </h2>

          <p className="mt-4 max-w-md text-sm leading-8 text-muted">
            برای رزرو نوبت، پیگیری نسخه یا مشکل در ورود به حساب، پیام بدهید.
            پاسخ‌ها در ساعت کاری، معمولاً همان روز داده می‌شود.
          </p>

          {socialLinks.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline underline-offset-4 decoration-brand/30 hover:decoration-brand"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {rows.length > 0 && (
          <dl className="divide-y divide-line border-y border-line">
            {rows.map(({ title, lines }) => (
              <div
                key={title}
                className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-muted">{title}</dt>
                <dd className="space-y-1 text-base font-medium text-ink">
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

export default Page;
