import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { accounts } from "@/constants/accounts";
import type { Role } from "@/Types/types";
import { createToken } from "@/lib/jwt";
import { createRateLimiter, getClientIp, getRetryAfter } from "@/lib/rateLimit";

const INVALID_CREDENTIALS = {
  message: "نام کاربری یا رمز عبور اشتباه است.",
} as const;

export async function POST(request: NextRequest) {
  try {
    // ------------------------------------------------
    // Rate Limit
    // ------------------------------------------------

    const ipRateLimit = createRateLimiter("auth:login:ip", 10, "10 m");

    const usernameRateLimit = createRateLimiter(
      "auth:login:username",
      5,
      "10 m",
    );

    // ------------------------------------------------
    // Rate Limit - IP
    // ------------------------------------------------

    const ip = getClientIp(request);

    if (ipRateLimit) {
      const ipLimit = await ipRateLimit.limit(ip);

      if (!ipLimit.success) {
        return NextResponse.json(
          {
            message:
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

    // ------------------------------------------------
    // Rate Limit - Username
    // ------------------------------------------------

    if (usernameRateLimit) {
      const usernameLimit = await usernameRateLimit.limit(
        username.toLowerCase(),
      );

      if (!usernameLimit.success) {
        return NextResponse.json(
          {
            message:
              "تعداد تلاش‌های ناموفق برای این حساب زیاد است. لطفا چند دقیقه بعد دوباره تلاش کنید.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": getRetryAfter(usernameLimit.reset),
            },
          },
        );
      }
    }

    // فقط نقش‌های مجاز
    if (!["admin", "consultant", "content"].includes(role)) {
      return NextResponse.json(
        { message: "نقش کاربری نامعتبر است." },
        { status: 400 },
      );
    }

    // پیدا کردن حساب
    const account = accounts[role];

    // حساب وجود ندارد یا passwordHash تنظیم نشده
    if (!account || !account.passwordHash) {
      return NextResponse.json(INVALID_CREDENTIALS, {
        status: 401,
      });
    }

    // بررسی نام کاربری
    if (username !== account.username) {
      return NextResponse.json(INVALID_CREDENTIALS, {
        status: 401,
      });
    }

    // بررسی رمز عبور با bcrypt
    const passwordMatches = await bcrypt.compare(
      password,
      account.passwordHash,
    );

    if (!passwordMatches) {
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
