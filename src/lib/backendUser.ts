import "server-only";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

import { createClient } from "@/lib/supabaseServer";
import { USER_SESSION_COOKIE, verifyUserSession } from "@/lib/userSession";

const ISSUER = "nobito";
const AUDIENCE = "nobito-user";

export const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export type VerifiedUser = { id: string; email: string };

/**
 * هویت کاربر را فقط از کوکی‌های سروری تأیید می‌کند (نشست محلی یا Supabase).
 * هیچ‌وقت id را از body/query نمی‌گیرد.
 */
export async function getVerifiedUser(): Promise<VerifiedUser | null> {
  const cookieStore = await cookies();

  const local = await verifyUserSession(
    cookieStore.get(USER_SESSION_COOKIE)?.value,
  );

  if (local) {
    return { id: local.id, email: local.email };
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      return { id: data.user.id, email: data.user.email ?? "" };
    }
  } catch {
    // Supabase در دسترس نیست و نشست محلی هم نبود
  }

  return null;
}

/** توکن کوتاه‌عمر (۶۰ ثانیه) برای صدا زدن بک‌اند به نام همین کاربر */
export async function signBackendToken(user: VerifiedUser): Promise<string> {
  const secret = process.env.USER_SESSION_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error("USER_SESSION_SECRET تنظیم نشده است.");
  }

  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("60s")
    .sign(new TextEncoder().encode(secret));
}
