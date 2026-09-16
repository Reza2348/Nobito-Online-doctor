"use client";

import { FaBell, FaCheckDouble, FaTrash } from "react-icons/fa6";

import type { Notification } from "@/Types/types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const { id, title, message, is_read, created_at } = notification;

  return (
    <article
      className={`relative rounded-2xl border bg-white p-5 shadow-sm transition ${
        is_read ? "border-gray-100" : "border-red-100 bg-red-50/30"
      }`}
    >
      {!is_read && (
        <span
          aria-label="خوانده نشده"
          className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              is_read ? "bg-gray-100 text-gray-400" : "bg-red-100 text-red-500"
            }`}
          >
            <FaBell />
          </div>

          <div className="min-w-0">
            <h3
              className={`font-bold ${
                is_read ? "text-gray-700" : "text-gray-900"
              }`}
            >
              {title}
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">{message}</p>

            <p className="mt-2 text-xs text-gray-400">{created_at}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!is_read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(id)}
              title="علامت‌گذاری به عنوان خوانده شده"
              aria-label="علامت‌گذاری به عنوان خوانده شده"
              className="rounded-xl bg-green-50 p-2.5 text-green-600 transition hover:bg-green-100"
            >
              <FaCheckDouble />
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(id)}
            title="حذف اعلان"
            aria-label="حذف اعلان"
            className="rounded-xl bg-red-50 p-2.5 text-red-500 transition hover:bg-red-100"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}
