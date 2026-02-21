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
};

const DEFAULT_NAV_LINKS: H.NavLink[] = [
  { href: "/", label: "نوبت دهی مطب" },
  { href: "/Services", label: "خدمات" },
  { href: "/Online consultation", label: "مشاوره آنلاین" },
  { href: "/Health Magazine", label: "مجله سلامت" },
  { href: "/Charity", label: "نیکوکاری" },
];

const MobileMenu: H.React.FC<Props> = ({
  user,
  logout,
  NAV_LINKS = DEFAULT_NAV_LINKS,
}) => {
  const [isOpen, setIsOpen] = H.useState(false);
  const [openDropdown, setOpenDropdown] = H.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(false);
  };

  // تابع کمکی برای کلیک روی لینک
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setOpenDropdown(false);
    window.location.href = href;
  };

  const handleLogout = () => {
    setOpenDropdown(false);
    setIsOpen(false);
    logout();
  };

  H.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <H.HiMenu size={26} className="text-gray-700" />
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-50 md:hidden
        transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <H.Link href="/">
            <H.Image
              src="Default.svg"
              alt="logo"
              width={150}
              height={150}
              priority
            />
          </H.Link>
          <button onClick={toggleMenu}>
            <H.HiX size={26} className="text-black" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 p-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-[#757575] hover:bg-emerald-50 transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="p-4 border-t relative">
          {!user ? (
            <button
              onClick={() => handleLinkClick("/auth/signup")}
              className="w-full block text-center bg-emerald-600 text-white py-3 rounded-xl"
            >
              ورود / ثبت‌نام
            </button>
          ) : (
            <div className="relative">
              {/* Dashboard Button */}
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl"
              >
                داشبورد
                <H.FaChevronDown
                  className={`transition-transform duration-300 ${
                    openDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {openDropdown && (
                <div className="mt-2 bg-white shadow-lg rounded-xl border overflow-hidden">
                  <button
                    onClick={() => handleLinkClick("/dashboard")}
                    className="w-full text-center py-3 text-black hover:bg-gray-50 transition"
                  >
                    ورود به داشبورد
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    خروج از حساب
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Extra Links */}
          <div className="mt-6">
            <ul className="flex flex-col gap-3 text-[#757575] text-sm font-medium">
              <button
                onClick={() => handleLinkClick("/aboutus")}
                className="text-right hover:text-black transition-colors"
              >
                درباره ما
              </button>
              <button
                onClick={() => handleLinkClick("/Contactus")}
                className="text-right hover:text-black transition-colors"
              >
                تماس با ما
              </button>
              <button
                onClick={() => handleLinkClick("/FAQ")}
                className="text-right hover:text-black transition-colors"
              >
                سوال های متداول
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
