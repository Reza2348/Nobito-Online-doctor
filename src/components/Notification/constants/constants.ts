import type { Notification } from "@/Types/types";

export const NOTIFICATIONS_KEY = "admin_notifications";

export const DEFAULT_NOTIFICATIONS: Notification[] = [
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
