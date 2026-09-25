import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabaseServer";

interface ChangePasswordRequest {
  password: string;
  confirmPassword: string;
}

const PASSWORD_RULES = [
  {
    test: (v: string) => v.length >= 8,
    message: "رمز عبور باید حداقل 8 کاراکتر باشد.",
  },
  {
    test: (v: string) => /[a-z]/.test(v),
    message: "رمز عبور باید شامل حروف کوچک انگلیسی باشد.",
  },
  {
    test: (v: string) => /[A-Z]/.test(v),
    message: "رمز عبور باید شامل حروف بزرگ انگلیسی باشد.",
  },
  {
    test: (v: string) => /[0-9]/.test(v),
    message: "رمز عبور باید شامل عدد باشد.",
  },
  {
    test: (v: string) => /[!@#$%^&*]/.test(v),
    message: "رمز عبور باید شامل علامت ویژه باشد.",
  },
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChangePasswordRequest;

    const { password, confirmPassword } = body;

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "رمز عبور و تکرار آن الزامی است." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "رمزهای عبور یکسان نیستند." },
        { status: 400 },
      );
    }

    // اعتبارسنجی قوانین رمز عبور سمت سرور، مستقل از اعتبارسنجی سمت کلاینت
    for (const rule of PASSWORD_RULES) {
      if (!rule.test(password)) {
        return NextResponse.json({ error: rule.message }, { status: 400 });
      }
    }

    const supabase = await createClient();

    // بررسی این‌که کاربر واقعاً لاگین است (سشن Supabase معتبر)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "ابتدا وارد حساب کاربری خود شوید." },
        { status: 401 },
      );
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("[change-password] supabase error:", error.message);

      return NextResponse.json(
        { error: "تغییر رمز عبور با خطا مواجه شد. لطفاً دوباره تلاش کنید." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "رمز عبور با موفقیت تغییر کرد.",
    });
  } catch (error) {
    console.error("[change-password] unexpected error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
