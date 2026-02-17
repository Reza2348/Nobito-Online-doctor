import * as H from "@/Imports/HeaderImports/HeaderImports";

const SubHeader = () => {
  return (
    /* استفاده از hidden برای موبایل و تبلت، و lg:flex برای نمایش در دسکتاپ */
    <div className="hidden lg:flex items-center justify-between w-full px-4 py-2 bg-white">
      {/* بخش آیکون‌ها - سمت راست (در حالت RTL) */}
      <div className="flex items-center gap-4  pl-4 border-gray-100">
        <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <H.PiInstagramLogoLight className="text-2xl" />
        </span>
        <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <H.TbSend className="text-2xl" />
        </span>
        <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <H.PiYoutubeLogo className="text-2xl" />
        </span>
        <span className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <H.CiLinkedin className="text-2xl" />
        </span>
      </div>

      {/* بخش منوها و انتخاب آدرس - سمت چپ (در حالت RTL) */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-[13px] text-gray-500 font-medium">
          <H.Link
            href="/About"
            className="hover:text-primary transition-colors cursor-pointer"
          >
            درباره ما
          </H.Link>

          <H.Link
            href="/Contactus"
            className="hover:text-primary transition-colors cursor-pointer"
          >
            تماس با ما
          </H.Link>

          <H.Link
            href="/FAQ"
            className="hover:text-primary transition-colors cursor-pointer"
          >
            سوال های متداول
          </H.Link>
        </div>

        {/* بخش انتخاب آدرس همراه با جداکننده بصری */}
        <div className="flex items-center gap-1 text-[13px] text-gray-500  pr-4 border-gray-200">
          <span className="text-lg">
            <H.FiMapPin />
          </span>
          <span className="font-bold">+</span>
          <span className="hover:text-primary transition-colors cursor-pointer">
            انتخاب آدرس
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
