import { NextRequest, NextResponse } from "next/server";

import {
  BACKEND_URL,
  getVerifiedUser,
  signBackendToken,
} from "@/lib/backendUser";
import {
  MAX_BOOKING_DAYS_AHEAD,
  isValidSlotStart,
  parseCalendarDayKey,
} from "@/lib/appointmentSlots";
import { checkRateLimit, createRateLimiter } from "@/lib/rateLimit";

import type { SlotType } from "@/Types/types";

export const dynamic = "force-dynamic";

/**
 * نوبت‌ها در MongoDB (بک‌اند) نگهداری می‌شوند؛ همان جایی که
 * «نوبت‌های من» در داشبورد از آن می‌خواند. این مسیر فقط:
 *  - نشست را سمت سرور تأیید می‌کند،
 *  - ورودی و زمان را اعتبارسنجی می‌کند،
 *  - با توکن کوتاه‌عمر به نام همان کاربر به بک‌اند می‌فرستد.
 * بک‌اند دوباره همهٔ این‌ها را بررسی می‌کند و جلوی رزرو دوباره را می‌گیرد.
 */
const NO_STORE = { "Cache-Control": "no-store" };

const PROVIDER_TYPES = ["doctor", "clinic", "consultant"] as const;
const SLOT_TYPES: readonly SlotType[] = ["inPerson", "video"];
const PROVIDER_ID_REGEX = /^[A-Za-z0-9_-]{1,64}$/;

const createLimiter = createRateLimiter("appointments:create", 10, "10 m");
const readLimiter = createRateLimiter("appointments:read", 60, "1 m");

function fail(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status, headers: NO_STORE },
  );
}

const isProviderType = (v: unknown): v is (typeof PROVIDER_TYPES)[number] =>
  typeof v === "string" && (PROVIDER_TYPES as readonly string[]).includes(v);

const isSlotType = (v: unknown): v is SlotType =>
  typeof v === "string" && (SLOT_TYPES as readonly string[]).includes(v);

/** GET /api/appointments?providerType=&providerId=&date=YYYY-MM-DD */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const providerType = params.get("providerType");
  const providerId = params.get("providerId") ?? "";
  const date = params.get("date") ?? "";

  if (
    !isProviderType(providerType) ||
    !PROVIDER_ID_REGEX.test(providerId) ||
    !parseCalendarDayKey(date)
  ) {
    return fail("پارامترهای درخواست نامعتبر است.", 400);
  }

  const limit = await checkRateLimit(
    readLimiter,
    `read:${request.headers.get("x-real-ip") ?? "unknown"}`,
  );

  if (!limit.allowed) return limit.response;

  try {
    const query = new URLSearchParams({ providerType, providerId, date });

    const response = await fetch(`${BACKEND_URL}/api/appointments/booked?${query}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return fail(
        data?.message ?? "دریافت زمان‌های رزروشده ناموفق بود.",
        response.ok ? 502 : response.status,
      );
    }

    return NextResponse.json(
      { success: true, booked: data.booked ?? [] },
      { headers: NO_STORE },
    );
  } catch {
    return fail("ارتباط با سرور برقرار نشد.", 502);
  }
}

/** POST /api/appointments  { providerType, providerId, consultType, startsAt } */
export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("درخواست نامعتبر است.", 415);
  }

  const user = await getVerifiedUser();

  if (!user) {
    return fail("برای رزرو نوبت باید وارد حساب کاربری شوید.", 401);
  }

  const limit = await checkRateLimit(createLimiter, `user:${user.id}`);

  if (!limit.allowed) return limit.response;

  const body = (await request.json().catch(() => null)) as {
    providerType?: unknown;
    providerId?: unknown;
    consultType?: unknown;
    startsAt?: unknown;
  } | null;

  const providerId = String(body?.providerId ?? "").trim();

  if (
    !body ||
    !isProviderType(body.providerType) ||
    !PROVIDER_ID_REGEX.test(providerId) ||
    !isSlotType(body.consultType) ||
    typeof body.startsAt !== "string"
  ) {
    return fail("اطلاعات نوبت نامعتبر است.", 400);
  }

  const startsAt = new Date(body.startsAt);
  const now = Date.now();

  if (Number.isNaN(startsAt.getTime())) {
    return fail("زمان نوبت نامعتبر است.", 400);
  }

  if (startsAt.getTime() <= now) {
    return fail("این زمان گذشته است.", 400);
  }

  if (startsAt.getTime() > now + MAX_BOOKING_DAYS_AHEAD * 24 * 3_600_000) {
    return fail("امکان رزرو این بازهٔ زمانی وجود ندارد.", 400);
  }

  if (!isValidSlotStart(body.consultType, startsAt)) {
    return fail("این زمان برای رزرو در دسترس نیست.", 400);
  }

  try {
    const token = await signBackendToken(user);

    const response = await fetch(`${BACKEND_URL}/api/me/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        providerType: body.providerType,
        providerId,
        consultType: body.consultType,
        startsAt: startsAt.toISOString(),
      }),
      cache: "no-store",
      // Render رایگان ممکن است تا ~۵۰ ثانیه برای بیدار شدن زمان ببرد
      signal: AbortSignal.timeout(55_000),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
      appointment?: { id: string; startsAt: string };
    } | null;

    if (!response.ok || !data?.success) {
      return fail(
        data?.message ?? "ثبت نوبت ناموفق بود. لطفاً دوباره تلاش کنید.",
        response.ok ? 502 : response.status,
      );
    }

    return NextResponse.json(
      { success: true, appointment: data.appointment },
      { status: 201, headers: NO_STORE },
    );
  } catch (error) {
    console.error("[appointments] backend unreachable:", error);

    return fail("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.", 502);
  }
}
