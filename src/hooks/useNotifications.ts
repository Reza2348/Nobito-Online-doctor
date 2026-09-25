"use client";

import { useEffect, useRef } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabaseClient";

import type { NotificationRow } from "@/Types/types";

import {
  deleteNotification as deleteNotificationRequest,
  fetchNotifications,
  markAllNotificationsAsRead as markAllNotificationsAsReadRequest,
  markNotificationAsRead as markNotificationAsReadRequest,
} from "@/service/notifications.service";

const NOTIFICATIONS_QUERY_KEY = ["notifications"];

export function useNotifications() {
  const queryClient = useQueryClient();

  // شناسه یکتا برای این instance از هوک؛ چون useNotifications هم‌زمان
  // در چند کامپوننت (UserMenu، AdminHeader، صفحه اعلان‌ها) استفاده می‌شود،
  // هر کدام باید کانال Realtime جدا و مستقل خودش را داشته باشد.
  const channelNameRef = useRef(
    `notifications-realtime-${Math.random().toString(36).slice(2)}`,
  );

  // =====================================================
  // دریافت اعلان‌ها
  // =====================================================

  const { data: notifications = [], isLoading: loading } = useQuery<
    NotificationRow[]
  >({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: fetchNotifications,
  });

  // =====================================================
  // آپدیت زنده (Realtime)
  // =====================================================
  // وقتی یک پزشک/مشاور/کلینیک جدید ثبت می‌شود، useProfessionalForm
  // یک ردیف جدید در جدول notifications می‌سازد. این subscription
  // باعث می‌شود بدون رفرش صفحه، لیست و badge آپدیت شوند.

  useEffect(() => {
    const channelName = channelNameRef.current;

    // اگر به هر دلیلی (مثلا React StrictMode در حالت توسعه) کانالی با
    // همین اسم از قبل مانده باشد، اول آن را پاک می‌کنیم تا تلاش برای
    // .on() روی کانال subscribe‌شده خطا ندهد.
    const stale = supabase
      .getChannels()
      .find((c) => c.topic === `realtime:${channelName}`);

    if (stale) {
      supabase.removeChannel(stale);
    }

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => {
          queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // =====================================================
  // خواندن یک اعلان
  // =====================================================

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsReadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  // =====================================================
  // خواندن همه اعلان‌ها
  // =====================================================

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsReadRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  // =====================================================
  // حذف اعلان
  // =====================================================

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotificationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });

  // =====================================================
  // تعداد اعلان‌های خوانده‌نشده
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return {
    notifications,
    loading,
    unreadCount,

    markAsRead: (id: number) => markAsReadMutation.mutate(id),
    markAllAsRead: () => markAllAsReadMutation.mutate(),
    deleteNotification: (id: number) => deleteNotificationMutation.mutate(id),
  };
}
