import * as F from "@/Imports/FooterImports/FooterImports";

export default function FooterTop() {
  return (
    <section
      dir="rtl"
      aria-labelledby="footer-top-heading"
      className="px-4 sm:px-6 lg:px-9 py-10 flex flex-col md:flex-row gap-8 items-center"
    >
      <F.Link
        href="/"
        aria-label="بازگشت به صفحه اصلی نوبیتو"
        className="shrink-0"
      >
        <F.Image
          src="/logo1.svg"
          alt="نوبیتو"
          width={90}
          height={90}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </F.Link>

      <div className="flex flex-col gap-6 md:gap-4 md:flex-1 items-center md:items-start text-center md:text-right">
        <h2
          id="footer-top-heading"
          className="text-gray-800 text-xl md:text-2xl leading-snug"
        >
          تلاش ما دسترسی آسان‌تر شما به خدمات پزشکی است
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-loose max-w-2xl px-4 md:px-0">
          با افتخار پلتفرم نوبیتو را به شما معرفی می‌کنیم. ما به‌عنوان یک پلتفرم
          جامع ارائه‌دهنده خدمات پزشکی مثل نوبت‌دهی آنلاین، خدمات مشاوره حضوری و
          غیرحضوری و خدمات پزشکی در منزل فعالیت می‌کنیم.
          <span className="block mt-4 md:mt-0 md:inline">
            هدف ما ارائه تجربه‌ای درمانی راحت و بی‌دردسر است و تلاش می‌کنیم
            دغدغه‌های دسترسی به خدمات درمانی را برای بیماران و همراهانشان کمتر
            کنیم.
          </span>
        </p>
      </div>
    </section>
  );
}
