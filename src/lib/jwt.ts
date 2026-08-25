import { SignJWT, jwtVerify, type JWTPayload } from "jose";

import type { Role } from "@/Types/types";

export interface TokenPayload extends JWTPayload {
  username: string;

  role: Role;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: TokenPayload) {
  return await new SignJWT(payload)

    .setProtectedHeader({
      alg: "HS256",
    })

    .setIssuedAt()

    .setExpirationTime("1d")

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
