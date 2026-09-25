import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createSupabaseRouteClient } from "@/lib/Server";
import { createRateLimiter, getClientIp, getRetryAfter } from "@/lib/rateLimit";
import { verifyStoredOtp } from "@/lib/otpStore";

// --------------------------------------------------
// POST /api/auth/verify-otp
// --------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // ------------------------------------------------
    // Rate Limit
    // ------------------------------------------------

    const ipRateLimit = createRateLimiter("auth:verify-otp:ip", 10, "10 m");

    const identifierRateLimit = createRateLimiter(
      "auth:verify-otp:identifier",
      5,
      "10 m",
    );

    // ------------------------------------------------
    // Parse Body
    // ------------------------------------------------

    const body = await request.json().catch(() => null);

    const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

    // ------------------------------------------------
    // OTP Cookie
    // ------------------------------------------------

    const cookieStore = await cookies();

    const identifier = cookieStore.get("otp_identifier")?.value;

    if (!identifier) {
      return NextResponse.json(
        {
          error: "نشست ورود منقضی شده. لطفاً دوباره تلاش کنید.",
        },
        {
          status: 400,
        },
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
        {
          status: 400,
        },
      );
    }

    // فقط OTP شش رقمی
    if (!/^\d{8}$/.test(otp)) {
      return NextResponse.json(
        {
          error: "کد تایید باید ۸ رقم باشد.",
        },
        {
          status: 400,
        },
      );
    }

    // ------------------------------------------------
    // Rate Limit - IP
    // ------------------------------------------------

    const ip = getClientIp(request);

    if (ipRateLimit) {
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
    // Detect Channel
    // ------------------------------------------------

    const isEmail = identifier.includes("@");

    // =================================================
    // EMAIL
    // =================================================

    if (isEmail) {
      // ------------------------------------------------
      // Create Response
      // ------------------------------------------------

      const response = NextResponse.json({
        ok: true,
      });

      // ------------------------------------------------
      // Supabase Client
      // ------------------------------------------------

      const supabase = createSupabaseRouteClient(cookieStore, response);

      // ------------------------------------------------
      // Supabase Verify
      // ------------------------------------------------

      const { data, error } = await supabase.auth.verifyOtp({
        email: identifier.toLowerCase(),
        token: otp,
        type: "email",
      });

      // ------------------------------------------------
      // Error
      // ------------------------------------------------

      if (error || !data.session) {
        console.error("[verify-otp] Supabase email error:", error?.message);

        return NextResponse.json(
          {
            error: "کد وارد شده نامعتبر یا منقضی شده است.",
          },
          {
            status: 400,
          },
        );
      }

      // ------------------------------------------------
      // Remove Temporary Cookie
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

      const session = data.session;

      const finalResponse = NextResponse.json({
        ok: true,
        channel: "email",

        user: {
          id: data.user?.id ?? null,
          email: data.user?.email ?? null,
          phone: data.user?.phone ?? null,
        },

        session: {
          access_token: session.access_token,

          refresh_token: session.refresh_token,
        },
      });

      // ------------------------------------------------
      // Transfer Supabase Cookies
      // ------------------------------------------------

      response.cookies.getAll().forEach((cookie) => {
        finalResponse.cookies.set(cookie);
      });

      return finalResponse;
    }

    // =================================================
    // SMS
    // =================================================

    const result = await verifyStoredOtp(identifier, otp);

    // ------------------------------------------------
    // Expired
    // ------------------------------------------------

    if (!result.success && result.reason === "not_found") {
      return NextResponse.json(
        {
          error: "کد تایید منقضی شده است. لطفاً کد جدید درخواست کنید.",
        },
        {
          status: 400,
        },
      );
    }

    // ------------------------------------------------
    // Too Many Attempts
    // ------------------------------------------------

    if (!result.success && result.reason === "too_many_attempts") {
      return NextResponse.json(
        {
          error:
            "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفاً کد جدید درخواست کنید.",
        },
        {
          status: 429,
        },
      );
    }

    // ------------------------------------------------
    // Invalid
    // ------------------------------------------------

    if (!result.success) {
      return NextResponse.json(
        {
          error: "کد وارد شده صحیح نیست.",
        },
        {
          status: 400,
        },
      );
    }

    // ------------------------------------------------
    // SMS Verified
    // ------------------------------------------------

    const response = NextResponse.json({
      ok: true,
      verified: true,
      channel: "sms",

      user: {
        id: null,
        email: null,
        phone: identifier,
      },
    });

    // ------------------------------------------------
    // Remove Temporary Cookie
    // ------------------------------------------------

    response.cookies.set("otp_identifier", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("[verify-otp] unexpected error:", error);

    return NextResponse.json(
      {
        error: "خطایی هنگام تایید کد رخ داد. لطفاً دوباره تلاش کنید.",
      },
      {
        status: 500,
      },
    );
  }
}
