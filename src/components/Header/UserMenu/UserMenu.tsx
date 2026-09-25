"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";
import type { SupabaseUser } from "@/Types/types";
import { useState, useRef, useEffect } from "react";

import { useNotifications } from "@/hooks/useNotifications";

type Props = {
  user: SupabaseUser | null;
  logout: () => void;
};

const UserMenu: H.React.FC<Props> = ({ user, logout }) => {
  const [open, setOpen] = useState(false);

  const { unreadCount } = useNotifications();

  const menuRef = useRef<HTMLDivElement>(null);

  const displayName =
    user?.user_metadata?.phone || user?.phone || user?.email || "کاربر";

  // =========================================
  // بستن منوی کاربر با کلیک بیرون
  // =========================================

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* =========================================
          🔔 اعلان‌ها
      ========================================== */}

      <div className="shrink-0">
        <H.Link
          href="/Notifications"
          aria-label="اعلان‌ها"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-transparent
            text-gray-400
            transition-colors
            hover:bg-gray-100
            hover:text-gray-600
          "
        >
          <H.FaRegBell
            className="
              hidden
              md:block
              text-2xl
              md:text-3xl
              cursor-pointer
              shrink-0
            "
          />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-bold
                text-white
                ring-2
                ring-white
              "
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </H.Link>
      </div>

      {/* =========================================
          👤 منوی کاربر
      ========================================== */}

      <div ref={menuRef} className="relative min-w-0">
        {!user?.id ? (
          <H.Link
            href="/auth/signup"
            className="
              hidden
              rounded-xl
              bg-emerald-700
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition-colors
              hover:bg-emerald-800
              md:block
              md:px-6
            "
          >
            ورود / ثبت‌نام
          </H.Link>
        ) : (
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={open}
              className="
                block
                max-w-32
                truncate
                rounded-xl
                bg-red-50
                px-4
                py-2
                text-sm
                font-medium
                text-red-600
                transition-colors
                hover:bg-red-100
                md:max-w-40
                md:px-6
              "
            >
              {displayName}
            </button>

            {open && (
              <div
                role="menu"
                className="
                  absolute
                  right-0
                  z-50
                  mt-2
                  w-48
                  max-w-[85vw]
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  shadow-lg
                "
              >
                <H.Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    px-4
                    py-2
                    text-gray-700
                    transition-colors
                    hover:bg-gray-100
                  "
                >
                  ورود به داشبورد
                </H.Link>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="
                    w-full
                    px-4
                    py-2
                    text-right
                    text-red-600
                    transition-colors
                    hover:bg-red-50
                  "
                >
                  خروج
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
