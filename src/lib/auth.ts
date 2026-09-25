import type { Role } from "@/Types/types";

interface AuthPayload {
  username: string;

  role: Role;
}

export function verifyToken(token: string | undefined): AuthPayload | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");

    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
