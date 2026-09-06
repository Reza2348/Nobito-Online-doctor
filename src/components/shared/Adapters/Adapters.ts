import type { Doctor, Clinic, Consultant, ProviderCommon } from "@/Types/types";

/**
 * Several source fields come from the database typed as `string | null`
 * (Supabase/Postgres convention), while ProviderCommon uses the more
 * React-friendly `string | undefined`. This normalizes null -> undefined
 * for any field we pass through.
 */
function n<T>(value: T | null | undefined): T | undefined {
  return value === null ? undefined : value;
}

export const fromDoctor = (doctor: Doctor): ProviderCommon => ({
  id: doctor.id,
  name: n(doctor.name),
  specialty: n(doctor.specialty),
  bio: n((doctor as any).bio),
  fields: n(doctor.fields) ?? [],
  rating: n(doctor.rating),
  photoUrl: n(doctor.photo_url),
  address: n(doctor.address),
  phone: n((doctor as any).phone),
  city: n(doctor.city),
  medicalLicenseNumber: n(doctor.medical_license_number),
  patientsCount: n(doctor.patients_satisfied),
  satisfiedPercent: n(doctor.satisfied_percent),
});

export const fromClinic = (clinic: Clinic): ProviderCommon => ({
  id: clinic.id,
  name: n(clinic.name),
  specialty: n(clinic.specialty),
  bio: n(clinic.bio),
  fields: n(clinic.fields) ?? [],
  rating: n(clinic.rating),
  photoUrl: n(clinic.photo_url),
  address: n(clinic.address),
  phone: n(clinic.phone),
  city: "city" in clinic ? n((clinic as any).city) : undefined,
  medicalLicenseNumber:
    "medical_license_number" in clinic
      ? n((clinic as any).medical_license_number)
      : undefined,
  patientsCount: n(clinic.patients_satisfied),
  satisfiedPercent: n(clinic.satisfied_percent),
});

export const fromConsultant = (consultant: Consultant): ProviderCommon => ({
  id: consultant.id,
  name: n(consultant.name),
  specialty: n(consultant.specialty),
  bio: n(consultant.bio),
  fields: n(consultant.fields) ?? [],
  rating: n(consultant.rating),
  photoUrl: n(consultant.photo_url),
  address: n(consultant.address),
  phone: n(consultant.phone),
  // Consultant type may not carry this field today — safe optional read.
  medicalLicenseNumber: n((consultant as any).medical_license_number),
  patientsCount: n(consultant.satisfied_patients),
  satisfiedPercent: n(consultant.satisfaction_rate),
});
