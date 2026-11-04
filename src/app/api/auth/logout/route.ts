import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * کوکی نشست ادمین/مشاور/محتوا را پاک می‌کند.
 */
export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );

  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
