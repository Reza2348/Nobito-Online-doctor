"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

const Header: H.React.FC = () => {
  const pathname = H.usePathname();
  const { user, logout } = H.useAuthUser();

  return (
    <nav className="bg-white w-full relative z-50">
      <div className="border-b border-[#C0C0C0]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-6 lg:px-8 h-16 md:h-20 gap-1 md:gap-4">
          {/* LOGO */}
          <H.Link href="/" className="shrink-0">
            <H.Image
              src="Default.svg"
              alt="logo"
              width={120}
              height={120}
              className="sm:w-27.5 md:w-32.5 lg:w-37.5"
              priority
            />
          </H.Link>

          {/* NAV CENTER */}
          <div className="flex-1 flex justify-center overflow-visible">
            <H.DesktopNav />
          </div>

          {/* USER + MOBILE */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <H.UserMenu user={user} logout={logout} />

            <div className="lg:hidden">
              <H.MobileMenu user={user} logout={logout} />
            </div>
          </div>
        </div>
      </div>

      {/* SUB HEADER */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <H.SubHeader />
        </div>
      </div>
    </nav>
  );
};

export default Header;
