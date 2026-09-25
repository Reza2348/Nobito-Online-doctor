// =========================================================
// DOCTOR
// =========================================================

export interface Doctor {
  id: number;
  name: string;
  photo_url: string | null;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[];
  rating?: string;
  satisfied_percent?: string;
  bio?: string;
  slug: string;
  city?: string;
  medical_license_number?: string;
}
