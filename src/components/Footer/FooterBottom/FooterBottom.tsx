import * as F from "@/Imports/FooterImports/FooterImports";

export default function FooterBottom() {
  return (
    <div className="bg-white py-6 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse justify-between items-center gap-4">
        {/* کپی‌رایت */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <span className="text-lg leading-none">©</span>
          <span>تمامی حقوق این وب‌سایت متعلق به شرکت نوبیتو است</span>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="flex gap-5 text-gray-400">
          <a
            href="#"
            className="hover:text-red-600 transition-colors"
            aria-label="یوتیوب"
          >
            <F.FaYoutube size={22} />
          </a>

          <a
            href="#"
            className="hover:text-blue-500 transition-colors"
            aria-label="تلگرام"
          >
            <F.FaTelegram size={22} />
          </a>

          <a
            href="#"
            className="hover:text-pink-600 transition-colors"
            aria-label="اینستاگرام"
          >
            <F.FaInstagram size={22} />
          </a>

          <a
            href="#"
            className="hover:text-blue-700 transition-colors"
            aria-label="لینکدین"
          >
            <F.FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </div>
  );
}
