"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

// گسترش نوع User برای دسترسی به user_metadata
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

  // مدیریت overflow صفحه وقتی منو باز است
  H.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button */}
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

      {/* Slide Drawer */}
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

        {/* Main Links */}
        <nav className="flex flex-col gap-2 p-4">
          {NAV_LINKS.map((link) => (
            <H.Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-[#757575] hover:bg-emerald-50 transition-colors"
            >
              {link.label}
            </H.Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="p-4 border-t">
          {!user ? (
            <H.Link
              href="/auth/signup"
              onClick={toggleMenu}
              className="block text-center bg-emerald-600  text-white py-3 rounded-xl"
            >
              ورود / ثبت‌نام
            </H.Link>
          ) : (
            <button
              onClick={() => {
                toggleMenu();
                logout();
              }}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl"
            >
              {/* نمایش شماره موبایل یا ایمیل کاربر */}
              {user.user_metadata?.phone || user.email || "کاربر"}
            </button>
          )}

          {/* About / Contact / FAQ */}
          <div className="mt-4">
            <ul className="flex flex-col gap-2 text-[#757575] text-sm font-medium">
              <li className="hover:text-[#1F7168] cursor-pointer transition-colors">
                درباره ما
              </li>
              <li className="hover:text-[#1F7168] cursor-pointer transition-colors">
                تماس با ما
              </li>
              <li className="hover:text-[#1F7168] cursor-pointer transition-colors">
                سوالات متداول
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
