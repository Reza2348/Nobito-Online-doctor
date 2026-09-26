interface SupabaseErrorLike {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
}

/**
 * تبدیل خطای Supabase به یک پیام قابل نمایش.
 * جایگزین getSupabaseErrorMessage در clinics.utils.ts / consultants.utils.ts / doctors.utils.ts
 *
 * fallback اختیاریه: نسخه‌ی Clinics ازش استفاده می‌کرد، نسخه‌ی Consultant/Doctor نه.
 * چون پیش‌فرضش رشته‌ی خالیه، جایگزینی این تابع برای هر سه‌جا بدون تغییر رفتار انجام می‌شه.
 */
export function getSupabaseErrorMessage(
  error: SupabaseErrorLike,
  fallback = "",
): string {
  return (
    [
      error.message,
      error.details,
      error.hint,
      error.code ? `Code: ${error.code}` : "",
    ]
      .filter(Boolean)
      .join(" | ") || fallback
  );
}
