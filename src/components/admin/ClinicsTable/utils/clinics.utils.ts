import type { AdminClinic, ClinicRow } from "@/Types/types";
export function getFields(fields: ClinicRow["fields"]): string[] {
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
  } catch {}

  return value
    .split(/[,،|]/)
    .map((field) => field.trim())
    .filter(Boolean);
}

/**
 * تبدیل ClinicRow به AdminClinic
 */
export function mapClinic(clinic: ClinicRow): AdminClinic {
  return {
    id: String(clinic.id),

    name: clinic.name ?? "",

    specialty: clinic.specialty ?? "",

    patients_satisfied:
      clinic.patients_satisfied !== null &&
      clinic.patients_satisfied !== undefined
        ? Number(clinic.patients_satisfied)
        : 0,

    address: clinic.address ?? "",

    fields: getFields(clinic.fields).join("، "),

    rating:
      clinic.rating !== null && clinic.rating !== undefined
        ? Number(clinic.rating)
        : null,

    created_at: clinic.created_at ?? "",

    satisfied_percent:
      clinic.satisfied_percent !== null &&
      clinic.satisfied_percent !== undefined
        ? Number(clinic.satisfied_percent)
        : null,

    photo_url: clinic.photo_url ?? null,
  };
}

/**
 * آماده‌سازی اطلاعات برای update در Clinic
 */
export function createClinicUpdateData(clinic: AdminClinic) {
  return {
    name: clinic.name?.trim() ?? "",

    specialty: clinic.specialty?.trim() ?? "",

    patients_satisfied: Number(clinic.patients_satisfied ?? 0),

    address: clinic.address?.trim() ?? "",

    fields: getFields(clinic.fields),

    rating:
      clinic.rating !== null && clinic.rating !== undefined
        ? Number(clinic.rating)
        : 0,

    satisfied_percent:
      clinic.satisfied_percent !== null &&
      clinic.satisfied_percent !== undefined
        ? Number(clinic.satisfied_percent)
        : 0,

    photo_url: clinic.photo_url ?? null,
  };
}

/**
 * تبدیل خطای Supabase به پیام قابل نمایش
 */
export function getSupabaseErrorMessage(
  error: {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
  },
  fallback: string,
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
