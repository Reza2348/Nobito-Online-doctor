"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

const Header: H.React.FC = () => {
  const pathname = H.usePathname();
  const { user, logout } = H.useAuthUser();

  if (pathname?.startsWith("/auth")) return null;

  return (
    <nav className="bg-white w-full">
      <div className="border-b border-gray-100">
        {/* استفاده از gap-1 در تبلت برای جلوگیری از بیرون زدگی */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-6 lg:px-8 h-16 md:h-20 gap-1 md:gap-4">
          {/* لوگو: در تبلت کوچک‌تر می‌شود */}
          <H.Link href="/" className="shrink-0">
            <H.Image
              src="Default.svg"
              alt="logo"
              width={120}
              height={120}
              className=" sm:w-[110px] md:w-[130px] lg:w-[150px]"
              priority
            />
          </H.Link>

          {/* بخش منوها: حالا در تبلت هم نمایش داده می‌شود اما با فونت فشرده‌تر */}
          <div className="flex-1 flex justify-center overflow-hidden">
            <div className="scale-90 md:scale-100 origin-center transition-transform">
              <H.DesktopNav />
            </div>
          </div>

          {/* بخش کاربری و موبایل منو */}
          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <H.UserMenu user={user} logout={logout} />

            {/* موبایل منو فقط در گوشی‌های کوچک (زیر 768px) نمایش داده شود */}
            <div className="md:hidden">
              <H.MobileMenu user={user} logout={logout} />
            </div>
          </div>
        </div>
      </div>

      {/* بخش ساب‌هدر */}
      <div className="hidden lg:block bg-[#C0C0C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <H.SubHeader />
        </div>
      </div>
    </nav>
  );
};

export default Header;
