import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { createSupabaseRouteClient } from "@/lib/Server";
import { generateOtp } from "@/lib/generateOtp";
import { deleteOtp, saveOtp } from "@/lib/otpStore";
import { parseIdentifier } from "@/lib/phone";
import { getClientIp } from "@/lib/rateLimit";
import { isSmsConfigured, sendOtpSms } from "@/lib/sms";

const OTP_SESSION_MAX_AGE_SECONDS = 60 * 10;

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

    const parsed = parseIdentifier(rawIdentifier);

    if (!parsed) {
      return NextResponse.json(
        {
          error: "لطفا ایمیل یا شماره موبایل معتبر وارد کنید.",
        },
        {
          status: 400,
        },
      );
    }

    const isEmail = parsed.kind === "email";
    const isPhone = parsed.kind === "phone";
    const normalizedIdentifier = parsed.value;

    // سرویس پیامک باید قبل از مصرف سهمیهٔ rate limit آماده باشد
    if (isPhone && !isSmsConfigured()) {
      console.error("[send-otp] SMS provider is not configured.");

      return NextResponse.json(
        { error: "ارسال پیامک موقتا در دسترس نیست. لطفا با ایمیل وارد شوید." },
        { status: 503 },
      );
    }

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
      const otp = generateOtp();

      // ذخیره OTP در Redis
      await saveOtp(normalizedIdentifier, otp);

      const sms = await sendOtpSms(normalizedIdentifier, otp);

      if (!sms.ok) {
        // کدی که به دست کاربر نرسیده نباید معتبر بماند
        await deleteOtp(normalizedIdentifier);

        console.error("[send-otp] SMS delivery failed:", sms.error);

        return NextResponse.json(
          { error: "ارسال پیامک ناموفق بود. لطفا دوباره تلاش کنید." },
          { status: 502 },
        );
      }
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
