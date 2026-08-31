import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseRouteClient } from "@/lib/Server";
import { createRateLimiter, getClientIp, getRetryAfter } from "@/lib/rateLimit";

// --------------------------------------------------
// POST /api/auth/verify-otp
// --------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // ------------------------------------------------
    // Rate Limit
    // ------------------------------------------------

    // Rate limiter را داخل درخواست می‌سازیم
    // تا هنگام build شدن Route، Redis initialize نشود.

    // حداکثر 10 تلاش از هر IP در 10 دقیقه
    const ipRateLimit = createRateLimiter("auth:verify-otp:ip", 10, "10 m");

    // حداکثر 5 تلاش برای هر ایمیل/شماره در 10 دقیقه
    const identifierRateLimit = createRateLimiter(
      "auth:verify-otp:identifier",
      5,
      "10 m",
    );

    // ------------------------------------------------
    // Parse body
    // ------------------------------------------------

    const body = await request.json().catch(() => null);

    const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

    // ------------------------------------------------
    // OTP cookie
    // ------------------------------------------------

    const cookieStore = await cookies();

    const identifier = cookieStore.get("otp_identifier")?.value;

    if (!identifier) {
      return NextResponse.json(
        {
          error: "نشست ورود منقضی شده. لطفاً دوباره تلاش کنید.",
        },
        { status: 400 },
      );
    }

    // ------------------------------------------------
    // Validate OTP
    // ------------------------------------------------

    if (!otp) {
      return NextResponse.json(
        {
          error: "لطفاً کد تایید را وارد کنید.",
        },
        { status: 400 },
      );
    }

    // ------------------------------------------------
    // Rate Limit - IP
    // ------------------------------------------------

    if (ipRateLimit) {
      const ip = getClientIp(request);

      const ipLimit = await ipRateLimit.limit(ip);

      if (!ipLimit.success) {
        return NextResponse.json(
          {
            error:
              "تعداد تلاش‌ها بیش از حد مجاز است. لطفا چند دقیقه بعد دوباره تلاش کنید.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": getRetryAfter(ipLimit.reset),
            },
          },
        );
      }
    }

    // ------------------------------------------------
    // Rate Limit - Identifier
    // ------------------------------------------------

    if (identifierRateLimit) {
      const identifierLimit = await identifierRateLimit.limit(identifier);

      if (!identifierLimit.success) {
        return NextResponse.json(
          {
            error:
              "تعداد تلاش‌های نامعتبر برای این حساب زیاد است. لطفا کد جدید درخواست کنید.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": getRetryAfter(identifierLimit.reset),
            },
          },
        );
      }
    }

    // ------------------------------------------------
    // Supabase
    // ------------------------------------------------

    /*
     * مهم:
     * همان response را به Supabase می‌دهیم
     * تا کوکی‌های Auth روی همان response ثبت شوند.
     */

    const response = NextResponse.json({
      ok: true,
    });

    const supabase = createSupabaseRouteClient(cookieStore, response);

    // ------------------------------------------------
    // Verify OTP
    // ------------------------------------------------

    const isEmail = identifier.includes("@");

    const { data, error } = await supabase.auth.verifyOtp(
      isEmail
        ? {
            email: identifier.toLowerCase(),
            token: otp,
            type: "email",
          }
        : {
            phone: identifier,
            token: otp,
            type: "sms",
          },
    );

    // ------------------------------------------------
    // Supabase error
    // ------------------------------------------------

    if (error || !data.session) {
      console.error("[verify-otp] Supabase error:", error?.message);

      return NextResponse.json(
        {
          error: "کد وارد شده نامعتبر یا منقضی شده است.",
        },
        { status: 400 },
      );
    }

    // ------------------------------------------------
    // Remove temporary OTP cookie
    // ------------------------------------------------

    response.cookies.set("otp_identifier", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    // ------------------------------------------------
    // Session
    // ------------------------------------------------

    /*
     * Session را برای Client برمی‌گردانیم.
     *
     * Client بعداً با setSession()
     * این Session را در Supabase Browser Client
     * قرار می‌دهد.
     */

    const session = data.session;

    const finalResponse = NextResponse.json({
      ok: true,

      user: {
        id: data.user?.id ?? null,
        email: data.user?.email ?? null,
      },

      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    });

    // ------------------------------------------------
    // Transfer Supabase cookies
    // ------------------------------------------------

    /*
     * کوکی‌های Supabase که روی response اصلی ایجاد شده‌اند
     * به response نهایی منتقل می‌شوند.
     */

    response.cookies.getAll().forEach((cookie) => {
      finalResponse.cookies.set(cookie);
    });

    // ------------------------------------------------
    // Success
    // ------------------------------------------------

    return finalResponse;
  } catch (error) {
    console.error("[verify-otp] unexpected error:", error);

    return NextResponse.json(
      {
        error: "خطایی هنگام تایید کد رخ داد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
