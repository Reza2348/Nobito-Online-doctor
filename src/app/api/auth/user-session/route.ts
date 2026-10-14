import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createSupabaseRouteClient } from "@/lib/Server";
import { USER_SESSION_COOKIE, verifyUserSession } from "@/lib/userSession";

const MAX_AGE = 60 * 60 * 24 * 7;

/**
 * GET /api/auth/user-session
 * وضعیت نشست: نشست محلی (کوکی) یا نشست Supabase.
 */
export async function GET() {
  const cookieStore = await cookies();

  const local = await verifyUserSession(
    cookieStore.get(USER_SESSION_COOKIE)?.value,
  );

  if (local) {
    return NextResponse.json(
      { authenticated: true, source: "local", user: local },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const response = NextResponse.next();
    const supabase = createSupabaseRouteClient(cookieStore, response);
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      return NextResponse.json(
        {
          authenticated: true,
          source: "supabase",
          user: {
            id: data.user.id,
            email: data.user.email ?? "",
            phone: data.user.phone ?? "",
            username:
              typeof data.user.user_metadata?.username === "string"
                ? data.user.user_metadata.username
                : (data.user.email?.split("@")[0] ?? ""),
          },
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  } catch {
    // Supabase در دسترس نیست؛ نشست محلی هم نبود
  }

  return NextResponse.json(
    { authenticated: false, source: null, user: null },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/**
 * POST /api/auth/user-session  { sessionToken }
 * توکن بک‌اند را تأیید و به کوکی httpOnly تبدیل می‌کند.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.sessionToken === "string" ? body.sessionToken : "";

  const user = await verifyUserSession(token);

  if (!user) {
    return NextResponse.json(
      { error: "توکن نشست نامعتبر است یا USER_SESSION_SECRET یکسان نیست." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, user });

  response.cookies.set(USER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return response;
}

/** DELETE: خروج از نشست محلی */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(USER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
