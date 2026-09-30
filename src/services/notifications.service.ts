import type { CreateNotificationInput, NotificationRow } from "@/Types/types";

import { supabase } from "@/lib/supabaseClient";

const NOTIFICATIONS_TABLE = "notifications";

/**
 * دریافت لیست اعلان‌ها
 */
export async function fetchNotifications(): Promise<NotificationRow[]> {
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("FETCH NOTIFICATIONS ERROR:", error);

    throw new Error(error.message || "خطا در دریافت اعلان‌ها");
  }

  return (data ?? []) as NotificationRow[];
}

/**
 * ساخت یک اعلان جدید
 *
 * این تابع توسط useProfessionalForm بعد از ثبت موفق
 * پزشک / مشاور / کلینیک صدا زده می‌شود.
 */
export async function createNotification(
  input: CreateNotificationInput,
): Promise<NotificationRow> {
  const { data, error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .insert({
      type: input.type,
      title: input.title,
      message: input.message,
      entity_id: input.entity_id ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);

    throw new Error(error.message || "خطا در ثبت اعلان");
  }

  return data as NotificationRow;
}

/**
 * علامت‌گذاری یک اعلان به عنوان خوانده‌شده
 */
export async function markNotificationAsRead(id: number): Promise<void> {
  const { error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .update({ is_read: true })
    .eq("id", id);

  if (error) {
    console.error("MARK NOTIFICATION AS READ ERROR:", error);

    throw new Error(error.message || "خطا در علامت‌گذاری اعلان");
  }
}

/**
 * علامت‌گذاری همه اعلان‌ها به عنوان خوانده‌شده
 */
export async function markAllNotificationsAsRead(): Promise<void> {
  const { error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .update({ is_read: true })
    .eq("is_read", false);

  if (error) {
    console.error("MARK ALL NOTIFICATIONS AS READ ERROR:", error);

    throw new Error(error.message || "خطا در علامت‌گذاری اعلان‌ها");
  }
}

/**
 * حذف یک اعلان
 */
export async function deleteNotification(id: number): Promise<void> {
  const { error } = await supabase
    .from(NOTIFICATIONS_TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE NOTIFICATION ERROR:", error);

    throw new Error(error.message || "خطا در حذف اعلان");
  }
}
