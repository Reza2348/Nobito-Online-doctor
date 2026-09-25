import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { createSupabaseRouteClient } from "@/lib/Server";
import { generateOtp } from "@/lib/generateOtp";
import { saveOtp } from "@/lib/otpStore";

// --------------------------------------------------
// Validation
// --------------------------------------------------

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// شماره موبایل ایران:
//
// 09123456789
// 9123456789
// 989123456789
// +989123456789

const irPhoneRegex = /^(?:0|98|\+98)?9\d{9}$/;

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

  // 09123456789
  // -> +989123456789
  if (value.startsWith("09")) {
    return `+98${value.slice(1)}`;
  }

  // 9123456789
  // -> +989123456789
  if (/^9\d{9}$/.test(value)) {
    return `+98${value}`;
  }

  // 989123456789
  // -> +989123456789
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
// Retry After
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
    // IP Rate Limit
    // ------------------------------------------------

    const ipRateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "auth:send-otp:ip",
    });

    // ------------------------------------------------
    // Identifier Rate Limit
    // ------------------------------------------------

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
    // Cookies
    // ------------------------------------------------

    const cookieStore = await cookies();

    // ------------------------------------------------
    // Parse Body
    // ------------------------------------------------

    const body = await request.json().catch(() => null);

    // ------------------------------------------------
    // Identifier
    //
    // اولویت:
    // 1. identifier داخل body
    // 2. otp_identifier داخل Cookie
    //
    // این باعث می‌شود Resend بتواند
    // بدون ارسال ایمیل از Client کار کند.
    // ------------------------------------------------

    const bodyIdentifier =
      typeof body?.identifier === "string" ? body.identifier.trim() : "";

    const cookieIdentifier =
      cookieStore.get("otp_identifier")?.value?.trim() || "";

    const rawIdentifier = bodyIdentifier || cookieIdentifier;

    // ------------------------------------------------
    // Validate Identifier
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
    // Normalize Identifier
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
    // Response
    // ------------------------------------------------

    const response = NextResponse.json({
      ok: true,
      channel: isEmail ? "email" : "sms",
    });

    // ------------------------------------------------
    // Supabase Client
    // ------------------------------------------------

    const supabase = createSupabaseRouteClient(cookieStore, response);

    // =================================================
    // EMAIL
    // =================================================

    if (isEmail) {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedIdentifier,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.error("[send-otp] Supabase email error:", error.message);

        return NextResponse.json(
          {
            error:
              "ارسال کد تایید ایمیل با خطا مواجه شد. لطفا دوباره تلاش کنید.",
          },
          {
            status: 400,
          },
        );
      }
    }

    // =================================================
    // SMS
    // =================================================

    if (isPhone) {
      // تولید کد ۸ رقمی
      const otp = generateOtp(8);

      // ذخیره OTP در Redis
      await saveOtp(normalizedIdentifier, otp);

      // فعلاً SMS ارسال نمی‌کنیم
      // کد در ترمینال نمایش داده می‌شود
      console.log(`[Nobito OTP] ${normalizedIdentifier} => ${otp}`);
    }

    // ------------------------------------------------
    // OTP Identifier Cookie
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
