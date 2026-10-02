import type { Doctor, Clinic, Consultant, ProviderCommon } from "@/Types/types";

/**
 * Normalize null -> undefined.
 */
function n<T>(value: T | null | undefined): T | undefined {
  return value === null ? undefined : value;
}

// =========================================================
// DOCTOR
// =========================================================

export const fromDoctor = (doctor: Doctor): ProviderCommon => ({
  id: doctor.id,
  name: n(doctor.name),
  specialty: n(doctor.specialty),
  bio: n(doctor.bio),
  fields: n(doctor.fields) ?? [],
  rating: n(doctor.rating),
  photoUrl: n(doctor.photo_url),
  address: n(doctor.address),
  city: n(doctor.city),
  medicalLicenseNumber: n(doctor.medical_license_number),
  patientsCount: n(doctor.patients_satisfied),
  satisfiedPercent: n(doctor.satisfied_percent),
});

// =========================================================
// CLINIC
// =========================================================

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

  patientsCount: n(clinic.patients_satisfied),

  satisfiedPercent: n(clinic.satisfied_percent),
});

// =========================================================
// CONSULTANT
// =========================================================

export const fromConsultant = (consultant: Consultant): ProviderCommon => ({
  id: consultant.id,

  name: n(consultant.name),

  specialty: n(consultant.specialty),

  bio: n(consultant.bio),

  fields: n(consultant.fields) ?? [],

  rating: n(consultant.rating),

  photoUrl: n(consultant.photo_url),

  address: n(consultant.address),

  medicalLicenseNumber: n(consultant.medical_license_number),

  patientsCount: n(consultant.satisfied_patients),

  satisfiedPercent: n(consultant.satisfaction_rate),
});
