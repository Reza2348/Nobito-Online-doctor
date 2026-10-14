import { NextRequest, NextResponse } from "next/server";

import {
  BACKEND_URL,
  getVerifiedUser,
  signBackendToken,
} from "@/lib/backendUser";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

async function forward(request: NextRequest, method: "GET" | "PATCH") {
  const user = await getVerifiedUser();

  if (!user) {
    return NextResponse.json(
      { message: "برای مشاهده پروفایل باید وارد شوید." },
      { status: 401, headers: NO_STORE },
    );
  }

  try {
    const token = await signBackendToken(user);

    const response = await fetch(`${BACKEND_URL}/api/me/profile`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(method === "PATCH" ? { "Content-Type": "application/json" } : {}),
      },
      body: method === "PATCH" ? await request.text() : undefined,
      cache: "no-store",
    });

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

export function GET(request: NextRequest) {
  return forward(request, "GET");
}

export function PATCH(request: NextRequest) {
  return forward(request, "PATCH");
}
