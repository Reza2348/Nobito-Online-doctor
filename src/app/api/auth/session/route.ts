import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

/**
 * توکنی که بک‌اند ساخته را می‌گیرد، با JWT_SECRET فرانت تأیید می‌کند
 * و در کوکی httpOnly روی دامنه فرانت می‌گذارد.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = String(body.token ?? "");
    const rememberMe = Boolean(body.rememberMe);

    const payload = token ? await verifyToken(token) : null;

    if (!payload) {
      return NextResponse.json(
        { message: "توکن نامعتبر است." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
