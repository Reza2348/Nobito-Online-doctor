import Image from "next/image";
import { FiUser, FiHeart, FiClipboard } from "react-icons/fi";

export const HeroSection = () => {
  return (
    <div
      className="flex flex-col bg-[#f5f5f5] rounded-2xl shadow-md transition-shadow overflow-hidden w-full lg:max-w-350 mx-auto mb-4"
      dir="rtl"
    >
      {/* بخش بالا */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 px-6 lg:px-16 py-8 lg:py-12">
        {/* عکس - موبایل: اول | دسکتاپ: چپ */}
        <div className="shrink-0 w-full lg:w-auto order-1 lg:order-2" dir="ltr">
          <Image
            src="/Pic20.svg"
            alt="بیمه دکترتو"
            width={280}
            height={220}
            className="rounded-xl object-cover w-full lg:w-70 lg:h-55"
            priority
          />
        </div>

        {/* متن‌ها - موبایل: دوم | دسکتاپ: راست */}
        <div className="flex flex-col gap-4 flex-1 text-right order-2 lg:order-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-[#2b2b2b] leading-tight">
            بیمه دکترتو در روزهای سخت
            <span className="block text-center lg:inline lg:text-right">
              همراه شماست
            </span>
          </h1>
          <p className="text-gray-400 text-sm leading-7">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است،
            <br />
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
            <br />
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد،
            <br />
            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
            و متخصصان را می طلبد،
          </p>
          <div className="flex justify-end mt-2">
            <button className="border border-gray-400 w-full lg:w-auto text-gray-600 px-6 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors bg-white">
              مطالعه بیشتر
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mx-6 lg:mx-16" />

      {/* کارت‌ها - موبایل: ستونی | دسکتاپ: ردیفی */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 lg:gap-12 px-6 lg:px-16 py-8 lg:py-10">
        {/* کارت ۱ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-right gap-3 lg:max-w-55">
          <div className="w-14 h-14 bg-[#2e8b7a] rounded-xl flex items-center justify-center">
            <FiUser className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-bold text-[#2b2b2b] text-sm">
            بیمه دکترتو در روزهای سخت همراه
          </h3>
          <p className="text-gray-400 text-xs leading-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            بااستفاده از طراحان گرافیک است.
          </p>
        </div>

        {/* کارت ۲ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-right gap-3 lg:max-w-55">
          <div className="w-14 h-14 bg-[#2e8b7a] rounded-xl flex items-center justify-center">
            <FiHeart className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-bold text-[#2b2b2b] text-sm">
            بیمه دکترتو در روزهای سخت همراه
          </h3>
          <p className="text-gray-400 text-xs leading-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            بااستفاده از طراحان گرافیک است.
          </p>
        </div>

        {/* کارت ۳ */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-right gap-3 lg:max-w-55">
          <div className="w-14 h-14 bg-[#2e8b7a] rounded-xl flex items-center justify-center">
            <FiClipboard className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-bold text-[#2b2b2b] text-sm">
            بیمه دکترتو در روزهای سخت همراه
          </h3>
          <p className="text-gray-400 text-xs leading-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            بااستفاده از طراحان گرافیک است.
          </p>
        </div>
      </div>
    </div>
  );
};
