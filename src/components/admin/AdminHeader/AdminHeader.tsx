"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaUserShield,
  FaBell,
  FaChevronDown,
  FaRightFromBracket,
  FaGear,
  FaUser,
} from "react-icons/fa6";

interface AdminHeaderProps {
  onMenuClick: () => void;
  userName?: string;
  userRole?: string;
  isOnline?: boolean;
  notificationCount?: number;
  breadcrumb?: string[];
  onLogout?: () => void;
}

export default function AdminHeader({
  onMenuClick,
  userName = "مدیر سیستم",
  userRole = "Admin",
  isOnline = true,
  notificationCount = 0,
  breadcrumb = ["داشبورد"],
  onLogout,
}: AdminHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="flex h-20 items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left cluster (RTL: راست) — منوی موبایل + بردکرامب */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          aria-expanded={false}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition hover:bg-gray-200 active:scale-95 lg:hidden"
        >
          <FaBars className="text-lg" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-black text-gray-800">
              پنل مدیریت
            </h1>
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              {userRole}
            </span>
          </div>

          <nav aria-label="مسیر صفحه" className="mt-1">
            <ol className="flex items-center gap-1.5 text-sm text-gray-500">
              {breadcrumb.map((item, i) => (
                <li key={item} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-gray-300">/</span>}
                  <span
                    className={
                      i === breadcrumb.length - 1
                        ? "font-medium text-gray-700"
                        : ""
                    }
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Right cluster (RTL: چپ) — نوتیفیکیشن + کاربر */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label={
            notificationCount > 0
              ? `${notificationCount} اعلان جدید`
              : "اعلان‌ها"
          }
          className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 active:scale-95"
        >
          <FaBell className="text-lg" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flexh-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 rounded-xl py-1.5 pl-2 pr-1.5 transition hover:bg-gray-100 active:scale-[0.98]"
          >
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
                <FaUserShield className="text-base" />
              </div>
              <span
                className={
                  "absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white " +
                  (isOnline ? "bg-emerald-500" : "bg-gray-400")
                }
                aria-hidden="true"
              />
            </div>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-gray-800">
                {userName}
              </p>
              <p className="text-xs leading-tight text-gray-400">
                {isOnline ? "آنلاین" : "آفلاین"}
              </p>
            </div>

            <FaChevronDown
              className={
                "hidden text-xs text-gray-400 transition-transform duration-200 sm:block " +
                (menuOpen ? "rotate-180" : "")
              }
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl shadow-black/5"
            >
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-bold text-gray-800">{userName}</p>
                <p className="text-xs text-gray-400">{userRole}</p>
              </div>

              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <FaUser className="text-gray-400" />
                پروفایل من
              </button>

              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <FaGear className="text-gray-400" />
                تنظیمات
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                type="button"
                role="menuitem"
                onClick={onLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <FaRightFromBracket />
                خروج از حساب
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
