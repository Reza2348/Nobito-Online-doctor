import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="w-full py-14">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-2">
        <article className="flex items-center justify-between gap-6 rounded-xl bg-brand p-8 text-white md:p-10">
          <div className="max-w-sm">
            <h3 className="text-xl font-bold leading-9">
              خدمات پزشکی برای افراد کم‌توان جسمی‌حرکتی
            </h3>

            <p className="mt-3 text-sm leading-7 text-white/85">
              مراکز و پزشکانی را ببینید که دسترسی مناسب برای مراجعه دارند، و
              بدون رفت‌وآمد اضافه نوبت بگیرید.
            </p>

            <Link
              href="/Services"
              className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-brand hover:bg-brand-soft"
            >
              مشاهده خدمات
            </Link>
          </div>

          <div className="relative hidden h-48 w-56 shrink-0 md:block">
            <Image
              src="/pic (8).png"
              alt=""
              fill
              sizes="224px"
              className="object-contain"
            />
          </div>
        </article>

        <article className="flex items-center justify-between gap-6 rounded-xl border border-line bg-surface p-8 md:p-10">
          <div className="max-w-sm">
            <h3 className="text-xl font-bold leading-9 text-ink">
              وقت مراجعه حضوری ندارید؟
              <br />
              ویزیت آنلاین بگیرید
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted">
              ساعت‌های خالی پزشک را ببینید، یکی را انتخاب کنید و در همان زمان
              به‌صورت تصویری یا تلفنی ویزیت شوید.
            </p>

            <Link
              href="/AppointmentCard"
              className="mt-6 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
            >
              گرفتن نوبت
            </Link>
          </div>

          <div className="relative hidden h-48 w-56 shrink-0 md:block">
            <Image
              src="/wepik (9).png"
              alt=""
              fill
              sizes="224px"
              className="object-contain"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
