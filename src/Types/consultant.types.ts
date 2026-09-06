// =========================================================
// CONSULTANT
// =========================================================

export interface Consultant {
  id: number;
  name: string;
  specialty: string;
  photo_url?: string;
  rating?: number;
  fields?: string[];
  bio?: string;
  satisfaction_rate?: number;
  satisfied_patients?: number;
  address?: string;
  phone?: string;
}
