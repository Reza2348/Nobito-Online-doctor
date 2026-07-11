import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseRouteClient } from "@/lib/Server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;

// How long the user has to enter the code before the login attempt expires.
const OTP_SESSION_MAX_AGE_SECONDS = 60 * 10; // 10 minutes

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const identifier =
    typeof body?.identifier === "string" ? body.identifier.trim() : "";

  if (!identifier) {
    return NextResponse.json(
      { error: "لطفا ایمیل یا شماره موبایل خود را وارد کنید" },
      { status: 400 },
    );
  }

  const isEmail = emailRegex.test(identifier);
  const isPhone = phoneRegex.test(identifier);

  if (!isEmail && !isPhone) {
    return NextResponse.json(
      { error: "لطفا ایمیل یا شماره موبایل معتبر وارد کنید" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const response = NextResponse.json({
    ok: true,
    channel: isEmail ? "email" : "sms",
  });

  const supabase = createSupabaseRouteClient(cookieStore, response);

  const { error } = isEmail
    ? await supabase.auth.signInWithOtp({
        email: identifier.toLowerCase(),
        options: { shouldCreateUser: true },
      })
    : await supabase.auth.signInWithOtp({
        phone: identifier,
        options: { shouldCreateUser: true },
      });

  if (error) {
    // Don't leak the raw Supabase error message to the client.
    console.error("[send-otp] supabase error:", error.message);
    return NextResponse.json(
      { error: "ارسال کد تایید با خطا مواجه شد. لطفا دوباره تلاش کنید." },
      { status: 400 },
    );
  }

  // The identifier now lives only in an HttpOnly cookie on the server.
  // It's never written to localStorage and never appears in the URL,
  // so it can't be read or tampered with from client-side JS.
  response.cookies.set("otp_identifier", identifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: OTP_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
