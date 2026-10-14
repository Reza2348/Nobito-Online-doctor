interface Props {
  lastChecked: string | null;
}

const steps = [
  "بررسی مجوز مدیر برای API مدیریت دیتابیس",
  "بررسی اتصال بک‌اند به MongoDB",
  "آزمایش انتقال به MongoDB در محیط آزمایشی",
  "آزمایش ورود، ثبت‌نام، خواندن و نوشتن در حالت جایگزین",
  "بررسی همگام‌سازی داده‌ها و بازگشت به Supabase",
];

export default function TestingGuideCard({ lastChecked }: Props) {
  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <h2 className="font-bold text-blue-950">راهنمای تست Failover</h2>

      <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-blue-900">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      {lastChecked && (
        <p className="mt-4 border-t border-blue-200 pt-3 text-xs text-blue-800">
          آخرین بررسی: {lastChecked}
        </p>
      )}
    </section>
  );
}
