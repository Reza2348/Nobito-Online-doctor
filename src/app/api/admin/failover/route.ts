import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/getAdmin";

const BACKEND = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

async function adminToken(): Promise<string | null> {
  const admin = await getAdmin();

  if (!admin) return null;

  return (await cookies()).get("auth-token")?.value ?? null;
}

const noStore = { "Cache-Control": "no-store" };

/**
 * GET /api/admin/failover
 * وضعیت ورود (status) + وضعیت دیتابیس/Failover را یک‌جا برمی‌گرداند.
 * توکن ادمین از کوکی httpOnly خوانده و برای بک‌اند Bearer می‌شود
 * (JWT_SECRET فرانت و بک‌اند باید یکی باشد).
 */
export async function GET() {
  const token = await adminToken();

  if (!token) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  try {
    const [statusRes, failoverRes] = await Promise.all([
      fetch(`${BACKEND}/api/auth/status`, {
        method: "POST",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`${BACKEND}/api/admin/failover`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    const authStatus = await statusRes.json().catch(() => null);
    const failover = await failoverRes.json().catch(() => null);

    return NextResponse.json(
      {
        authStatus: authStatus?.data ?? authStatus,
        failover,
        failoverError:
          failoverRes.ok
            ? null
            : failoverRes.status === 401
              ? "بک‌اند توکن ادمین را نپذیرفت (JWT_SECRET فرانت و بک‌اند یکسان نیست)."
              : (failover?.message ?? "خطا در دریافت وضعیت Failover"),
      },
      { headers: noStore },
    );
  } catch {
    return NextResponse.json(
      { error: `ارتباط با بک‌اند برقرار نشد (${BACKEND}).` },
      { status: 502, headers: noStore },
    );
  }
}

/** POST /api/admin/failover  { action } */
export async function POST(request: NextRequest) {
  const token = await adminToken();

  if (!token) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  try {
    const res = await fetch(`${BACKEND}/api/admin/failover`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: String(body?.action ?? "") }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status, headers: noStore });
  } catch {
    return NextResponse.json(
      { error: `ارتباط با بک‌اند برقرار نشد (${BACKEND}).` },
      { status: 502 },
    );
  }
}
