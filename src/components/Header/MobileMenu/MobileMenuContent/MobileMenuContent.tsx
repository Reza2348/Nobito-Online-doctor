"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

interface MyUser extends H.User {
  user_metadata?: {
    phone?: string;
    [key: string]: any;
  };
}

type Props = {
  user: MyUser | null;
  logout: () => void;
  NAV_LINKS?: H.NavLink[];
  onClose: () => void;
};

const DEFAULT_NAV_LINKS: H.NavLink[] = [
  { href: "/Online consultation", label: "مشاوره آنلاین" },
  { href: "/HealthMagazine", label: "مجله سلامت" },
  { href: "/Charity", label: "نیکوکاری" },
  { href: "/Notifications", label: "اعلان ها" },
];

const MobileMenuContent: H.React.FC<Props> = ({
  user,
  logout,
  NAV_LINKS = DEFAULT_NAV_LINKS,
  onClose,
}) => {
  const router = H.useRouter();

  const [openServices, setOpenServices] = H.useState(false);
  const [openAuth, setOpenAuth] = H.useState(false);

  const handleNavigate = (href: string) => {
    onClose();
    setOpenServices(false);
    setOpenAuth(false);
    router.push(href);
  };

  const handleLogout = () => {
    setOpenAuth(false);
    onClose();
    logout();
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 h-16 border-b">
        <H.Link href="/">
          <img src="Default.svg" alt="logo" width={150} height={150} />
        </H.Link>

        <button onClick={onClose}>
          <H.HiX size={26} className="text-black" />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2 p-4">
        {/* 1. نوبت دهی مطب */}
        <button
          onClick={() => handleNavigate("/")}
          className="px-3 py-3 rounded-lg text-[#757575] hover:bg-emerald-50 text-right"
        >
          نوبت دهی مطب
        </button>

        {/* 2. خدمات (Dropdown) */}
        <div>
          <button
            onClick={() => setOpenServices((p) => !p)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-[#757575] hover:bg-emerald-50"
          >
            خدمات
            <H.FaChevronDown
              className={`transition-transform ${
                openServices ? "rotate-180" : ""
              }`}
            />
          </button>

          {openServices && (
            <div className="mt-2 flex flex-col bg-gray-50 rounded-lg overflow-hidden text-[#757575]">
              <button
                onClick={() => handleNavigate("/Services/dentistry")}
                className="px-4 py-3 text-right hover:bg-gray-100"
              >
                دندان‌پزشکی
              </button>

              <button
                onClick={() => handleNavigate("/Services/beauty")}
                className="px-4 py-3 text-right hover:bg-gray-100"
              >
                زیبایی
              </button>

              <button
                onClick={() => handleNavigate("/Services/treatment")}
                className="px-4 py-3 text-right hover:bg-gray-100"
              >
                درمانی
              </button>
            </div>
          )}
        </div>

        {/* OTHER LINKS */}
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavigate(link.href)}
            className="px-3 py-3 rounded-lg text-[#757575] hover:bg-emerald-50 text-right"
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* AUTH SECTION */}
      <div className="p-4 border-t">
        {!user ? (
          <button
            onClick={() => handleNavigate("/auth/signup")}
            className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl"
          >
            ورود / ثبت‌نام
          </button>
        ) : (
          <div>
            <button
              onClick={() => setOpenAuth((p) => !p)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl"
            >
              داشبورد
              <H.FaChevronDown
                className={`transition-transform ${
                  openAuth ? "rotate-180" : ""
                }`}
              />
            </button>

            {openAuth && (
              <div className="mt-2 bg-white shadow-lg rounded-xl border overflow-hidden">
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className="w-full py-3 hover:bg-gray-50 text-black"
                >
                  ورود به داشبورد
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-red-600 hover:bg-red-50"
                >
                  خروج از حساب
                </button>
              </div>
            )}
          </div>
        )}

        {/* FOOTER LINKS */}
        <div className="mt-6 flex flex-col gap-3 text-[#757575] text-sm font-medium items-end">
          <button
            onClick={() => handleNavigate("/aboutus")}
            className="text-right w-full"
          >
            درباره ما
          </button>

          <button
            onClick={() => handleNavigate("/Contactus")}
            className="text-right w-full"
          >
            تماس با ما
          </button>

          <button
            onClick={() => handleNavigate("/FAQ")}
            className="text-right w-full"
          >
            سوال های متداول
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenuContent;
