import { NextRequest, NextResponse } from "next/server";

import {
  BACKEND_URL,
  getVerifiedUser,
  signBackendToken,
} from "@/lib/backendUser";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

/** فقط همین بخش‌ها از بک‌اند قابل دسترسی‌اند (profile مسیر جداگانه‌ی خودش را دارد) */
const ALLOWED = new Set([
  "appointments",
  "medical-records",
  "prescriptions",
  "messages",
  "feedback",
]);

type Ctx = { params: Promise<{ path: string[] }> };

async function forward(
  request: NextRequest,
  ctx: Ctx,
  method: "GET" | "POST" | "PATCH",
) {
  const { path } = await ctx.params;

  if (
    !ALLOWED.has(path[0]) ||
    path.some((segment) => !/^[A-Za-z0-9_-]+$/.test(segment))
  ) {
    return NextResponse.json(
      { message: "مسیر پیدا نشد." },
      { status: 404, headers: NO_STORE },
    );
  }

  // نوشتن فقط با JSON؛ فرم cross-site نمی‌تواند این هدر را بفرستد
  if (
    method !== "GET" &&
    !request.headers.get("content-type")?.includes("application/json")
  ) {
    return NextResponse.json(
      { message: "درخواست نامعتبر است." },
      { status: 415, headers: NO_STORE },
    );
  }

  const user = await getVerifiedUser();

  if (!user) {
    return NextResponse.json(
      { message: "برای مشاهده این بخش باید وارد شوید." },
      { status: 401, headers: NO_STORE },
    );
  }

  try {
    const token = await signBackendToken(user);

    const response = await fetch(
      `${BACKEND_URL}/api/me/${path.join("/")}${request.nextUrl.search}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(method !== "GET" ? { "Content-Type": "application/json" } : {}),
        },
        body: method !== "GET" ? await request.text() : undefined,
        cache: "no-store",
      },
    );

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
        ...NO_STORE,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "اتصال به سرور برقرار نشد." },
      { status: 502, headers: NO_STORE },
    );
  }
}

export const GET = (request: NextRequest, ctx: Ctx) =>
  forward(request, ctx, "GET");

export const POST = (request: NextRequest, ctx: Ctx) =>
  forward(request, ctx, "POST");

export const PATCH = (request: NextRequest, ctx: Ctx) =>
  forward(request, ctx, "PATCH");
