/** شماره موبایل ایران: 0912…، 912…، 98912…، +98912… */
export const irPhoneRegex = /^(?:0|98|\+98)?9\d{9}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** نرمال‌سازی به قالب E.164: +989123456789 */
export function normalizePhone(phone: string): string {
  const value = phone.replace(/\s/g, "");

  if (value.startsWith("+98")) return value;
  if (value.startsWith("98")) return `+${value}`;
  if (value.startsWith("09")) return `+98${value.slice(1)}`;
  if (/^9\d{9}$/.test(value)) return `+98${value}`;

  return value;
}

/** قالب محلی موردنیاز اغلب سرویس‌های پیامک: 09123456789 */
export function toLocalPhone(e164: string): string {
  return `0${e164.replace(/^\+98/, "")}`;
}

/** تشخیص و نرمال‌سازی ایمیل یا موبایل؛ در غیر این صورت null */
export function parseIdentifier(
  raw: string,
): { kind: "email" | "phone"; value: string } | null {
  const compact = raw.replace(/\s/g, "");

  if (emailRegex.test(compact.toLowerCase())) {
    return { kind: "email", value: compact.toLowerCase() };
  }

  if (irPhoneRegex.test(compact)) {
    return { kind: "phone", value: normalizePhone(compact) };
  }

  return null;
}
