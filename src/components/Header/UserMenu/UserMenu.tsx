"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type SupabaseUser = {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: {
    phone?: string;
    [key: string]: any;
  };
};

type Props = {
  user: SupabaseUser | null;
  logout: () => void;
};

const UserMenu: H.React.FC<Props> = ({ user, logout }) => {
  const displayName =
    user?.user_metadata?.phone || user?.phone || user?.email || "کاربر";

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 relative">
      {/* Notification Icon */}
      <H.FaRegBell className="hidden md:block text-gray-400 text-2xl md:text-3xl cursor-pointer" />

      {!user?.id ? (
        <H.Link
          href="/auth/signup"
          className="hidden md:block bg-emerald-700 hover:bg-emerald-800 transition-colors text-white px-4 py-2 md:px-6 md:py-2 rounded-xl text-sm font-medium whitespace-nowrap"
        >
          ورود / ثبت‌نام
        </H.Link>
      ) : (
        <div className="relative group">
          {/* User Button */}
          <button className="hidden md:block bg-red-50 hover:bg-red-100 transition-colors text-red-600 px-4 py-2 md:px-6 md:py-2 rounded-xl text-sm font-medium">
            {displayName}
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
            <H.Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
            >
              ورود به داشبورد
            </H.Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl"
            >
              خروج
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
