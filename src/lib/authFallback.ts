import { mongoRequest } from "@/services/mongoFallback.service";

export interface SessionUser {
  id?: string;
  _id?: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

interface SessionResponse {
  success?: boolean;
  user?: SessionUser | null;
  data?: SessionUser | { user?: SessionUser | null } | null;
  message?: string;
}

/**
 * دریافت کاربر از نشست مستقل بک‌اند.
 *
 * مسیر پیش‌فرض:
 * GET /api/auth/session
 *
 * اگر بک‌اند شما مسیر دیگری برای نشست دارد،
 * مقدار SESSION_ENDPOINT را تغییر دهید.
 */
const SESSION_ENDPOINT = "/api/auth/session";

export async function fetchSessionUser(): Promise<SessionUser | null> {
  try {
    const result = await mongoRequest<SessionResponse>("GET", SESSION_ENDPOINT);

    if (!result || typeof result !== "object") {
      return null;
    }

    const candidate =
      result.user ??
      (result.data && typeof result.data === "object" && "user" in result.data
        ? result.data.user
        : result.data);

    if (
      !candidate ||
      typeof candidate !== "object" ||
      !("email" in candidate) ||
      typeof candidate.email !== "string"
    ) {
      return null;
    }

    return candidate as SessionUser;
  } catch {
    // کاربر وارد نشده یا نشست مستقل در دسترس نیست.
    return null;
  }
}
