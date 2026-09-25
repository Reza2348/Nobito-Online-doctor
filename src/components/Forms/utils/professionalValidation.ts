import type { ProfessionalFormData, ProfessionalType } from "@/Types/types";

export function validateProfessionalForm(
  data: ProfessionalFormData,
  type: ProfessionalType,
): string | null {
  // =========================
  // CLINIC
  // =========================

  if (type === "clinic") {
    if (!data.name.trim()) {
      return "نام کلینیک الزامی است.";
    }

    if (!data.type.trim()) {
      return "نوع کلینیک را وارد کنید.";
    }

    if (!data.phone.trim()) {
      return "شماره تماس الزامی است.";
    }

    return null;
  }

  // =========================
  // DOCTOR / CONSULTANT
  // =========================

  if (!data.firstName.trim()) {
    return "نام الزامی است.";
  }

  if (!data.lastName.trim()) {
    return "نام خانوادگی الزامی است.";
  }

  if (!data.specialty.trim()) {
    return "تخصص الزامی است.";
  }

  if (!data.phone.trim()) {
    return "شماره تماس الزامی است.";
  }

  return null;
}
