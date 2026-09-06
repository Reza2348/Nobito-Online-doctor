import type {
  AdminConsultant,
  ConsultantRow as BaseConsultantRow,
} from "@/Types/types";

/**
 * Export مجدد ConsultantRow
 */
export type ConsultantRow = BaseConsultantRow;
export function parseFields(fields: unknown): string[] {
  if (!fields) {
    return [];
  }

  if (Array.isArray(fields)) {
    return fields
      .map(String)
      .map((field) => field.trim())
      .filter(Boolean);
  }

  if (typeof fields === "string") {
    return fields
      .split(/[,،|]/)
      .map((field) => field.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * تبدیل رکورد Supabase به AdminConsultant
 */
export function mapConsultant(consultant: ConsultantRow): AdminConsultant {
  return {
    id: String(consultant.id),
    name: consultant.name ?? "",
    photo_url: consultant.photo_url ?? null,
    specialty: consultant.specialty ?? "",
    rating:
      consultant.rating !== null && consultant.rating !== undefined
        ? Number(consultant.rating)
        : 0,
    fields: parseFields(consultant.fields),
    created_at: consultant.created_at ?? "",
    address: consultant.address ?? null,
  };
}

/**
 * ساخت داده مورد نیاز برای update
 */
export function createConsultantUpdateData(consultant: AdminConsultant) {
  return {
    name: consultant.name.trim(),
    specialty: consultant.specialty.trim(),
    address: consultant.address?.trim() || "",
    fields: parseFields(consultant.fields),
    rating: consultant.rating ?? 0,
  };
}

/**
 * دریافت پیام خطای Supabase
 */
export function getSupabaseErrorMessage(error: {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
}): string {
  return [
    error.message,
    error.details,
    error.hint,
    error.code ? `Code: ${error.code}` : "",
  ]
    .filter(Boolean)
    .join(" | ");
}
