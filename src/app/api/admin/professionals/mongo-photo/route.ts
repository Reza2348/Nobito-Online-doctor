import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export const maxDuration = 60;

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

// Vercel درخواست بزرگ‌تر از ~4.5MB را رد می‌کند و base64 حدود ۳۳٪ بزرگ‌تر می‌شود
const MAX_FILE_SIZE = 3 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * آپلود عکس در MongoDB از طریق بک‌اند.
 * فقط ادمین؛ کوکی httpOnly روی سرور خوانده می‌شود.
 */
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    const user = token ? await verifyToken(token) : null;

    if (!token || !user || user.role !== "admin") {
      return NextResponse.json(
        { ok: false, message: "دسترسی غیرمجاز" },
        { status: 401 },
      );
    }

    const form = await request.formData();

    const file = form.get("file");
    const type = String(form.get("type") ?? "");
    const professionalId = String(form.get("professionalId") ?? "");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "فایل عکس ارسال نشده است" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, message: "فرمت عکس مجاز نیست" },
        { status: 400 },
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, message: "حجم عکس باید کمتر از ۳ مگابایت باشد" },
        { status: 400 },
      );
    }

    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    const response = await fetch(`${BACKEND_URL}/api/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: base64,
        content_type: file.type,
        type,
        supabase_id: professionalId,
      }),
      signal: AbortSignal.timeout(55000),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result?.id) {
      return NextResponse.json(
        { ok: false, message: result?.message ?? "ذخیره عکس انجام نشد" },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.json({
      ok: true,
      url: `${BACKEND_URL}/api/photos/${result.id}`,
    });
  } catch (error) {
    console.error("MONGO PHOTO PROXY ERROR:", error);

    return NextResponse.json(
      { ok: false, message: "اتصال به بک‌اند برقرار نشد" },
      { status: 502 },
    );
  }
}
