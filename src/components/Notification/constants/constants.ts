import type { Notification } from "@/Types/types";

export const NOTIFICATIONS_KEY = "admin_notifications";

export const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "consultant",
    title: "اعلان جدید",
    message: "یک مشاور جدید در سامانه ثبت شد.",
    entity_id: null,
    is_read: false,
    created_at: new Date().toISOString(),
    time: "چند دقیقه پیش",
    read: false,
  },
  {
    id: 2,
    type: "system",
    title: "درخواست جدید",
    message: "یک درخواست مشاوره جدید دریافت شده است.",
    entity_id: null,
    is_read: false,
    created_at: new Date().toISOString(),
    time: "۱ ساعت پیش",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "به‌روزرسانی سیستم",
    message: "اطلاعات سامانه با موفقیت به‌روزرسانی شد.",
    entity_id: null,
    is_read: true,
    created_at: new Date().toISOString(),
    time: "امروز",
    read: true,
  },
];
