export function safeNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "string") {
    const normalized = value.trim().replace(/,/g, ".").replace("/", ".");

    const numberValue = Number(normalized);

    return Number.isFinite(numberValue) ? numberValue : null;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

export function formatNumber(value: unknown): string {
  const numberValue = safeNumber(value);

  if (numberValue === null) {
    return "ثبت نشده";
  }

  return numberValue.toLocaleString("fa-IR");
}

export function formatRating(value: unknown): string {
  const numberValue = safeNumber(value);

  if (numberValue === null) {
    return "ثبت نشده";
  }

  return numberValue.toLocaleString("fa-IR", {
    minimumFractionDigits: Number.isInteger(numberValue) ? 0 : 1,
    maximumFractionDigits: 2,
  });
}
