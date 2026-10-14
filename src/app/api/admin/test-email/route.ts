import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import { otpEmailTemplate, sendEmail } from "@/lib/mailer";

/**
 * تست ارسال ایمیل (فقط ادمین).
 * POST /api/admin/test-email   body: { "to": "you@example.com" }
 * بدون دامنه تأییدشده در Resend، فقط به ایمیل حساب Resend می‌توان فرستاد.
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { ok: false, message: "دسترسی غیرمجاز" },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const to = String(body.to ?? "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json(
      { ok: false, message: "ایمیل نامعتبر است" },
      { status: 400 },
    );
  }

  const template = otpEmailTemplate("123456");
  const result = await sendEmail({ to, ...template });

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
