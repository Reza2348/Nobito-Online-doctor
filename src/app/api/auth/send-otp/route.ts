import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createSupabaseRouteClient } from "@/lib/Server";

// --------------------------------------------------
// Validation
// --------------------------------------------------

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// شماره موبایل ایران:
// 09123456789
// 9123456789
// 989123456789
// +989123456789
const irPhoneRegex = /^(?:0|98|\+98)?9\d{9}$/;

// عمر کوکی موقت OTP
const OTP_SESSION_MAX_AGE_SECONDS = 60 * 10;

// --------------------------------------------------
// Client IP
// --------------------------------------------------

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

// --------------------------------------------------
// Normalize phone
// --------------------------------------------------

function normalizePhone(phone: string): string {
  const value = phone.replace(/\s/g, "");

  // 09123456789 -> +989123456789
  if (value.startsWith("09")) {
    return `+98${value.slice(1)}`;
  }

  // 9123456789 -> +989123456789
  if (/^9\d{9}$/.test(value)) {
    return `+98${value}`;
  }

  // 989123456789 -> +989123456789
  if (value.startsWith("98")) {
    return `+${value}`;
  }

  // +989123456789
  if (value.startsWith("+98")) {
    return value;
  }

  return value;
}

// --------------------------------------------------
// Retry-After
// --------------------------------------------------

function getRetryAfter(reset: number): string {
  return String(Math.max(1, Math.ceil((reset - Date.now()) / 1000)));
}

// --------------------------------------------------
// POST /api/auth/send-otp
// --------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // ------------------------------------------------
    // Upstash Environment
    // ------------------------------------------------

    const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

    // بررسی وجود و معتبر بودن URL
    if (!redisUrl || !redisToken || !redisUrl.startsWith("https://")) {
      console.error("[send-otp] Invalid Upstash configuration.");

      return NextResponse.json(
        {
          error: "سرویس احراز هویت موقتا در دسترس نیست.",
        },
        {
          status: 503,
        },
      );
    }

    // ------------------------------------------------
    // Redis
    // ------------------------------------------------

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    // ------------------------------------------------
    // Rate Limit - IP
    // ------------------------------------------------

    // حداکثر 5 درخواست از هر IP در 10 دقیقه
    const ipRateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "auth:send-otp:ip",
    });

    // ------------------------------------------------
    // Rate Limit - Identifier
    // ------------------------------------------------

    // حداکثر 3 درخواست برای هر ایمیل/شماره در 10 دقیقه
    const identifierRateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "auth:send-otp:identifier",
    });

    // ------------------------------------------------
    // Client IP
    // ------------------------------------------------

    const ip = getClientIp(request);

    // ------------------------------------------------
    // Parse body
    // ------------------------------------------------

    const body = await request.json().catch(() => null);

    const rawIdentifier =
      typeof body?.identifier === "string" ? body.identifier.trim() : "";

    // ------------------------------------------------
    // Validate identifier
    // ------------------------------------------------

    if (!rawIdentifier) {
      return NextResponse.json(
        {
          error: "لطفا ایمیل یا شماره موبایل خود را وارد کنید.",
        },
        {
          status: 400,
        },
      );
    }

    const compactIdentifier = rawIdentifier.replace(/\s/g, "");

    const isEmail = emailRegex.test(compactIdentifier.toLowerCase());

    const isPhone = irPhoneRegex.test(compactIdentifier);

    if (!isEmail && !isPhone) {
      return NextResponse.json(
        {
          error: "لطفا ایمیل یا شماره موبایل معتبر وارد کنید.",
        },
        {
          status: 400,
        },
      );
    }

    // ------------------------------------------------
    // Normalize identifier
    // ------------------------------------------------

    const normalizedIdentifier = isEmail
      ? compactIdentifier.toLowerCase()
      : normalizePhone(compactIdentifier);

    // ------------------------------------------------
    // Rate Limit - IP
    // ------------------------------------------------

    const ipLimit = await ipRateLimit.limit(ip);

    if (!ipLimit.success) {
      return NextResponse.json(
        {
          error:
            "تعداد درخواست‌ها بیش از حد مجاز است. لطفا چند دقیقه بعد دوباره تلاش کنید.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": getRetryAfter(ipLimit.reset),
          },
        },
      );
    }

    // ------------------------------------------------
    // Rate Limit - Identifier
    // ------------------------------------------------

    const identifierLimit =
      await identifierRateLimit.limit(normalizedIdentifier);

    if (!identifierLimit.success) {
      return NextResponse.json(
        {
          error:
            "برای این ایمیل یا شماره موبایل درخواست‌های زیادی ثبت شده است. لطفا بعدا دوباره تلاش کنید.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": getRetryAfter(identifierLimit.reset),
          },
        },
      );
    }

    // ------------------------------------------------
    // Supabase
    // ------------------------------------------------

    const cookieStore = await cookies();

    const response = NextResponse.json({
      ok: true,
      channel: isEmail ? "email" : "sms",
    });

    const supabase = createSupabaseRouteClient(cookieStore, response);

    // ------------------------------------------------
    // Send OTP
    // ------------------------------------------------

    let error;

    if (isEmail) {
      const result = await supabase.auth.signInWithOtp({
        email: normalizedIdentifier,
        options: {
          shouldCreateUser: true,
        },
      });

      error = result.error;
    } else {
      const result = await supabase.auth.signInWithOtp({
        phone: normalizedIdentifier,
        options: {
          shouldCreateUser: true,
        },
      });

      error = result.error;
    }

    // ------------------------------------------------
    // Supabase error
    // ------------------------------------------------

    if (error) {
      console.error("[send-otp] Supabase error:", error.message);

      return NextResponse.json(
        {
          error: "ارسال کد تایید با خطا مواجه شد. لطفا دوباره تلاش کنید.",
        },
        {
          status: 400,
        },
      );
    }

    // ------------------------------------------------
    // OTP identifier cookie
    // ------------------------------------------------

    response.cookies.set("otp_identifier", normalizedIdentifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: OTP_SESSION_MAX_AGE_SECONDS,
    });

    // ------------------------------------------------
    // Success
    // ------------------------------------------------

    return response;
  } catch (error) {
    console.error("[send-otp] unexpected error:", error);

    return NextResponse.json(
      {
        error: "خطایی هنگام ارسال کد تایید رخ داد.",
      },
      {
        status: 500,
      },
    );
  }
}
