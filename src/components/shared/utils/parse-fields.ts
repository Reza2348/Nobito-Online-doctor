/**
 * پارس کردن فیلد fields که ممکنه آرایه، JSON stringify شده، یا رشته‌ی جداشده با کاما/پایپ باشه.
 * جایگزین:
 *  - getFields در clinics.utils.ts
 *  - parseFields در consultants.utils.ts
 *  - parseFields در doctors.utils.ts
 */
export function parseFields(fields: unknown): string[] {
  if (!fields) {
    return [];
  }

  if (Array.isArray(fields)) {
    return fields.map((field) => String(field).trim()).filter(Boolean);
  }

  const value = String(fields).trim();

  if (!value) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.map((field) => String(field).trim()).filter(Boolean);
    }
  } catch {
    // مقدار JSON نیست، ادامه می‌دیم به split کردن
  }

  return value
    .split(/[,،|]/)
    .map((field) => field.trim())
    .filter(Boolean);
}

// نام قدیمی ClinicsTable برای سازگاری در طول انتقال
export { parseFields as getFields };
