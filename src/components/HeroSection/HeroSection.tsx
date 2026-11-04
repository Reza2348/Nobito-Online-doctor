import Link from "next/link";
import { FiCalendar, FiClipboard, FiSmartphone } from "react-icons/fi";

const points = [
  {
    Icon: FiCalendar,
    title: "ساعت خالی را همان‌جا می‌بینید",
    text: "زمان‌های رزروشده از قبل خط می‌خورند؛ نوبتی که انتخاب می‌کنید برای خودتان می‌ماند و دوباره رزرو نمی‌شود.",
  },
  {
    Icon: FiSmartphone,
    title: "ورود با شمارهٔ موبایل",
    text: "برای گرفتن نوبت فقط کد پیامکی کافی است؛ نیازی به رمز عبور و فرم طولانی ثبت‌نام نیست.",
  },
  {
    Icon: FiClipboard,
    title: "نسخه و سابقه کنار هم",
    text: "نسخه‌های الکترونیک و نوبت‌های قبلی در پروفایل شما می‌مانند و هر وقت لازم شد در دسترس‌اند.",
  },
];

export const HeroSection = () => {
  return (
    <section dir="rtl" className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold leading-10 text-ink lg:text-3xl">
            نوبت گرفتن باید
            <br />
            ساده و قابل‌اتکا باشد
          </h2>

          <p className="mt-4 text-sm leading-8 text-muted">
            نوبیتو را برای این ساخته‌ایم که از جست‌وجوی پزشک تا ویزیت، بدون
            تماس تلفنی و انتظار طولانی انجام شود.
          </p>

          <Link
            href="/AppointmentCard"
            className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-strong"
          >
            شروع نوبت‌گیری
          </Link>
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {points.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-4 py-6">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden />

              <div>
                <h3 className="font-bold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
