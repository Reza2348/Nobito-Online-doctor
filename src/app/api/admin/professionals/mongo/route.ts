import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export const maxDuration = 60;

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const ENDPOINTS: Record<string, string> = {
  doctor: "doctors",
  consultant: "consultants",
  clinic: "clinics",
};

/**
 * پروکسی امن بین فرانت و بک‌اند Render.
 * کوکی auth-token از نوع httpOnly است و مرورگر نمی‌تواند آن را بخواند،
 * پس اینجا روی سرور خوانده، نقش admin بررسی و به بک‌اند ارسال می‌شود.
 */
async function forward(
  request: NextRequest,
  method: "POST" | "PATCH",
  suffix: string,
) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    const user = token ? await verifyToken(token) : null;

    if (!token || !user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const endpoint = ENDPOINTS[String(body.type ?? "")];

    if (!endpoint) {
      return NextResponse.json(
        { success: false, message: "نوع نامعتبر است" },
        { status: 400 },
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/${endpoint}${suffix}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body.data ?? {}),
      // Render رایگان ممکن است تا ~۵۰ ثانیه برای بیدار شدن زمان ببرد
      signal: AbortSignal.timeout(55000),
    });

    const result = await response.json().catch(() => ({}));

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("MONGO PROXY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "اتصال به بک‌اند برقرار نشد" },
      { status: 502 },
    );
  }
}

// ثبت رکورد جدید
export async function POST(request: NextRequest) {
  return forward(request, "POST", "");
}

// به‌روزرسانی آدرس عکس
export async function PATCH(request: NextRequest) {
  return forward(request, "PATCH", "/photo");
}
