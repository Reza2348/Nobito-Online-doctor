"use client";

import { FaBell, FaCheckDouble } from "react-icons/fa6";

type NotificationHeaderProps = {
  unreadCount: number;
  onMarkAllAsRead: () => void;
};

export function NotificationHeader({
  unreadCount,
  onMarkAllAsRead,
}: NotificationHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* سمت راست: آیکون و عنوان */}
      <div className="flex items-center gap-3">
        {/* آیکون اعلان */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
          <FaBell className="text-xl" />

          {/* تعداد اعلان‌های خوانده نشده */}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        {/* عنوان */}
        <div>
          <h1 className="text-xl font-bold text-gray-800">اعلان‌ها</h1>

          <p className="mt-1 text-sm text-gray-500">
            {unreadCount > 0
              ? `${unreadCount} اعلان خوانده نشده دارید`
              : "همه اعلان‌ها خوانده شده‌اند"}
          </p>
        </div>
      </div>

      {/* خواندن همه */}
      {unreadCount > 0 && (
        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-600 transition hover:bg-purple-100"
        >
          <FaCheckDouble />
          <span>خواندن همه</span>
        </button>
      )}
    </div>
  );
}
