export function toSafeNumber(
  value: unknown,
  fallback: number | null = null,
): number | null {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  let normalized = String(value).trim();

  if (!normalized) {
    return fallback;
  }
  normalized = normalized.replace(/[۰-۹]/g, (char) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(char)),
  );

  normalized = normalized.replace(/[٠-٩]/g, (char) =>
    String("٠١٢٣٤٥٦٧٨٩".indexOf(char)),
  );

  normalized = normalized.replace(/,/g, ".").replace(/\//g, ".");

  const number = Number(normalized);

  return Number.isFinite(number) ? number : fallback;
}

export function normalizeRating(value: unknown): number | null {
  const rating = toSafeNumber(value, null);

  if (rating === null) {
    return null;
  }

  return Math.min(5, Math.max(0, rating));
}

export function formatRating(value: unknown): string {
  const rating = normalizeRating(value);

  if (rating === null) {
    return "ثبت نشده";
  }

  return rating.toFixed(1).replace(/\.0$/, "");
}

export function calculateSatisfaction(value: unknown): number | null {
  const rating = normalizeRating(value);

  if (rating === null) {
    return null;
  }

  return Math.round((rating / 5) * 100);
}
