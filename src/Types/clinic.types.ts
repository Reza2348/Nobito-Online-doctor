// =========================================================
// CLINIC - PUBLIC
// =========================================================

export type Clinic = {
  // MongoDB ObjectId
  _id?: string;

  // Clinic numeric ID
  id: number;

  name: string;

  photo_url: string | null;

  specialty: string;

  patients_satisfied: number;

  address: string;

  fields: string[];

  rating: number;

  created_at?: string | null;

  satisfied_percent: string;

  is_active: boolean;

  // Optional frontend fields
  phone?: string | null;

  bio?: string | null;

  profile_id?: string | null;
};
