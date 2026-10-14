"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  HistoryIconType,
  HistoryItem,
  HistoryStatus,
  MedicalRecord,
  MedicalRecordType,
  Prescription,
} from "@/Types/types";

/**
 * داده‌های خصوصی کاربر (نوبت، پرونده پزشکی، پیام، بازخورد).
 * این داده‌ها عمداً در localStorage ذخیره نمی‌شوند.
 */

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/dashboard/me/${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...(init?.method && init.method !== "GET"
        ? { "Content-Type": "application/json" }
        : {}),
      ...init?.headers,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(data?.message || "خطا در ارتباط با سرور.", res.status);
  }

  return data as T;
}

// خطای ۴xx تکرار نمی‌شود؛ خطای شبکه/سرور حداکثر دو بار
const retry = (count: number, error: unknown) =>
  !(error instanceof ApiError && error.status < 500) && count < 2;

const TZ = "Asia/Tehran";

const dateTimeFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const shortDateFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const longDateFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
});

const dayMonthFmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TZ,
  day: "numeric",
  month: "long",
});

// ---------------- نوبت‌ها ← تاریخچه ----------------

type AppointmentDto = {
  id: string;
  doctorName: string;
  specialty: string;
  avatar: string;
  iconType: HistoryIconType;
  type: string;
  note: string;
  scheduledAt: string;
  status: HistoryStatus;
};

const FALLBACK_AVATAR = "/doctor-1.jpg.jfif";

export function useAppointments(status: HistoryStatus) {
  return useQuery({
    queryKey: ["me", "appointments", status],
    queryFn: () =>
      api<{ items: AppointmentDto[] }>(`appointments?status=${status}`),
    select: (data): HistoryItem[] =>
      data.items.map((a) => ({
        id: a.id,
        doctorName: a.doctorName,
        specialty: a.specialty,
        avatar: a.avatar || FALLBACK_AVATAR,
        iconType: a.iconType,
        type: a.type,
        note: a.note,
        date: dateTimeFmt
          .format(new Date(a.scheduledAt))
          .replace("،", " - ساعت"),
        status: a.status,
      })),
    staleTime: 30_000,
    retry,
  });
}

// ---------------- پرونده پزشکی ----------------

type RecordDto = {
  id: string;
  type: MedicalRecordType;
  title: string;
  doctorName: string;
  specialty: string;
  recordDate: string;
  description: string;
  prescriptionId?: string;
};

export function useMedicalRecords(type: MedicalRecordType | "all") {
  return useQuery({
    queryKey: ["me", "medical-records", type],
    queryFn: () =>
      api<{ items: RecordDto[] }>(
        type === "all" ? "medical-records" : `medical-records?type=${type}`,
      ),
    select: (data): MedicalRecord[] =>
      data.items.map((r) => {
        const d = new Date(r.recordDate);

        return {
          id: r.id,
          type: r.type,
          title: r.title,
          doctorName: r.doctorName,
          specialty: r.specialty,
          date: `${longDateFmt.format(d)} | ${shortDateFmt.format(d)}`,
          description: r.description,
          prescriptionId: r.prescriptionId,
        };
      }),
    staleTime: 30_000,
    retry,
  });
}

/** نسخه‌ی کامل (برای چاپ/دانلود PDF)؛ فقط نسخه‌ی خود کاربر برمی‌گردد */
export async function fetchPrescription(id: string): Promise<Prescription> {
  const data = await api<{ prescription: Prescription }>(
    `prescriptions/${encodeURIComponent(id)}`,
  );

  return data.prescription;
}

// ---------------- پیام‌ها ----------------

export type MessageKind = "announcement" | "notify" | "doctor";

export type UserMessageItem = {
  id: string;
  kind: MessageKind;
  title: string;
  body: string;
  isRead: boolean;
  date: string;
};

type MessageDto = Omit<UserMessageItem, "date"> & { createdAt: string };

const MESSAGES_KEY = ["me", "messages"] as const;

export function useMessages() {
  return useQuery({
    queryKey: MESSAGES_KEY,
    queryFn: () =>
      api<{ items: MessageDto[]; unreadCount: number }>("messages"),
    select: (data) => ({
      unreadCount: data.unreadCount,
      items: data.items.map(
        (m): UserMessageItem => ({
          id: m.id,
          kind: m.kind,
          title: m.title,
          body: m.body,
          isRead: m.isRead,
          date: dayMonthFmt.format(new Date(m.createdAt)),
        }),
      ),
    }),
    staleTime: 30_000,
    retry,
  });
}

export function useMarkMessagesRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) =>
      api(
        id ? `messages/${encodeURIComponent(id)}/read` : "messages/read-all",
        {
          method: "PATCH",
          body: "{}",
        },
      ),
    retry: false,
    onSettled: () => queryClient.invalidateQueries({ queryKey: MESSAGES_KEY }),
  });
}

// ---------------- بازخورد ----------------

export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (input: { rating: number; message: string }) =>
      api("feedback", { method: "POST", body: JSON.stringify(input) }),
    retry: false, // نوشتن هیچ‌وقت خودکار تکرار نمی‌شود
  });
}
