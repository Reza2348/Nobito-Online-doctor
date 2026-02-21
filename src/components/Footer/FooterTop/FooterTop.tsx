import * as F from "@/Imports/FooterImports/FooterImports";

export default function FooterTop() {
  return (
    <div className="mx-9 px-4 py-10 flex flex-col md:flex-row gap-8 items-center">
      {/* لوگو */}
      <F.Link href="/">
        <F.Image src="/logo1.svg" alt="logo" width={90} height={90} />
      </F.Link>

      {/* توضیحات برند */}
      <div
        className="flex flex-col gap-6 md:gap-4 md:flex-1 items-center md:items-start text-center md:text-right"
        dir="rtl"
      >
        <h2 className="text-gray-800 text-xl md:text-2xl leading-snug">
          تلاش ما دسترسی آسان‌تر شما به خدمات پزشکی است
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-loose px-4 md:px-0 text-justify md:text-right">
          با افتخار به شما پلتفرم نوبیتو را معرفی میکنیم. ما به عنوان یک پلتفرم
          جامع ارائه‌دهنده خدمات پزشکی مثل نوبت‌دهی آنلاین، خدمات مشاوره حضوری و
          غیرحضوری و خدمات پزشکی در منزل فعالیت می‌کنیم.
          <span className="block mt-4 md:mt-0 md:inline">
            هدف ما ارائه تجربه‌ای درمانی راحت و بی‌دردسر است و تلاش می‌کنیم
            دغدغه‌های دسترسی به خدمات درمانی را برای بیماران و همراهانشان کمتر
            کنیم.
          </span>
        </p>
      </div>
    </div>
  );
}
