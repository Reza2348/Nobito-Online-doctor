// =========================================================
// CONSULTANT
// =========================================================

export interface Consultant {
  // MongoDB ObjectId
  _id?: string;

  // Consultant numeric ID
  id: number;

  name: string;

  photo_url?: string | null;

  specialty?: string | null;

  rating?: number | null;

  fields?: string[] | null;

  created_at?: string | null;

  address?: string | null;

  profile_id?: string | null;

  is_active: boolean;

  // Optional frontend fields
  // These are kept only for compatibility with existing components.
  bio?: string | null;

  phone?: string | null;

  medical_license_number?: string | null;

  satisfied_patients?: number | null;

  satisfaction_rate?: number | null;
}
