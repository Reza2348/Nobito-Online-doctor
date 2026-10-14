import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/database-mode`, {
      cache: "no-store",
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "اتصال به بک‌اند برقرار نشد." },
      { status: 502 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const response = await fetch(`${BACKEND_URL}/api/admin/database-mode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "اتصال به بک‌اند برقرار نشد." },
      { status: 502 },
    );
  }
}
