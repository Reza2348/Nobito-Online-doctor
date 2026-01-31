"use client";

import * as H from "../HeaderImports/HeaderImports";

const MenuItem: H.React.FC<{
  icon: H.React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  isLogout?: boolean;
}> = ({ icon, label, onClick, href, isLogout = false }) => {
  const commonClasses =
    "flex items-center gap-3 py-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer transition";
  const textClasses = isLogout
    ? "text-gray-700 hover:text-red-500"
    : "text-gray-700 hover:text-blue-600";

  if (href) {
    return (
      <H.Link
        href={href}
        className={`${commonClasses} ${textClasses}`}
        onClick={onClick}
      >
        <div className="w-6 flex items-center justify-center">{icon}</div>
        <span className="font-medium">{label}</span>
      </H.Link>
    );
  }

  return (
    <div onClick={onClick} className={`${commonClasses} ${textClasses}`}>
      <div className="w-6 flex items-center justify-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

const Header: H.React.FC = () => {
  const pathname = H.usePathname();
  const router = H.useRouter();

  const [isMenuOpen, setIsMenuOpen] = H.useState(false);
  const [isSearchOpen, setIsSearchOpen] = H.useState(false);
  const [activeLink, setActiveLink] = H.useState("");
  const [user, setUser] = H.useState<H.User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = H.useState(false);
  const [hasMounted, setHasMounted] = H.useState(false);

  const userMenuRef = H.useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = H.useRef<HTMLDivElement | null>(null);
  const searchBarRef = H.useRef<HTMLDivElement | null>(null);

  const NAV_LINKS: H.NavLink[] = [
    { href: "/", label: "نوبت دهی مطب" },
    { href: "/Services", label: "خدمات" },
    { href: "/Online consultation", label: "مشاوره آنلاین" },
    { href: "/Health Magazine", label: "مجله سلامت" },
    { href: "/Charity", label: "نیکوکاری" },
  ];

  // Fetch user session
  H.useEffect(() => {
    setHasMounted(true);

    const fetchUser = async () => {
      const { data } = await H.supabase.auth.getSession();
      if (data.session?.user) {
        const username =
          (data.session.user.user_metadata?.username as string) ||
          data.session.user.email?.split("@")[0] ||
          "US";
        setUser({
          id: data.session.user.id,
          username,
          email: data.session.user.email || "",
        });
      } else setUser(null);
    };

    fetchUser();

    const { data: listener } = H.supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const username =
            (session.user.user_metadata?.username as string) ||
            session.user.email?.split("@")[0] ||
            "US";
          setUser({
            id: session.user.id,
            username,
            email: session.user.email || "",
          });
        } else setUser(null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Set active link
  H.useEffect(() => {
    if (!hasMounted) return;
    const currentPath = pathname || "/";
    let foundActiveLink = "";
    const sortedLinks = [...NAV_LINKS].sort(
      (a, b) => b.href.length - a.href.length,
    );
    for (const link of sortedLinks) {
      if (
        currentPath.startsWith(link.href) &&
        (link.href !== "/" || currentPath === "/")
      ) {
        foundActiveLink = link.href;
        break;
      }
    }
    setActiveLink(foundActiveLink);
  }, [pathname, NAV_LINKS, hasMounted]);

  // Close menus on path change
  H.useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Close menus on click outside
  H.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      )
        setIsUserMenuOpen(false);

      const isMobileMenuClick =
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node);
      const isHamburgerIconClick = (event.target as HTMLElement).closest(
        ".md\\:hidden > button",
      );
      if (isMenuOpen && isMobileMenuClick && !isHamburgerIconClick)
        setIsMenuOpen(false);

      const isSearchBarClick =
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node);
      const isSearchIconClick = (event.target as HTMLElement).closest(
        ".md\\:hidden .text-gray-700",
      );
      if (isSearchOpen && isSearchBarClick && !isSearchIconClick)
        setIsSearchOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSearchOpen]);

  const handleLogout = async () => {
    await H.supabase.auth.signOut();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsSearchOpen(false);
  };

  if (pathname?.startsWith("/auth")) return null;

  if (!hasMounted) {
    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16 md:h-20">
          <H.Link href="/">
            <H.Image
              src="Default.svg"
              alt="logo"
              width={25}
              height={25}
              priority
            />
          </H.Link>

          <div className="hidden md:flex grow justify-center gap-10 lg:ml-26.5"></div>

          <div className="md:hidden flex items-center gap-3">
            <H.HiSearch size={24} className="text-gray-700" />
            <H.HiMenu size={26} className="text-gray-700" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        <H.Link href="/">
          <H.Image
            src="Default.svg"
            alt="logo"
            width={150}
            height={150}
            priority
          />
        </H.Link>
        <div className="hidden md:flex grow justify-center gap-6 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <H.Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium transition-colors ${
                activeLink === link.href ? "active" : "link"
              }`}
            >
              {link.label}
            </H.Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 mt-2 md:mt-0">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <div
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full cursor-pointer select-none flex items-center justify-center text-base"
              >
                {user.username?.substring(0, 2).toUpperCase() ||
                  user.email.substring(0, 2).toUpperCase()}
              </div>

              {isUserMenuOpen && (
                <div className="absolute mt-2 min-w-64 max-w-sm bg-white shadow-xl rounded-xl p-3 z-50 overflow-auto max-h-[calc(100vh-5rem)] right-0">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
                      <H.CgProfile size={24} className="text-purple-600" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                        {user.username || user.email}
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="ml-auto text-gray-500 hover:text-gray-700 p-1 shrink-0"
                    >
                      <H.HiX size={20} />
                    </button>
                  </div>
                  <nav className="pt-3 flex flex-col gap-1">
                    <MenuItem
                      icon={<H.CgProfile size={20} />}
                      label="My Profile"
                      href="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <MenuItem
                      icon={<H.BiBriefcase size={20} />}
                      label="My Brands"
                      href="/brands"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <MenuItem
                      icon={<H.IoSettingsOutline size={20} />}
                      label="Settings"
                      href="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <MenuItem
                      icon={<H.TbLogout size={20} />}
                      label="Log Out"
                      onClick={handleLogout}
                      isLogout
                    />
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <H.FaRegBell className="text-3xl text-[#757575]" />
              <H.Link
                href="/auth/login"
                className="px-3 py-1.5 border bg-[#1F7168] text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition"
              >
                ورود/ثبت نام
              </H.Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center gap-3">
          <H.HiSearch
            size={24}
            className="text-gray-700 cursor-pointer"
            onClick={toggleSearch}
          />
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <H.HiX size={26} /> : <H.HiMenu size={26} />}
          </button>
        </div>
      </div>

      <div
        className="border  items-center justify-between px-4 hidden sm:flex"
        dir="ltr"
      >
        {/* سمت راست: متن‌ها */}
        <div className="flex items-center gap-6 text-[#757575]">
          <p className="flex items-center gap-1 ml-16">
            انتخاب آدرس + <H.FiMapPin className="text-lg" />
          </p>
          <p>سوالات متداول</p>
          <p>تماس با ما</p>
          <p>درباره ما</p>
        </div>

        {/* سمت چپ: آیکن‌ها */}
        <div className="flex items-center gap-4 mr-32 text-3xl text-[#757575]">
          <H.CiLinkedin className="text-xl cursor-pointer" />
          <H.PiYoutubeLogo className="text-xl cursor-pointer" />
          <H.TbSend className="text-xl cursor-pointer" />
          <H.PiInstagramLogoLight className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* Mobile Search */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Slide Menu */}
      <div
        className={`
    fixed top-0 right-0 h-full w-80 max-w-[85%]
    bg-white z-50 md:hidden
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <span className="font-semibold text-emerald-700">منو</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <H.HiX size={26} className="text-black" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <H.Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-lg text-gray-700 hover:bg-emerald-50"
            >
              {link.label}
              <H.HiArrowLeft className="text-gray-400" />
            </H.Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="p-4 mt-auto">
          {!user ? (
            <H.Link
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center bg-emerald-600 text-white py-3 rounded-xl"
            >
              ورود | ثبت‌نام
            </H.Link>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-3 rounded-xl"
            >
              خروج
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
