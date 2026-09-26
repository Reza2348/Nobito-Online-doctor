import { cookies } from "next/headers";
import { verifyToken, type TokenPayload } from "@/lib/jwt";

export async function getAdmin(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;
    const user = await verifyToken(token);
    if (!user) return null;
    if (user.role !== "admin") return null;
    return user;
  } catch (error) {
    console.error("[getAdmin] Authentication error:", error);
    return null;
  }
}
