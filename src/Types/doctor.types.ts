// =========================================================
// DOCTOR
// =========================================================

export interface Doctor {
  // MongoDB ObjectId
  _id?: string;

  // Doctor numeric ID
  id: number;

  name: string;

  photo_url: string | null;

  specialty: string;

  patients_satisfied: number;

  address: string;

  fields: string[];

  rating?: string;

  satisfied_percent?: string;

  is_active: boolean;

  // Optional fields used by some frontend components
  bio?: string;

  slug?: string;

  city?: string;

  medical_license_number?: string;
}
