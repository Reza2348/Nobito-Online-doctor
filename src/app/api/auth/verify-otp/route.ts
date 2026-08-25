import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseRouteClient } from "@/lib/Server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

    const cookieStore = await cookies();

    const identifier = cookieStore.get("otp_identifier")?.value;

    if (!identifier) {
      return NextResponse.json(
        {
          error: "نشست ورود منقضی شده. لطفاً دوباره تلاش کنید.",
        },
        { status: 400 },
      );
    }

    if (!otp) {
      return NextResponse.json(
        {
          error: "لطفاً کد تایید را وارد کنید.",
        },
        { status: 400 },
      );
    }

    /*
     * مهم:
     * همان response را به Supabase می‌دهیم تا
     * کوکی‌های Auth روی همان response ثبت شوند.
     */
    const response = NextResponse.json({
      ok: true,
    });

    const supabase = createSupabaseRouteClient(cookieStore, response);

    const isEmail = identifier.includes("@");

    const { data, error } = await supabase.auth.verifyOtp(
      isEmail
        ? {
            email: identifier.toLowerCase(),
            token: otp,
            type: "email",
          }
        : {
            phone: identifier,
            token: otp,
            type: "sms",
          },
    );

    if (error || !data.session) {
      console.error("[verify-otp] Supabase error:", error?.message);

      return NextResponse.json(
        {
          error: "کد وارد شده نامعتبر یا منقضی شده است.",
        },
        { status: 400 },
      );
    }

    /*
     * حذف کوکی موقت OTP
     */
    response.cookies.set("otp_identifier", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    /*
     * Session را برای Client برمی‌گردانیم.
     *
     * Client بعداً با setSession()
     * این Session را در Supabase Browser Client
     * قرار می‌دهد.
     */
    const session = data.session;

    const finalResponse = NextResponse.json({
      ok: true,

      user: {
        id: data.user?.id ?? null,
        email: data.user?.email ?? null,
      },

      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    });

    /*
     * کوکی‌های Supabase که روی response اصلی ایجاد شده‌اند
     * به response نهایی منتقل می‌شوند.
     */
    response.cookies.getAll().forEach((cookie) => {
      finalResponse.cookies.set(cookie);
    });

    return finalResponse;
  } catch (error) {
    console.error("[verify-otp] unexpected error:", error);

    return NextResponse.json(
      {
        error: "خطایی هنگام تایید کد رخ داد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
