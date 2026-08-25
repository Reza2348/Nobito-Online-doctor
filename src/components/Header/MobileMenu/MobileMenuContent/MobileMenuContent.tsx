"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

interface MyUser extends H.User {
  user_metadata?: {
    phone?: string;
    [key: string]: unknown;
  };
}

type Props = {
  user: MyUser | null;
  logout: () => void;
  NAV_LINKS?: H.NavLink[];
  onClose: () => void;
};

const DEFAULT_NAV_LINKS: H.NavLink[] = [
  {
    href: "/Online consultation",
    label: "مشاوره آنلاین",
  },
  {
    href: "/HealthMagazine",
    label: "مجله سلامت",
  },
  {
    href: "/Charity",
    label: "نیکوکاری",
  },
  {
    href: "/Notifications",
    label: "اعلان‌ها",
  },
];

const SERVICE_LINKS = [
  {
    href: "/Services/dentistry",
    label: "دندان‌پزشکی",
  },
  {
    href: "/Services/beauty",
    label: "زیبایی",
  },
  {
    href: "/Services/treatment",
    label: "درمانی",
  },
] as const;

const FOOTER_LINKS = [
  {
    href: "/aboutus",
    label: "درباره ما",
  },
  {
    href: "/Contactus",
    label: "تماس با ما",
  },
  {
    href: "/FAQ",
    label: "سوال‌های متداول",
  },
] as const;

const baseItemClasses = `
  flex min-h-12 w-full items-center
  rounded-xl px-3 py-3
  text-right text-sm font-medium
  text-[#757575]
  transition-colors duration-200
  hover:bg-emerald-50 hover:text-emerald-700
  active:bg-emerald-100
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-emerald-500
  motion-reduce:transition-none
`;

