import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { getAccounts } from "@/constants/accounts";
import type { Role } from "@/Types/types";
import { createToken } from "@/lib/jwt";
import {
  checkRateLimit,
  createRateLimiter,
  getClientIp,
} from "@/lib/rateLimit";

// ۵ تلاش در ۱۵ دقیقه برای هر IP و ۵ تلاش برای هر نام کاربری
const ipLimiter = createRateLimiter("auth:admin-login:ip", 5, "15 m");
const userLimiter = createRateLimiter("auth:admin-login:user", 5, "15 m");

// برای مقایسهٔ هم‌زمان وقتی حساب وجود ندارد (جلوگیری از timing leak)
const DUMMY_HASH =
  "$2b$10$RtmfO9gs3e6eBWoTLlaO/evCqjhnayMtQ7kf3oXMvAcZbmpvy0jMu";

const INVALID_CREDENTIALS = {
  message: "نام کاربری یا رمز عبور اشتباه است.",
} as const;

export async function POST(request: NextRequest) {
  try {
    const ipCheck = await checkRateLimit(ipLimiter, getClientIp(request));

    if (!ipCheck.allowed) {
      return ipCheck.response;
    }

    const body = await request.json();

    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const role = String(body.role ?? "").trim() as Role;

    // Remember Me
    const rememberMe = Boolean(body.rememberMe);

    // بررسی ورودی
    if (!username || !password || !role) {
      return NextResponse.json(
        { message: "لطفاً اطلاعات ورود را کامل کنید." },
        { status: 400 },
      );
    }

    // فقط نقش‌های مجاز
    if (!["admin", "consultant", "content"].includes(role)) {
      return NextResponse.json(
        { message: "نقش کاربری نامعتبر است." },
        { status: 400 },
      );
    }

    const userCheck = await checkRateLimit(
      userLimiter,
      `${role}:${username.toLowerCase()}`,
    );

    if (!userCheck.allowed) {
      return userCheck.response;
    }

    // پیدا کردن حساب
    const account = getAccounts()[role];

    if (!account || !account.passwordHash) {
      console.error(
        `[login] هش رمز برای نقش «${role}» تنظیم نشده است (متغیر *_PASSWORD_HASH).`,
      );
    }

    // همیشه یک مقایسهٔ bcrypt انجام می‌شود تا زمان پاسخ لو ندهد
    // که نام کاربری یا نقش درست بوده است.
    const passwordMatches = await bcrypt.compare(
      password,
      account?.passwordHash || DUMMY_HASH,
    );

    const credentialsValid =
      Boolean(account?.passwordHash) &&
      username === account.username &&
      passwordMatches;

    if (!credentialsValid) {
      return NextResponse.json(INVALID_CREDENTIALS, {
        status: 401,
      });
    }

    // ساخت JWT
    const token = await createToken({
      username: account.username,
      role,
    });

    // پاسخ موفق
    const response = NextResponse.json({
      success: true,
      path: account.path,
    });

    /*
     * اگر Remember Me فعال باشد:
     * Cookie مدت بیشتری معتبر می‌ماند.
     *
     * اگر فعال نباشد:
     * Cookie فقط برای مدت کوتاه‌تری معتبر خواهد بود.
     */
    const maxAge = rememberMe
      ? 60 * 60 * 24 * 30 // 30 روز
      : 60 * 60 * 24; // 1 روز

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
