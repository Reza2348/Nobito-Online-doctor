import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { accounts } from "@/constants/accounts";

import type { Role } from "@/Types/types";

import { createToken } from "@/lib/jwt";

interface LoginRequest {
  username: string;
  password: string;
  role: Role;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequest;

    const { username, password, role } = body;

    const account = accounts[role];

    const usernameMatches = !!account && account.username === username;

    // مقایسه‌ی bcrypt حتی وقتی یوزرنیم اشتباه است هم انجام می‌شود
    // (با یک هش ساختگی) تا زمان پاسخ سرور برای «یوزرنیم غلط» و
    // «پسورد غلط» یکسان بماند و حمله‌ی timing attack ممکن نباشد.
    const passwordMatches = usernameMatches
      ? await bcrypt.compare(password, account.passwordHash)
      : await bcrypt.compare(
          password,
          "$2b$12$invalidsaltinvalidsaltinvalidsa",
        );

    if (!usernameMatches || !passwordMatches) {
      return NextResponse.json(
        {
          message: "نام کاربری یا رمز عبور اشتباه است",
        },
        {
          status: 401,
        },
      );
    }

    /*
      ساخت JWT
    */

    const token = await createToken({
      username,
      role,
    });

    const response = NextResponse.json({
      success: true,
      path: account.path,
    });

    /*
      HttpOnly Cookie
      قابل دسترسی توسط JavaScript نیست
    */

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

    return NextResponse.json(
      {
        message: "خطای داخلی سرور",
      },
      {
        status: 500,
      },
    );
  }
}
