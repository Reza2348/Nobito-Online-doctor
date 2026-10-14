/**
 * آیا خطا یعنی «خود Supabase در دسترس نیست؟»
 *
 * خطای پایگاه داده (مثل تکراری بودن یا نبودن دسترسی) کد Postgres دارد
 * و یعنی Supabase روشن است، پس نباید به MongoDB سقوط کنیم.
 */
export function isSupabaseUnavailable(
  error: { message?: string; code?: string } | null | undefined,
  status?: number,
): boolean {
  if (!error) {
    return false;
  }

  if (typeof status === "number" && (status === 0 || status >= 500)) {
    return true;
  }

  if (error.code) {
    return false;
  }

  const message = String(error.message ?? "").toLowerCase();

  // پیام‌هایی که getSupabaseErrorMessage ساخته و کد Postgres دارند، خطای دیتابیس‌اند
  if (/\bcode:\s*\S+/.test(message)) {
    return false;
  }

  return [
    "failed to fetch",
    "fetch failed",
    "networkerror",
    "network request failed",
    "abort",
    "timeout",
  ].some((part) => message.includes(part));
}
