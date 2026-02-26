import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="w-full py-16 ">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* کارت خدمات (الان اول نمایش داده می‌شود) */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-600 to-rose-500 text-white p-10 flex items-center justify-between hover:scale-[1.02] transition-transform duration-300">
            {/* متن */}
            <div className="max-w-md space-y-4 z-10">
              <h3 className="text-lg font-medium opacity-90">
                خدمات پزشکی رو برای شما در <br /> دسترستر کردیم
              </h3>

              <p className="text-sm opacity-80 leading-7">
                فقط با چند کلیک به خدمات پزشکی مورد نیاز افراد کم توان
                <br />
                جسمی (حرکتی) دسترسی پیدا می‌کنید.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-white text-rose-600 font-medium px-5 py-2.5 rounded-xl shadow hover:bg-gray-100 transition">
                مشاهده خدمات
                <span className="text-lg">←</span>
              </button>
            </div>

            {/* تصویر */}
            <div className="hidden md:block relative w-44 h-60">
              <Image
                src="/pic (8).png"
                alt="doctor"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* کارت مشاوره (الان دوم نمایش داده می‌شود) */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-sky-600 to-sky-500 text-white p-10 flex items-center justify-between hover:scale-[1.02] transition-transform duration-300">
            {/* متن */}
            <div className="max-w-md space-y-4 z-10">
              <h3 className="text-lg font-medium opacity-90">
                مشغله زندگی نمیزاره بیایی دکتر؟ <br />
                مشاوره غیر حضوری بگیر
              </h3>

              <p className="text-sm opacity-80">
                اگر زمان کافی برای مراجعه به پزشک رو ندارید میتونید از <br />
                طریق مشاوره غیرحضوری با پزشک صحبت کنید
              </p>

              <button className="mt-4 inline-flex items-center gap-2 bg-white text-sky-600 font-medium px-5 py-2.5 rounded-xl shadow hover:bg-gray-100 transition">
                نوبت بگیر
                <span className="text-lg">←</span>
              </button>
            </div>

            {/* تصویر */}
            <div className="hidden md:block relative w-44 h-60">
              <Image
                src="/wepik (9).png"
                alt="doctor"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
