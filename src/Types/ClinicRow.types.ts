export type ClinicRow = {
  id: string | number;
  name?: string | null;
  specialty?: string | null;
  patients_satisfied?: number | string | null;
  address?: string | null;
  fields?: unknown;
  rating?: number | string | null;
  created_at?: string | null;
  satisfied_percent?: number | string | null;
  photo_url?: string | null;
};
