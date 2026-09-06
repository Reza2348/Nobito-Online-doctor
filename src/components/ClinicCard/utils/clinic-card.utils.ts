export function toSafeNumber(
  value: unknown,
  fallback: number | null = null,
): number | null {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

export function formatRating(value: unknown): string {
  const rating = toSafeNumber(value);

  if (rating === null) {
    return "—";
  }

  return rating.toFixed(1).replace(/\.0*$/, "");
}

export function calculateSatisfaction(value: unknown): number | null {
  const rating = toSafeNumber(value);

  if (rating === null) {
    return null;
  }

  return Math.min(100, Math.max(0, Math.round((rating / 5) * 100)));
}

export function formatNumber(value: unknown): string {
  const number = toSafeNumber(value, 0);

  return new Intl.NumberFormat("fa-IR").format(number ?? 0);
}
