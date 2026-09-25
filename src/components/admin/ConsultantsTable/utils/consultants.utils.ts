import type {
  AdminConsultant,
  ConsultantRow as BaseConsultantRow,
} from "@/Types/types";

import { parseFields } from "@/components/shared/utils/parse-fields";
import { getSupabaseErrorMessage } from "@/components/shared/utils/supabase-error";

/**
 * Export مجدد ConsultantRow
 */
export type ConsultantRow = BaseConsultantRow;

// re-export برای سازگاری با consultants.service.ts که از همین مسیر import می‌کنه
export { parseFields, getSupabaseErrorMessage };

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
