import type {
  AdminDoctor,
  EditDoctorFormData,
  DoctorRow as BaseDoctorRow,
} from "@/Types/types";

import { parseFields } from "@/components/shared/utils/parse-fields";
import { getSupabaseErrorMessage } from "@/components/shared/utils/supabase-error";

export type DoctorRow = BaseDoctorRow;

// re-export برای سازگاری با doctors.service.ts که از همین مسیر import می‌کنه
export { parseFields, getSupabaseErrorMessage };

export function mapDoctor(doctor: DoctorRow): AdminDoctor {
  return {
    id: String(doctor.id),

    name: doctor.name ?? "",

    photo_url: doctor.photo_url ?? "",

    role: "پزشک",

    specialty: doctor.specialty ?? "",

    fields: parseFields(doctor.fields).join("، "),

    phone: "",

    address: doctor.address ?? "",

    rating:
      doctor.rating !== null && doctor.rating !== undefined
        ? Number(doctor.rating)
        : null,

    patients_satisfied:
      doctor.patients_satisfied !== null &&
      doctor.patients_satisfied !== undefined
        ? Number(doctor.patients_satisfied)
        : 0,

    satisfied_percent:
      doctor.satisfied_percent !== null &&
      doctor.satisfied_percent !== undefined
        ? Number(doctor.satisfied_percent)
        : null,
  };
}

export function validateDoctorForm(
  formData: EditDoctorFormData,
): string | null {
  const name = formData.name.trim();
  const specialty = formData.specialty.trim();

  const rating = Number(formData.rating);
  const satisfiedPercent = Number(formData.satisfied_percent);

  if (!name) {
    return "نام پزشک را وارد کنید.";
  }

  if (!specialty) {
    return "تخصص پزشک را وارد کنید.";
  }

  if (Number.isNaN(rating)) {
    return "امتیاز باید عدد باشد.";
  }

  if (rating < 0 || rating > 5) {
    return "امتیاز باید بین ۰ تا ۵ باشد.";
  }

  if (Number.isNaN(satisfiedPercent)) {
    return "درصد رضایت باید عدد باشد.";
  }

  if (satisfiedPercent < 0 || satisfiedPercent > 100) {
    return "درصد رضایت باید بین 0 تا 100 باشد.";
  }

  return null;
}

export function createDoctorUpdateData(formData: EditDoctorFormData) {
  return {
    name: formData.name.trim(),

    specialty: formData.specialty.trim(),

    address: formData.address.trim(),

    fields: parseFields(formData.fields),

    rating: Number(formData.rating),

    satisfied_percent: Number(formData.satisfied_percent),
  };
}
