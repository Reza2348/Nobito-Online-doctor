"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";
import type { SupabaseUser } from "@/Types/types";
import { useState, useRef, useEffect } from "react";

type Props = {
  user: SupabaseUser | null;
  logout: () => void;
};

const UserMenu: H.React.FC<Props> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName =
    user?.user_metadata?.phone || user?.phone || user?.email || "کاربر";

  // بستن منو با کلیک بیرون از آن
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-4 relative min-w-0">
      <H.FaRegBell className="hidden md:block text-gray-400 text-2xl md:text-3xl cursor-pointer shrink-0" />

      {!user?.id ? (
        <H.Link
          href="/auth/signup"
          className="bg-emerald-700 hover:bg-emerald-800 transition-colors text-white px-4 py-2 md:px-6 rounded-xl text-sm font-medium hidden md:block"
        >
          ورود / ثبت‌نام
        </H.Link>
      ) : (
        <div className="relative min-w-0 hidden lg:block" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
              bg-red-50 hover:bg-red-100
              transition-colors
              text-red-600
              px-4 py-2 md:px-6
              rounded-xl
              text-sm font-medium
              max-w-32 md:max-w-40
              truncate
              block
            "
          >
            {displayName}
          </button>

          {open && (
            <div
              className="
                absolute right-0 mt-2
                w-48
                max-w-[85vw]
                bg-white
                border border-gray-200
                rounded-xl
                shadow-lg
                z-50
                overflow-hidden
              "
            >
              <H.Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                ورود به داشبورد
              </H.Link>

              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full text-right px-4 py-2 text-red-600 hover:bg-red-50"
              >
                خروج
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
