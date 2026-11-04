import { NextRequest, NextResponse } from "next/server";

import {
  BACKEND_URL,
  getVerifiedUser,
  signBackendToken,
} from "@/lib/backendUser";
import { checkRateLimit, createRateLimiter } from "@/lib/rateLimit";
import { isSupabaseUnavailable } from "@/lib/supabaseAvailability";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const NO_STORE = { "Cache-Control": "no-store" };

const ENTITY_TABLES = {
  doctor: "doctors",
  consultant: "consultants",
  clinic: "clinics",
} as const;

type EntityType = keyof typeof ENTITY_TABLES;

const limiter = createRateLimiter("feedback:create", 10, "1 h");

const MAX_OPTIONS = 10;
const MAX_OPTION_CHARS = 100;
const MAX_COMMENT_CHARS = 1000;

function fail(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status, headers: NO_STORE },
  );
}

/**
 * POST /api/feedback
 * { type, entityId, rating, positive_or_negative, options, comment }
 *
 * هویت از نشست سروری می‌آید، نام ارائه‌دهنده از دیتابیس خوانده می‌شود
 * (نه از کلاینت)، و هر کاربر برای هر ارائه‌دهنده فقط یک نظر می‌تواند ثبت کند.
 */
export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("درخواست نامعتبر است.", 415);
  }

  const user = await getVerifiedUser();

  if (!user) {
    return fail("برای ثبت نظر ابتدا وارد حساب کاربری شوید.", 401);
  }

  const limit = await checkRateLimit(limiter, `user:${user.id}`);

  if (!limit.allowed) return limit.response;

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  const type = body?.type;
  const entityId = Number(body?.entityId);
  const rating = Number(body?.rating);
  const sentiment = body?.positive_or_negative;
  const comment = typeof body?.comment === "string" ? body.comment.trim() : "";

  const options = Array.isArray(body?.options)
    ? body.options
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  if (
    typeof type !== "string" ||
    !(type in ENTITY_TABLES) ||
    !Number.isInteger(entityId) ||
    entityId <= 0 ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5 ||
    (sentiment !== "positive" && sentiment !== "negative") ||
    options.length > MAX_OPTIONS ||
    options.some((item) => item.length > MAX_OPTION_CHARS) ||
    comment.length > MAX_COMMENT_CHARS
  ) {
    return fail("اطلاعات نظر نامعتبر است.", 400);
  }

  const entityType = type as EntityType;

  const payload = {
    type: entityType,
    entityId,
    rating,
    positive_or_negative: sentiment,
    options,
    comment,
  };

  // Supabase اول؛ اگر خاموش/غیرقابل‌دسترس بود، همان نظر در MongoDB ذخیره
  // می‌شود (بک‌اند بعداً با sync آن را به Supabase می‌رساند).
  let supabase: ReturnType<typeof getSupabaseAdmin> | null = null;

  try {
    supabase = getSupabaseAdmin();
  } catch {
    return saveViaBackend(user, payload);
  }

  const { data: entity, error: entityError } = await supabase
    .from(ENTITY_TABLES[entityType])
    .select("name")
    .eq("id", entityId)
    .maybeSingle();

  if (entityError) {
    if (isSupabaseUnavailable(entityError)) {
      return saveViaBackend(user, payload);
    }

    console.error("[feedback] entity lookup failed:", entityError.code);

    return fail("بررسی اطلاعات ناموفق بود.", 500);
  }

  if (!entity) {
    return fail("پزشک، مشاور یا کلینیک موردنظر پیدا نشد.", 404);
  }

  const { error } = await supabase.from("feedbacks").insert({
    user_id: user.id,
    name: (entity as { name?: string }).name ?? "",
    entity_type: entityType,
    entity_id: entityId,
    rating,
    positive_or_negative: sentiment,
    options,
    comment,
  });

  if (error) {
    // 23505: این کاربر قبلاً برای همین ارائه‌دهنده نظر ثبت کرده است
    if (error.code === "23505") {
      return fail("شما قبلاً برای این مورد نظر ثبت کرده‌اید.", 409);
    }

    if (isSupabaseUnavailable(error)) {
      return saveViaBackend(user, payload);
    }

    console.error("[feedback] insert failed:", error.code);

    return fail("ثبت نظر انجام نشد. لطفاً دوباره تلاش کنید.", 500);
  }

  return NextResponse.json({ success: true }, { status: 201, headers: NO_STORE });
}

async function saveViaBackend(
  user: NonNullable<Awaited<ReturnType<typeof getVerifiedUser>>>,
  payload: Record<string, unknown>,
) {
  try {
    const token = await signBackendToken(user);

    const response = await fetch(`${BACKEND_URL}/api/me/entity-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !data?.success) {
      return fail(
        data?.message ?? "ثبت نظر انجام نشد. لطفاً دوباره تلاش کنید.",
        response.ok ? 502 : response.status,
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 201, headers: NO_STORE },
    );
  } catch {
    return fail("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.", 502);
  }
}
