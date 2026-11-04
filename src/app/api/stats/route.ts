import { NextResponse } from "next/server";

import { BACKEND_URL } from "@/lib/backendUser";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/** آمار عمومی صفحهٔ اصلی؛ فقط شمارش، بدون هیچ داده‌ی شخصی. هر ۵ دقیقه تازه می‌شود. */
export const revalidate = 300;

async function countRows(table: string): Promise<number | null> {
  const { count, error } = await getSupabaseAdmin()
    .from(table)
    .select("id", { count: "exact", head: true });

  return error ? null : (count ?? 0);
}

/** نوبت‌های پیش‌رو از بک‌اند؛ اگر در دسترس نبود null (در صفحه «—» نشان داده می‌شود) */
async function countUpcomingAppointments(): Promise<number | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/appointments/count`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    const data = (await response.json().catch(() => null)) as {
      count?: number;
    } | null;

    return response.ok && typeof data?.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const [doctors, consultants, clinics, appointments] = await Promise.all([
      countRows("doctors"),
      countRows("consultants"),
      countRows("clinics"),
      countUpcomingAppointments(),
    ]);

    return NextResponse.json({ doctors, consultants, clinics, appointments });
  } catch {
    return NextResponse.json(
      { doctors: null, consultants: null, clinics: null, appointments: null },
      { status: 503 },
    );
  }
}
