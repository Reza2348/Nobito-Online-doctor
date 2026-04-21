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
    <div className="flex items-center gap-3 md:gap-4 relative whitespace-nowrap">
      {/* Notification */}
      <H.FaRegBell className="hidden md:block text-gray-400 text-2xl md:text-3xl cursor-pointer" />

      {/* وقتی لاگین نیست */}
      {!user?.id ? (
        <H.Link
          href="/auth/signup"
          className="bg-emerald-700 hover:bg-emerald-800 transition-colors text-white px-4 py-2 md:px-6 rounded-xl text-sm font-medium whitespace-nowrap"
        >
          ورود / ثبت‌نام
        </H.Link>
      ) : (
        <div className="relative group">
          {/* Button */}
          <button
            className="
              bg-red-50 hover:bg-red-100
              transition-colors
              text-red-600
              px-4 py-2 md:px-6
              rounded-xl
              text-sm font-medium
              max-w-40
              truncate
            "
          >
            {displayName}
          </button>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 mt-2
              w-48
              bg-white
              border border-gray-200
              rounded-xl
              shadow-lg

              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible

              transition-all duration-200

              z-50
              overflow-hidden
            "
          >
            <H.Link
              href="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              ورود به داشبورد
            </H.Link>

            <button
              onClick={logout}
              className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50"
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