const MobileMenuContent: H.React.FC<Props> = ({
  user,
  logout,
  NAV_LINKS = DEFAULT_NAV_LINKS,
  onClose,
}) => {
  const router = H.useRouter();

  const [openServices, setOpenServices] = H.useState(false);
  const [openAuth, setOpenAuth] = H.useState(false);

  const servicesId = H.React.useId();
  const authId = H.React.useId();

  const handleNavigate = (href: string) => {
    setOpenServices(false);
    setOpenAuth(false);
    onClose();

    router.push(href);
  };

  const handleServicesToggle = () => {
    setOpenServices((previous) => !previous);
    setOpenAuth(false);
  };

  const handleAuthToggle = () => {
    setOpenAuth((previous) => !previous);
    setOpenServices(false);
  };

  const handleLogout = () => {
    setOpenServices(false);
    setOpenAuth(false);
    onClose();

    logout();
  };

  return (
    <div
      dir="rtl"
      className="
        flex min-h-full flex-col
        bg-white text-slate-900
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className="
          flex h-16 shrink-0
          items-center justify-between
          border-b border-slate-100
          bg-white px-4
        "
      >
        {/* LOGO */}

        <H.Link
          href="/"
          onClick={onClose}
          aria-label="صفحه اصلی نوبیتو"
          className="
            inline-flex items-center
            rounded-lg
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
          "
        >
          <img
            src="/Default.svg"
            alt="نوبیتو"
            width={120}
            height={48}
            loading="eager"
            decoding="async"
            className="
              h-auto w-[100px]
              object-contain
              sm:w-[120px]
            "
          />
        </H.Link>

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن منوی موبایل"
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            text-slate-700
            transition-colors duration-200
            hover:bg-slate-100
            hover:text-slate-900
            active:bg-slate-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            motion-reduce:transition-none
          "
        >
          <H.HiX size={24} aria-hidden="true" />
        </button>
      </header>

      {/* =====================================================
          MAIN NAVIGATION
      ====================================================== */}

      <nav
        aria-label="منوی اصلی"
        className="
          flex flex-1
          flex-col
          px-4 py-4
        "
      >
        {/* =================================================
            APPOINTMENT
        ================================================== */}

        <button
          type="button"
          onClick={() => handleNavigate("/")}
          className={baseItemClasses}
        >
          <span>نوبت‌دهی مطب</span>
        </button>

        {/* =================================================
            SERVICES
        ================================================== */}

        <div className="mt-1">
          <button
            type="button"
            onClick={handleServicesToggle}
            aria-expanded={openServices}
            aria-controls={servicesId}
            className={`
              ${baseItemClasses}
              justify-between
            `}
          >
            <span>خدمات</span>

            <H.FaChevronDown
              aria-hidden="true"
              className={`
                shrink-0
                transition-transform duration-200
                motion-reduce:transition-none
                ${openServices ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* SERVICES CONTENT */}

          <div
            id={servicesId}
            className={`
              grid
              transition-[grid-template-rows,opacity]
              duration-200
              ease-out
              motion-reduce:transition-none
              ${
                openServices
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }
            `}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className="
                  mt-1
                  overflow-hidden
                  rounded-xl
                  border border-slate-100
                  bg-slate-50/80
                  p-1
                "
              >
                {SERVICE_LINKS.map((service) => (
                  <button
                    key={service.href}
                    type="button"
                    onClick={() => handleNavigate(service.href)}
                    className="
                      flex min-h-11 w-full
                      items-center
                      rounded-lg
                      px-3 py-2.5
                      text-right text-sm
                      text-slate-600
                      transition-colors duration-200
                      hover:bg-white
                      hover:text-emerald-700
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-emerald-500
                      motion-reduce:transition-none
                    "
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            OTHER NAVIGATION LINKS
        ================================================== */}

        <div className="mt-1 flex flex-col">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavigate(link.href)}
              className={baseItemClasses}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* =====================================================
          ACCOUNT
      ====================================================== */}

      <section
        aria-label="حساب کاربری"
        className="
          shrink-0
          border-t border-slate-100
          px-4 py-4
        "
      >
        {!user ? (
          /* =================================================
             SIGN IN / SIGN UP
          ================================================== */

          <button
            type="button"
            onClick={() => handleNavigate("/auth/signup")}
            className="
              flex min-h-12 w-full
              items-center justify-center
              rounded-xl
              bg-emerald-600
              px-4 py-3
              text-sm font-bold
              text-white
              shadow-sm
              transition-colors duration-200
              hover:bg-emerald-700
              active:bg-emerald-800
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500
              focus-visible:ring-offset-2
              motion-reduce:transition-none
            "
          >
            ورود / ثبت‌نام
          </button>
        ) : (
          /* =================================================
             AUTHENTICATED USER
          ================================================== */

          <div>
            <button
              type="button"
              onClick={handleAuthToggle}
              aria-expanded={openAuth}
              aria-controls={authId}
              className="
                flex min-h-12 w-full
                items-center justify-center
                gap-2
                rounded-xl
                bg-emerald-600
                px-4 py-3
                text-sm font-bold
                text-white
                shadow-sm
                transition-colors duration-200
                hover:bg-emerald-700
                active:bg-emerald-800
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
                motion-reduce:transition-none
              "
            >
              <span>داشبورد</span>

              <H.FaChevronDown
                aria-hidden="true"
                className={`
                  transition-transform duration-200
                  motion-reduce:transition-none
                  ${openAuth ? "rotate-180" : "rotate-0"}
                `}
              />
            </button>

            {/* AUTH MENU */}

            <div
              id={authId}
              className={`
                grid
                transition-[grid-template-rows,opacity]
                duration-200
                ease-out
                motion-reduce:transition-none
                ${
                  openAuth
                    ? "mt-2 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border border-slate-200
                    bg-white
                    shadow-sm
                  "
                >
                  <button
                    type="button"
                    onClick={() => handleNavigate("/dashboard")}
                    className="
                      flex min-h-12 w-full
                      items-center
                      px-4 py-3
                      text-right text-sm
                      font-medium
                      text-slate-700
                      transition-colors duration-200
                      hover:bg-slate-50
                      hover:text-emerald-700
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-emerald-500
                      motion-reduce:transition-none
                    "
                  >
                    ورود به داشبورد
                  </button>

                  <div aria-hidden="true" className="h-px bg-slate-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex min-h-12 w-full
                      items-center
                      px-4 py-3
                      text-right text-sm
                      font-medium
                      text-red-600
                      transition-colors duration-200
                      hover:bg-red-50
                      hover:text-red-700
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-red-500
                      motion-reduce:transition-none
                    "
                  >
                    خروج از حساب
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            FOOTER LINKS
        ================================================== */}

        <div
          className="
            mt-5
            flex flex-col
            gap-1
            border-t border-slate-100
            pt-4
          "
        >
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavigate(link.href)}
              className="
                flex min-h-10 w-full
                items-center
                rounded-lg
                px-2
                text-right text-xs
                font-medium
                text-slate-500
                transition-colors duration-200
                hover:bg-slate-50
                hover:text-emerald-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                motion-reduce:transition-none
              "
            >
              {link.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileMenuContent;
