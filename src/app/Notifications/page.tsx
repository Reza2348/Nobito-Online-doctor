"use client";

import { FaBell, FaCheckDouble, FaTrash } from "react-icons/fa6";

import { useNotifications } from "@/hooks/useNotifications";

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "همین الان";
  if (diffMinutes < 60) return `${diffMinutes} دقیقه پیش`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} ساعت پیش`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} روز پیش`;
}

export default function NotificationsPage() {
  const {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  if (loading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-gray-50"
      >
        <p className="text-sm text-gray-500">در حال دریافت اعلان‌ها...</p>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <FaBell className="text-xl" />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
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
            </div>

            <div>
              <h1 className="text-2xl font-black text-gray-800">اعلان‌ها</h1>

              <p className="mt-1 text-sm text-gray-500">
                {unreadCount > 0
                  ? `${unreadCount} اعلان خوانده نشده دارید`
                  : "همه اعلان‌ها خوانده شده‌اند"}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-purple-50
                px-4
                py-2.5
                text-sm
                font-semibold
                text-purple-600
                transition
                hover:bg-purple-100
              "
            >
              <FaCheckDouble />
              <span>خواندن همه</span>
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-gray-200
              bg-white
              py-16
              text-center
              shadow-sm
            "
          >
            <FaBell className="mx-auto mb-4 text-4xl text-gray-300" />

            <h2 className="font-bold text-gray-600">اعلانی وجود ندارد</h2>

            <p className="mt-2 text-sm text-gray-400">
              در حال حاضر هیچ اعلانی برای شما ثبت نشده است.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  relative
                  rounded-2xl
                  border
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  ${
                    notification.is_read
                      ? "border-gray-100"
                      : "border-red-100 bg-red-50/30"
                  }
                `}
              >
                {!notification.is_read && (
                  <span
                    className="
                      absolute
                      right-3
                      top-3
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-red-500
                    "
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-4">
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          notification.is_read
                            ? "bg-gray-100 text-gray-400"
                            : "bg-red-100 text-red-500"
                        }
                      `}
                    >
                      <FaBell />
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`
                          font-bold
                          ${
                            notification.is_read
                              ? "text-gray-700"
                              : "text-gray-900"
                          }
                        `}
                      >
                        {notification.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        {formatRelativeTime(notification.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {!notification.is_read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notification.id)}
                        title="علامت‌گذاری به عنوان خوانده شده"
                        className="
                          rounded-xl
                          bg-green-50
                          p-2.5
                          text-green-600
                          transition
                          hover:bg-green-100
                        "
                      >
                        <FaCheckDouble />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteNotification(notification.id)}
                      title="حذف اعلان"
                      className="
                        rounded-xl
                        bg-red-50
                        p-2.5
                        text-red-500
                        transition
                        hover:bg-red-100
                      "
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
