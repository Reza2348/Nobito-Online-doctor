import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseRouteClient } from "@/lib/Server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

  const cookieStore = await cookies();
  const identifier = cookieStore.get("otp_identifier")?.value;

  if (!identifier) {
    return NextResponse.json(
      { error: "نشست ورود منقضی شده. لطفاً دوباره تلاش کنید." },
      { status: 400 },
    );
  }

  if (!otp) {
    return NextResponse.json(
      { error: "لطفاً کد تایید را وارد کنید." },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });
  const supabase = createSupabaseRouteClient(cookieStore, response);

  const isEmail = identifier.includes("@");

  const { data, error } = await supabase.auth.verifyOtp(
    isEmail
      ? { email: identifier, token: otp, type: "email" }
      : { phone: identifier, token: otp, type: "sms" },
  );

  if (error || !data.session) {
    console.error("[verify-otp] supabase error:", error?.message);
    return NextResponse.json(
      { error: "کد وارد شده نامعتبر یا منقضی شده است." },
      { status: 400 },
    );
  }

  // پاک‌کردن کوکی موقتی identifier روی همون response
  response.cookies.set("otp_identifier", "", {
    path: "/",
    maxAge: 0,
  });

  // ساخت پاسخ نهایی با بدنه‌ی شامل session، به‌علاوه‌ی انتقال کوکی‌هایی
  // که Supabase و خط بالا روی `response` ست کرده بودن
  const finalResponse = NextResponse.json({
    ok: true,
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    },
  });

  response.cookies.getAll().forEach((cookie) => {
    finalResponse.cookies.set(cookie);
  });

  return finalResponse;
}
