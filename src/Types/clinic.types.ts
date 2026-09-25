// =========================================================
// CLINIC - PUBLIC
// =========================================================

export type Clinic = {
  id: number;
  name: string;
  photo_url: string;
  specialty: string;
  patients_satisfied: number;
  address: string;
  phone?: string;
  fields: string[];
  rating: number;
  satisfied_percent: number;
  bio?: string;
};
