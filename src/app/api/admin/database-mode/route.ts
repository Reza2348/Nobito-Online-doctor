import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getAdmin } from "@/lib/getAdmin";

const BACKEND_URL = (
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

const NO_STORE = { "Cache-Control": "no-store" };

/** مطابق نوع FailoverAction در Types/login-failover.types.ts */
function isValidAction(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;

  const { type, value } = body as { type?: unknown; value?: unknown };

  if (type === "database") return value === "supabase" || value === "mongo";

  return (type === "supabase" || type === "automatic") && typeof value === "boolean";
}

/** فقط ادمین؛ توکن او برای بک‌اند هم Bearer می‌شود. */
async function adminToken(): Promise<string | null> {
  const admin = await getAdmin();

  if (!admin) return null;

  return (await cookies()).get("auth-token")?.value ?? null;
}

function unauthorized() {
  return NextResponse.json(
    { message: "دسترسی غیرمجاز" },
    { status: 401, headers: NO_STORE },
  );
}

export async function GET() {
  const token = await adminToken();

  if (!token) return unauthorized();

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/database-mode`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
        ...NO_STORE,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "اتصال به بک‌اند برقرار نشد." },
      { status: 502, headers: NO_STORE },
    );
  }
}

export async function POST(request: NextRequest) {
  const token = await adminToken();

  if (!token) return unauthorized();

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { message: "درخواست نامعتبر است." },
      { status: 415, headers: NO_STORE },
    );
  }

  const body: unknown = await request.json().catch(() => null);

  if (!isValidAction(body)) {
    return NextResponse.json(
      { message: "درخواست تغییر دیتابیس نامعتبر است." },
      { status: 400, headers: NO_STORE },
    );
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/database-mode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
        ...NO_STORE,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "اتصال به بک‌اند برقرار نشد." },
      { status: 502, headers: NO_STORE },
    );
  }
}
