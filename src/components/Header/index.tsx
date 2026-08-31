"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";
import { useEffect, useState } from "react";

const Header: H.React.FC = () => {
  const { user, logout } = H.useUser();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl">
      <nav className="border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,.04)]">
        <div className="mx-auto flex h-18 md:h-22 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <H.Link
            href="/"
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <H.Image
              src="/Default.svg"
              alt="logo"
              width={140}
              height={140}
              priority
              className="h-auto w-24 sm:w-28 md:w-32 lg:w-36"
            />
          </H.Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="rounded-full bg-gray-50 px-6 py-2 border border-gray-100">
              <H.DesktopNav />
            </div>
          </div>

          {/* USER AREA */}
          <div className="flex items-center gap-2">
            {/* DESKTOP */}
            {/* =========================
                ⚠️ رپر مشترک (bg-emerald-50 + rounded-full) که باعث میشد
                زنگوله و دکمه‌ی ورود توی یک قاب دیده بشن، حذف شد.
                حالا این div فقط یک container خنثی (بدون پس‌زمینه) است.
            ========================== */}
            <div className="hidden sm:block">
              {mounted && <H.UserMenu user={user} logout={logout} />}
            </div>

            {/* MOBILE */}
            <div className="lg:hidden rounded-full bg-gray-50 p-1">
              {mounted && <H.MobileMenu user={user} logout={logout} />}
            </div>
          </div>
        </div>
      </nav>

      {/* SUB HEADER */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 px-5 py-2 border border-emerald-100">
            <H.SubHeader />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
