import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import type { Role } from "@/Types/types";

export interface TokenPayload extends JWTPayload {
  username: string;
  role: Role;
}

/**
 * کلید فقط هنگام استفاده خوانده می‌شود، نه هنگام import؛
 * وگرنه `next build` بدون env (مثلاً در CI یا Preview) می‌شکست.
 */
let warnedShortSecret = false;

function getSecret(): Uint8Array {
  const value = process.env.JWT_SECRET?.trim();

  if (!value) {
    throw new Error("JWT_SECRET is not configured");
  }

  // کلید باید با بک‌اند یکی باشد. کلید کوتاه هنوز کار می‌کند (تا ورود فعلی
  // نشکند) ولی هشدار می‌دهد؛ روی هر دو طرف کلید ≥۳۲ کاراکتر بگذارید.
  if (value.length < 32 && !warnedShortSecret) {
    warnedShortSecret = true;
    console.warn("[jwt] JWT_SECRET shorter than 32 characters — rotate it.");
  }

  return new TextEncoder().encode(value);
}

export async function createToken(
  payload: TokenPayload,
  expiresIn: string = "1d",
) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });

    return payload as TokenPayload;
  } catch {
    return null;
  }
}
