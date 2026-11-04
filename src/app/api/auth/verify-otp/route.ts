import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createSupabaseRouteClient } from "@/lib/Server";
import { verifyStoredOtp } from "@/lib/otpStore";
import { OTP_LENGTH } from "@/lib/otp";
import { parseIdentifier } from "@/lib/phone";
import {
  checkRateLimit,
  createRateLimiter,
  getClientIp,
} from "@/lib/rateLimit";
import {
  USER_SESSION_COOKIE,
  USER_SESSION_MAX_AGE,
  createUserSessionToken,
  phoneUserId,
} from "@/lib/userSession";

const ipLimiter = createRateLimiter("auth:verify-otp:ip", 10, "15 m");
const identifierLimiter = createRateLimiter(
  "auth:verify-otp:identifier",
  10,
  "15 m",
);

const OTP_REGEX = new RegExp(`^\\d{${OTP_LENGTH}}$`);

const NO_STORE = { "Cache-Control": "no-store" };

function fail(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status, headers: NO_STORE },
  );
}

/**
 * POST /api/auth/verify-otp   { identifier?, token }
 *
 * - موبایل: کد از Redis بررسی می‌شود و نشست محلی (کوکی httpOnly) ساخته می‌شود.
 * - ایمیل: کد با Supabase تأیید می‌شود و کوکی‌های نشست Supabase تنظیم می‌شوند.
 *
 * شناسه از body یا از کوکی httpOnly `otp_identifier` (که send-otp گذاشته) خوانده می‌شود.
 */
export async function POST(request: NextRequest) {
  const ipCheck = await checkRateLimit(ipLimiter, getClientIp(request));

  if (!ipCheck.allowed) {
    return ipCheck.response;
  }

  const body = (await request.json().catch(() => null)) as {
    identifier?: unknown;
    token?: unknown;
  } | null;

  const cookieStore = await cookies();

  const rawIdentifier =
    (typeof body?.identifier === "string" ? body.identifier.trim() : "") ||
    cookieStore.get("otp_identifier")?.value?.trim() ||
    "";

  const token = typeof body?.token === "string" ? body.token.trim() : "";

  const parsed = parseIdentifier(rawIdentifier);

  if (!parsed) {
    return fail("ایمیل یا شماره موبایل معتبر نیست. دوباره کد بگیرید.", 400);
  }

  if (!OTP_REGEX.test(token)) {
    return fail("کد تأیید نامعتبر است.", 400);
  }

  const identifierCheck = await checkRateLimit(
    identifierLimiter,
    parsed.value,
  );

  if (!identifierCheck.allowed) {
    return identifierCheck.response;
  }

  // ------------------------------------------------------------------
  // ایمیل → Supabase
  // ------------------------------------------------------------------
  if (parsed.kind === "email") {
    const response = NextResponse.json(
      { success: true },
      { headers: NO_STORE },
    );

    const supabase = createSupabaseRouteClient(cookieStore, response);

    const { error } = await supabase.auth.verifyOtp({
      email: parsed.value,
      token,
      type: "email",
    });

    if (error) {
      return fail("کد تأیید نامعتبر یا منقضی شده است.", 401);
    }

    response.cookies.set("otp_identifier", "", { path: "/", maxAge: 0 });

    return response;
  }

  // ------------------------------------------------------------------
  // موبایل → Redis + نشست محلی
  // ------------------------------------------------------------------
  const result = await verifyStoredOtp(parsed.value, token);

  if (!result.success) {
    if (result.reason === "too_many_attempts") {
      return fail("تعداد تلاش‌ها زیاد بود. دوباره کد بگیرید.", 429);
    }

    if (result.reason === "not_found") {
      return fail("کد منقضی شده است. دوباره کد بگیرید.", 401);
    }

    return fail("کد تأیید نامعتبر است.", 401);
  }

  let sessionToken: string;
  let userId: string;

  try {
    userId = phoneUserId(parsed.value);

    sessionToken = await createUserSessionToken({
      id: userId,
      phone: parsed.value,
      username: parsed.value.replace(/^\+98/, "0"),
    });
  } catch (error) {
    console.error("[verify-otp] session creation failed:", error);

    return fail("ساخت نشست ناموفق بود. لطفا بعدا تلاش کنید.", 503);
  }

  const response = NextResponse.json(
    { success: true, user: { id: userId } },
    { headers: NO_STORE },
  );

  response.cookies.set(USER_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: USER_SESSION_MAX_AGE,
  });

  response.cookies.set("otp_identifier", "", { path: "/", maxAge: 0 });

  return response;
}
