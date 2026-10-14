import { jwtVerify } from "jose";

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
