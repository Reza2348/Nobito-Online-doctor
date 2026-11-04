import { SignJWT, jwtVerify } from "jose";
import { createHmac } from "node:crypto";

/** نام کوکی نشست محلی (فقط‌سروری، httpOnly) */
export const USER_SESSION_COOKIE = "nobito_user_session";

/** باید با SESSION_ISSUER / SESSION_AUDIENCE بک‌اند یکی باشد */
const ISSUER = "nobito";
const AUDIENCE = "nobito-user";

export type LocalSessionUser = {
  id: string;
  email: string;
  phone: string;
  username: string;
};

/**
 * تأیید توکن نشست محلی که بک‌اند با USER_SESSION_SECRET امضا کرده.
 * اگر نامعتبر/منقضی/بدون کلید باشد null برمی‌گرداند.
 */
export async function verifyUserSession(
  token: string | undefined | null,
): Promise<LocalSessionUser | null> {
  const secret = process.env.USER_SESSION_SECRET?.trim();

  if (!token || !secret || secret.length < 32) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { issuer: ISSUER, audience: AUDIENCE, algorithms: ["HS256"] },
    );

    if (!payload.sub) return null;

    return {
      id: String(payload.sub),
      email: String(payload.email ?? ""),
      phone: String(payload.phone ?? ""),
      username: String(payload.username ?? ""),
    };
  } catch {
    return null;
  }
}

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

/** شناسهٔ پایدار برای کاربر موبایلی (بدون ذخیرهٔ شماره در شناسه) */
export function phoneUserId(phoneE164: string): string {
  const secret = process.env.USER_SESSION_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error("USER_SESSION_SECRET تنظیم نشده است.");
  }

  return `phone_${createHmac("sha256", secret)
    .update(phoneE164)
    .digest("hex")
    .slice(0, 32)}`;
}

/** توکن نشست محلی که verifyUserSession آن را می‌پذیرد (فقط سمت سرور) */
export async function createUserSessionToken(user: {
  id: string;
  email?: string;
  phone?: string;
  username?: string;
}): Promise<string> {
  const secret = process.env.USER_SESSION_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error("USER_SESSION_SECRET تنظیم نشده است.");
  }

  return new SignJWT({
    email: user.email ?? "",
    phone: user.phone ?? "",
    username: user.username ?? "",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(new TextEncoder().encode(secret));
}

export const USER_SESSION_MAX_AGE = SESSION_TTL_SECONDS;
