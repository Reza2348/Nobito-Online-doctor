/**
 * خروج واقعی از پنل: کوکی httpOnly فقط از سرور پاک می‌شود.
 * حتی اگر درخواست خطا بدهد، کاربر به صفحهٔ ورود هدایت می‌شود.
 */
export async function adminLogout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // قطع شبکه؛ سمت سرور کوکی تا انقضای JWT معتبر می‌ماند
  }
}
