import {
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

export default function MedicalSocialMedia() {
  const socials = [
    {
      name: "اینستاگرام",
      desc: "نکات روزانه سلامت",
      icon: <FaInstagram />,
      link: "https://instagram.com",
      color: "hover:bg-blue-500",
    },
    {
      name: "تلگرام",
      desc: "مشاوره سریع",
      icon: <FaTelegramPlane />,
      link: "https://t.me",
      color: "hover:bg-emerald-500",
    },
    {
      name: "توییتر",
      desc: "اخبار پزشکی",
      icon: <FaTwitter />,
      link: "https://twitter.com",
      color: "hover:bg-sky-500",
    },
    {
      name: "لینکدین",
      desc: "مقالات تخصصی",
      icon: <FaLinkedin />,
      link: "https://linkedin.com",
      color: "hover:bg-indigo-600",
    },
  ];

  return (
    <section className="`bg-linear-to-b from-blue-50 to-white py-10 sm:py-14 px-4 my-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          ارتباط با ما در شبکه‌های اجتماعی
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
          برای دریافت نکات پزشکی، پیگیری اخبار سلامت و دریافت مشاوره آنلاین، ما
          را در شبکه‌های اجتماعی دنبال کنید.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${item.color}`}
            >
              <div className="text-2xl sm:text-3xl text-blue-500 mb-3 group-hover:text-white transition">
                {item.icon}
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-white mb-1">
                {item.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90">
                {item.desc}
              </p>
            </a>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-8">
          پاسخگویی توسط تیم پزشکی معتبر و متخصص
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around items-center sm:hidden shadow-md">
        {socials.slice(0, 2).map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            className="flex flex-col items-center text-xs text-gray-600"
          >
            <div className="text-lg mb-1 text-blue-500">{item.icon}</div>
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}
