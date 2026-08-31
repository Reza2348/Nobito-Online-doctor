import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --------------------------------------------------
// Client IP
// --------------------------------------------------

export function getClientIp(request: NextRequest): string {
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
// Retry-After
// --------------------------------------------------

export function getRetryAfter(reset: number): string {
  return String(Math.max(1, Math.ceil((reset - Date.now()) / 1000)));
}

// --------------------------------------------------
// Rate limiter factory
// --------------------------------------------------

export function createRateLimiter(
  prefix: string,
  limit: number,
  window: `${number} ${"ms" | "s" | "m" | "h" | "d"}`,
): Ratelimit | null {
  // Environment variables را هنگام اجرای درخواست می‌خوانیم
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  // اگر تنظیم نشده باشند، Rate Limit غیرفعال می‌شود
  if (!url || !token) {
    console.error("[rateLimit] Upstash environment variables are missing.");

    return null;
  }

  // URL باید حتماً https باشد
  if (!url.startsWith("https://")) {
    console.error(
      "[rateLimit] UPSTASH_REDIS_REST_URL must start with https://",
    );

    return null;
  }

  // Redis فقط هنگام اجرای درخواست ساخته می‌شود
  const redis = new Redis({
    url,
    token,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
    prefix,
  });
}
