import type { ProfessionalFormData, ProfessionalType } from "@/Types/types";

function getFields(value: string): string[] {
  return value
    .split(/[,،|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}

export function buildProfessionalPayload(
  data: ProfessionalFormData,
  type: ProfessionalType,
  photoUrl: string | null,
) {
  if (type === "doctor") {
    return {
      name: getFullName(data.firstName, data.lastName),

      specialty: data.specialty.trim(),

      patients_satisfied: 0,

      address: data.address.trim(),

      fields: [data.specialty.trim()],

      rating: 0,

      satisfied_percent: 0,

      photo_url: photoUrl,
    };
  }

  if (type === "consultant") {
    return {
      name: getFullName(data.firstName, data.lastName),

      specialty: data.specialty.trim(),

      fields: [data.specialty.trim()],

      address: data.address.trim(),

      rating: 0,

      photo_url: photoUrl,
    };
  }

  return {
    name: data.name.trim(),

    specialty: data.type.trim(),

    patients_satisfied: 0,

    address: data.address.trim(),

    fields: getFields(data.services),

    rating: 0,

    satisfied_percent: 0,
  };
}
