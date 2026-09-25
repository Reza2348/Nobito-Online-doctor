import { cookies } from "next/headers";

import { verifyToken, type TokenPayload } from "@/lib/jwt";

/**
 * بررسی می‌کند که درخواست‌دهنده‌ی فعلی یک ادمین لاگین‌شده است یا نه.
 * کوکی JWT (`auth-token`) را می‌خواند، اعتبارسنجی می‌کند و مطمئن می‌شود role برابر "admin" است.
 *
 * اگر کاربر ادمین نباشد یا توکن معتبر نباشد، null برمی‌گرداند —
 * در این صورت route فراخواننده باید بلافاصله پاسخ 401/403 برگرداند.
 */
export async function getAdmin(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const user = await verifyToken(token);

    if (!user) {
      return null;
    }

    if (user.role !== "admin") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("[getAdmin] Authentication error:", error);

    return null;
  }
}
