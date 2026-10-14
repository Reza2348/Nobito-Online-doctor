import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --------------------------------------------------
// Client IP
// --------------------------------------------------

export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();

    if (ip) {
      return ip;
    }
  }

  return "unknown";
}

// --------------------------------------------------
// Retry-After
// --------------------------------------------------

export function getRetryAfter(reset: number): string {
  return String(Math.max(1, Math.ceil((reset - Date.now()) / 1000)));
}

// --------------------------------------------------
// Rate limiter factory
// --------------------------------------------------

type RateLimitWindow = `${number} ${"ms" | "s" | "m" | "h" | "d"}`;

export function createRateLimiter(
  prefix: string,
  limit: number,
  window: RateLimitWindow,
): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    console.error("[rateLimit] Upstash environment variables are missing.");

    return null;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    console.error("[rateLimit] Invalid Upstash Redis URL.");
    return null;
  }

  if (
    parsedUrl.protocol !== "https:" ||
    !parsedUrl.hostname ||
    parsedUrl.username ||
    parsedUrl.password
  ) {
    console.error("[rateLimit] Upstash URL must be a valid HTTPS URL.");

    return null;
  }

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    !Number.isFinite(Number.parseFloat(window))
  ) {
    throw new Error("[rateLimit] Invalid limiter configuration.");
  }

  const redis = new Redis({
    url: parsedUrl.toString(),
    token,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix,
  });
}

// --------------------------------------------------
// Fail-closed rate-limit check
// --------------------------------------------------

type RateLimitResult =
  | { allowed: true; response: null }
  | { allowed: false; response: NextResponse };

function unavailableResponse(): NextResponse {
  return NextResponse.json(
    {
      success: false,
      message: "سرویس امنیتی موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید.",
    },
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": "30",
      },
    },
  );
}

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
): Promise<RateLimitResult> {
  // اگر محدودکننده ساخته نشده باشد، در Production اجازه عبور نده
  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      return {
        allowed: false,
        response: unavailableResponse(),
      };
    }

    // فقط برای توسعه محلی؛ در Production هرگز اجرا نمی‌شود
    console.warn(
      "[rateLimit] Limiter unavailable; bypassing only in development.",
    );

    return { allowed: true, response: null };
  }

  try {
    const result = await limiter.limit(identifier);

    if (result.success) {
      return { allowed: true, response: null };
    }

    const retryAfter = getRetryAfter(result.reset);

    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          message: "تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter,
            "Cache-Control": "no-store",
          },
        },
      ),
    };
  } catch (error) {
    console.error(
      "[rateLimit] Upstash request failed.",
      error instanceof Error ? error.message : "Unknown error",
    );

    // در صورت خطای Redis، درخواست احراز هویت را آزاد نکن
    return {
      allowed: false,
      response: unavailableResponse(),
    };
  }
}
