"use client";

import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi";

const About = () => {
  return (
    <section className="container px-4 sm:px-6 py-12 sm:py-16 md:py-24">
      {/* 🔹 عنوان + متن‌ها */}
      <div className="max-w-4xl mx-auto text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          درباره ما
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg leading-loose text-gray-700">
          پلتفرم ما با هدف ساده‌سازی خدمات درمانی، بستری امن و یکپارچه برای
          مدیریت نوبت‌ها، پرونده‌های پزشکی و ارتباط با پزشکان فراهم کرده است.
        </p>

        <p className="mt-4 text-sm sm:text-base md:text-lg leading-loose text-gray-700">
          ما با ارائه یک تجربه کاربری ساده و شفاف، به شما کمک می‌کنیم روند درمان
          خود را بهتر مدیریت کنید و با اطمینان بیشتری از خدمات پزشکی بهره‌مند
          شوید.
        </p>
      </div>

      {/* 🔹 کارت‌ها */}
      <div className="mt-12 md:mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {/* کارت 1 */}
        <div
          className="
          bg-white rounded-2xl shadow-md p-5
          text-center sm:text-right
          transition hover:shadow-xl hover:-translate-y-1
        "
        >
          <div className="flex justify-center sm:justify-start">
            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl">
              <HiOutlineShieldCheck className="text-green-600 text-2xl" />
            </div>
          </div>

          <h3 className="mt-4 font-bold text-black">امنیت اطلاعات</h3>

          <p className="mt-2 text-sm text-gray-600 leading-loose">
            اطلاعات شما با بالاترین استانداردهای امنیتی نگهداری می‌شود.
          </p>
        </div>

        {/* کارت 2 */}
        <div
          className="
          bg-white rounded-2xl shadow-md p-5
          text-center sm:text-right
          transition hover:shadow-xl hover:-translate-y-1
        "
        >
          <div className="flex justify-center sm:justify-start">
            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl">
              <HiOutlineClock className="text-green-600 text-2xl" />
            </div>
          </div>

          <h3 className="mt-4 font-bold text-black">دسترسی سریع</h3>

          <p className="mt-2 text-sm text-gray-600 leading-loose">
            در هر زمان و مکان به خدمات و سوابق پزشکی خود دسترسی دارید.
          </p>
        </div>

        {/* کارت 3 */}
        <div
          className="
          bg-white rounded-2xl shadow-md p-5
          text-center sm:text-right
          transition hover:shadow-xl hover:-translate-y-1
        "
        >
          <div className="flex justify-center sm:justify-start">
            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-xl">
              <HiOutlineUserGroup className="text-green-600 text-2xl" />
            </div>
          </div>

          <h3 className="mt-4 font-bold text-black">ارتباط آسان</h3>

          <p className="mt-2 text-sm text-gray-600 leading-loose">
            ارتباط سریع و ساده با پزشکان و مراکز درمانی.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
