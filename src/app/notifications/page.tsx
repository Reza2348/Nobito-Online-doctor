"use client";

import { useEffect, useState } from "react";
import { FaBell, FaCheckDouble, FaTrash, FaPlus } from "react-icons/fa6";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const NOTIFICATIONS_KEY = "admin_notifications";

const defaultNotifications: Notification[] = [
  {
    id: 1,
    title: "اعلان جدید",
    message: "یک مشاور جدید در سامانه ثبت شد.",
    time: "چند دقیقه پیش",
    read: false,
  },
  {
    id: 2,
    title: "درخواست جدید",
    message: "یک درخواست مشاوره جدید دریافت شده است.",
    time: "۱ ساعت پیش",
    read: false,
  },
  {
    id: 3,
    title: "به‌روزرسانی سیستم",
    message: "اطلاعات سامانه با موفقیت به‌روزرسانی شد.",
    time: "امروز",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // دریافت اعلان‌ها
  // =========================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY);

      if (saved) {
        const parsed: Notification[] = JSON.parse(saved);
        setNotifications(parsed);
      } else {
        setNotifications(defaultNotifications);

        localStorage.setItem(
          NOTIFICATIONS_KEY,
          JSON.stringify(defaultNotifications),
        );
      }
    } catch (error) {
      console.error("خطا در دریافت اعلان‌ها:", error);

      setNotifications(defaultNotifications);

      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(defaultNotifications),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================
  // ذخیره اعلان‌ها
  // =========================================

  const saveNotifications = (data: Notification[]) => {
    setNotifications(data);

    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(data));

    // اطلاع به UserMenu
    window.dispatchEvent(new Event("notifications-updated"));
  };

  // =========================================
  // تعداد اعلان‌های خوانده نشده
  // =========================================

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  // =========================================
  // تست: اضافه کردن اعلان جدید
  // =========================================

  const addTestNotification = () => {
    const newNotification: Notification = {
      id: Date.now(),
      title: "اعلان تستی جدید",
      message: "این یک اعلان تستی جدید است.",
      time: "همین الان",
      read: false,
    };

    const updated = [newNotification, ...notifications];

    saveNotifications(updated);
  };

  // =========================================
  // خواندن یک اعلان
  // =========================================

  const markAsRead = (id: number) => {
    const updated = notifications.map((notification) =>
      notification.id === id
        ? {
            ...notification,
            read: true,
          }
        : notification,
    );

    saveNotifications(updated);
  };

  // =========================================
  // خواندن همه اعلان‌ها
  // =========================================

  const markAllAsRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    saveNotifications(updated);
  };

  // =========================================
  // حذف اعلان
  // =========================================

  const deleteNotification = (id: number) => {
    const updated = notifications.filter(
      (notification) => notification.id !== id,
    );

    saveNotifications(updated);
  };

  // =========================================
  // Loading
  // =========================================

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
        {/* =========================================
            Header
        ========================================== */}

        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* آیکون اعلان */}

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <FaBell className="text-xl" />

              {/* تعداد اعلان‌های خوانده نشده */}

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

            {/* عنوان */}

            <div>
              <h1 className="text-2xl font-black text-gray-800">اعلان‌ها</h1>

              <p className="mt-1 text-sm text-gray-500">
                {unreadCount > 0
                  ? `${unreadCount} اعلان خوانده نشده دارید`
                  : "همه اعلان‌ها خوانده شده‌اند"}
              </p>
            </div>
          </div>

          {/* دکمه‌های بالای صفحه */}

          <div className="flex items-center gap-2">
            {/* تست اعلان جدید */}

            <button
              type="button"
              onClick={addTestNotification}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-blue-50
                px-4
                py-2.5
                text-sm
                font-semibold
                text-blue-600
                transition
                hover:bg-blue-100
              "
            >
              <FaPlus />
              <span>اعلان تستی</span>
            </button>

            {/* خواندن همه */}

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
        </div>

        {/* =========================================
            لیست اعلان‌ها
        ========================================== */}

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
                    notification.read
                      ? "border-gray-100"
                      : "border-red-100 bg-red-50/30"
                  }
                `}
              >
                {/* نقطه قرمز اعلان خوانده نشده */}

                {!notification.read && (
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
                  {/* محتوای اعلان */}

                  <div className="flex min-w-0 gap-4">
                    {/* آیکون */}

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
                          notification.read
                            ? "bg-gray-100 text-gray-400"
                            : "bg-red-100 text-red-500"
                        }
                      `}
                    >
                      <FaBell />
                    </div>

                    {/* متن */}

                    <div className="min-w-0">
                      <h3
                        className={`
                          font-bold
                          ${
                            notification.read
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
                        {notification.time}
                      </p>
                    </div>
                  </div>

                  {/* دکمه‌های عملیات */}

                  <div className="flex shrink-0 items-center gap-2">
                    {/* خواندن */}

                    {!notification.read && (
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

                    {/* حذف */}

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
