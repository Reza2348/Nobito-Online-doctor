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
    { href: "/", label: "خانه" },
    { href: "/explore", label: "کاوش" },
    { href: "/help", label: "راهنمایی و پشتیبانی " },
    { href: "/about", label: "درباره ما" },
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
              src="/Vector.svg"
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
    <nav className="top-0 left-0 right-0 bg-gradient-to-r from-[#fff7f0] to-[#fffdf9] z-50 border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        <H.Link href="/">
          <H.Image
            src="/Vector.svg"
            alt="logo"
            width={25}
            height={25}
            priority
          />
        </H.Link>
        <div className="hidden md:flex grow justify-center gap-6 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <H.Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative transition-all after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-red-500 after:transition-all ${
                activeLink === link.href
                  ? "text-red-500 after:w-full"
                  : "text-gray-700 hover:text-red-500 after:w-0 hover:after:w-full"
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
              <H.Link
                href="/auth/login"
                className="px-4 py-1.5 border border-red-500 text-red-500 rounded-full text-sm font-medium hover:bg-red-50 transition"
              >
                ورود
              </H.Link>
              <H.Link
                href="/auth/signup"
                className="px-4 py-1.5 border border-red-500 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-700 transition"
              >
                ثبت‌نام
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

      {/* Mobile Search */}
      {isSearchOpen && (
        <div
          ref={searchBarRef}
          className="md:hidden px-4 pb-3 pt-1 border-b border-gray-200 bg-white"
        >
          <div className="relative">
            <H.HiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b4bff] transition-all"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
            >
              <H.HiX size={20} />
            </button>
          </div>
        </div>
      )}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 bg-white z-40 p-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center h-16 border-b border-gray-200 mb-6">
            <H.Link href="/" onClick={() => setIsMenuOpen(false)}>
              <H.Image
                src="/Vector.svg"
                alt="logo"
                width={40}
                height={40}
                className="w-auto h-10"
                priority
              />
            </H.Link>
            <div className="flex items-center gap-4">
              <H.HiSearch
                size={24}
                className="text-gray-700 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              />
              <button onClick={() => setIsMenuOpen(false)}>
                <H.HiX size={26} />
              </button>
            </div>
          </div>
          <nav className="flex flex-col gap-1 border-b border-gray-200 pb-8">
            {NAV_LINKS.map((link) => (
              <H.Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`text-sm font-medium relative transition-all after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-red-500 after:transition-all ${
                  activeLink === link.href
                    ? "text-red-500 after:w-full"
                    : "text-gray-700 hover:text-red-500 after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
                <H.HiArrowRight size={20} className="text-gray-400" />
              </H.Link>
            ))}
          </nav>
          {!user ? (
            <div className="px-4 flex flex-col gap-3 mt-8">
              <H.Link
                href="/auth/login"
                className="px-4 py-3 bg-[#f2f0ff] text-[#5b4bff] rounded-xl text-base font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </H.Link>
              <H.Link
                href="/auth/signup"
                className="px-4 py-3 bg-[#5b4bff] text-white rounded-xl text-base font-medium text-center hover:bg-[#493ae0]"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </H.Link>
            </div>
          ) : (
            <div className="px-4 flex flex-col gap-3 mt-8">
              <H.Link
                href="/dashboard"
                className="px-4 py-3 bg-[#f2f0ff] text-[#5b4bff] rounded-xl text-base font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </H.Link>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-base font-medium text-center hover:bg-red-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
