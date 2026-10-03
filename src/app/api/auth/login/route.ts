import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    // بررسی تنظیم بودن آدرس Backend
    if (!BACKEND_URL) {
      console.error("NEXT_PUBLIC_API_URL is not configured");

      return NextResponse.json(
        {
          success: false,
          message: "آدرس سرور Backend تنظیم نشده است.",
        },
        { status: 500 },
      );
    }

    // دریافت اطلاعات فرم
    const body = await request.json();

    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const rememberMe = Boolean(body.rememberMe);

    // اعتبارسنجی اولیه
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفاً نام کاربری و رمز عبور را وارد کنید.",
        },
        { status: 400 },
      );
    }

    // ارسال درخواست به Express Backend
    const backendUrl = `${BACKEND_URL.replace(/\/$/, "")}/api/admin/login`;

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      cache: "no-store",
    });

    // خواندن پاسخ Backend
    let backendData: {
      success?: boolean;
      message?: string;
      admin?: {
        id?: string;
        username?: string;
        role?: "admin" | "consultant" | "content";
      };
    } = {};

    try {
      backendData = await backendResponse.json();
    } catch {
      backendData = {};
    }

    // اگر Backend لاگین را قبول نکرد
    if (!backendResponse.ok || !backendData.success || !backendData.admin) {
      return NextResponse.json(
        {
          success: false,
          message: backendData.message || "نام کاربری یا رمز عبور اشتباه است.",
        },
        {
          status: backendResponse.status || 401,
        },
      );
    }

    const admin = backendData.admin;

    // بررسی اطلاعات کاربر
    if (
      !admin.username ||
      !admin.role ||
      !["admin", "consultant", "content"].includes(admin.role)
    ) {
      console.error("Invalid admin data from backend:", admin);

      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات کاربری دریافتی از سرور نامعتبر است.",
        },
        { status: 500 },
      );
    }

    // ساخت JWT
    const token = await createToken({
      username: admin.username,
      role: admin.role,
    });

    // مدت اعتبار Cookie
    const maxAge = rememberMe
      ? 60 * 60 * 24 * 30 // 30 روز
      : 60 * 60 * 24; // 1 روز

    // ساخت پاسخ موفق
    const response = NextResponse.json(
      {
        success: true,
        message: "ورود با موفقیت انجام شد",
        admin: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
        },
      },
      { status: 200 },
    );

    // ذخیره JWT در Cookie دامنه Next.js
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("NEXT ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطای داخلی سرور. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
