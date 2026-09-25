import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import type { Role } from "@/Types/types";

export interface TokenPayload extends JWTPayload {
  username: string;
  role: Role;
}

const secretValue = process.env.JWT_SECRET;

if (!secretValue) {
  throw new Error("JWT_SECRET is not configured");
}

const secret = new TextEncoder().encode(secretValue);

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
    .sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload as TokenPayload;
  } catch {
    return null;
  }
}
