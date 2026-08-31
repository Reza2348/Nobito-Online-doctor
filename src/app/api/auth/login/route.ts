import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { accounts } from "@/constants/accounts";
import type { Role } from "@/Types/types";
import { createToken } from "@/lib/jwt";

const INVALID_CREDENTIALS = {
  message: "نام کاربری یا رمز عبور اشتباه است.",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const role = String(body.role ?? "").trim() as Role;

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

    // پیدا کردن حساب
    const account = accounts[role];
    console.log("DEBUG LOGIN >>>", {
      roleSent: role,
      usernameSent: username,
      passwordSent: password,
      accountFound: account,
    });

    // اگه حساب وجود نداره یا هش پسورد ست نشده (env گم شده)
    if (!account || !account.passwordHash) {
      return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
    }

    // بررسی نام کاربری
    if (username !== account.username) {
      return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
    }

    // بررسی رمز عبور با bcrypt (مقایسه هش، نه پلین‌تکست)
    const passwordMatches = await bcrypt.compare(
      password,
      account.passwordHash,
    );

    if (!passwordMatches) {
      return NextResponse.json(INVALID_CREDENTIALS, { status: 401 });
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

    // ذخیره توکن در Cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
