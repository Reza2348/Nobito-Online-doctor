import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { BACKEND_URL } from "@/lib/backendUser";
import { getAdmin } from "@/lib/getAdmin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

async function countRows(table: string): Promise<number | null> {
  const { count, error } = await getSupabaseAdmin()
    .from(table)
    .select("id", { count: "exact", head: true });

  return error ? null : (count ?? 0);
}

/** تعداد نوبت‌های فعال از بک‌اند (MongoDB)؛ null یعنی در دسترس نبود */
async function countBackendAppointments(
  token: string | undefined,
): Promise<number | null> {
  if (!token) return null;

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/appointments/count`, {
      headers: { Authorization: `Bearer ${token}` },
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

/** آمار واقعی داشبورد ادمین (فقط ادمین). مقدار null یعنی دریافت ناموفق. */
export async function GET() {
  const admin = await getAdmin();

  if (!admin) {
    return NextResponse.json(
      { error: "دسترسی غیرمجاز" },
      { status: 401, headers: NO_STORE },
    );
  }

  const supabase = getSupabaseAdmin();

  const [doctors, consultants, clinics, appointments, usersResult] =
    await Promise.all([
      countRows("doctors"),
      countRows("consultants"),
      countRows("clinics"),
      countBackendAppointments((await cookies()).get("auth-token")?.value),
      supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

  return NextResponse.json(
    {
      users: usersResult.error ? null : usersResult.data.users.length,
      doctors,
      consultants,
      clinics,
      appointments,
      updatedAt: new Date().toISOString(),
    },
    { headers: NO_STORE },
  );
}
