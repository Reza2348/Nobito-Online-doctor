import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { BACKEND_URL } from "@/lib/backendUser";
import { TEHRAN_OFFSET_MINUTES } from "@/lib/appointmentSlots";
import { getAdmin } from "@/lib/getAdmin";

import type { AdminAppointment, AdminAppointmentStatus } from "@/Types/types";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

const PROVIDER_LABELS: Record<string, string> = {
  doctor: "پزشک",
  clinic: "کلینیک",
  consultant: "مشاور",
};

type BackendItem = {
  id: string;
  patient: string;
  doctorName: string;
  providerType: string;
  typeLabel: string;
  scheduledAt: string;
  status: "current" | "completed" | "cancelled";
};

function formatTehran(iso: string): { date: string; time: string } {
  const shifted = new Date(
    new Date(iso).getTime() + TEHRAN_OFFSET_MINUTES * 60_000,
  );

  return {
    date: new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(shifted),
    time: new Intl.DateTimeFormat("fa-IR", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(shifted),
  };
}

const STATUS_MAP: Record<BackendItem["status"], AdminAppointmentStatus> = {
  current: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

/** GET /api/admin/appointments — آخرین ۲۰۰ نوبت از بک‌اند (فقط ادمین) */
export async function GET() {
  const admin = await getAdmin();
  const token = admin ? (await cookies()).get("auth-token")?.value : null;

  if (!admin || !token) {
    return NextResponse.json(
      { error: "دسترسی غیرمجاز" },
      { status: 401, headers: NO_STORE },
    );
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });

    const data = (await response.json().catch(() => null)) as {
      items?: BackendItem[];
    } | null;

    if (!response.ok || !data?.items) {
      return NextResponse.json(
        { error: "دریافت نوبت‌ها ناموفق بود." },
        { status: response.ok ? 502 : response.status, headers: NO_STORE },
      );
    }

    const appointments: AdminAppointment[] = data.items.map((item) => {
      const { date, time } = formatTehran(item.scheduledAt);

      return {
        id: item.id,
        patient: item.patient || "کاربر با ورود موبایلی",
        doctor: item.doctorName || "—",
        specialty: [PROVIDER_LABELS[item.providerType], item.typeLabel]
          .filter(Boolean)
          .join(" · "),
        date,
        time,
        status: STATUS_MAP[item.status] ?? "pending",
      };
    });

    return NextResponse.json({ appointments }, { headers: NO_STORE });
  } catch {
    return NextResponse.json(
      { error: "ارتباط با بک‌اند برقرار نشد." },
      { status: 502, headers: NO_STORE },
    );
  }
}
