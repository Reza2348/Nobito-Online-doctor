import type { AdminClinic, ClinicRow as BaseClinicRow } from "@/Types/types";

import { parseFields } from "@/components/shared/utils/parse-fields";
import { getSupabaseErrorMessage } from "@/components/shared/utils/supabase-error";

export type ClinicRow = BaseClinicRow;

// re-export برای سازگاری با clinics.service.ts که از همین مسیر import می‌کنه
export { getSupabaseErrorMessage };
export { parseFields as getFields };

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

    fields: parseFields(clinic.fields).join("، "),

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

    fields: parseFields(clinic.fields),

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
