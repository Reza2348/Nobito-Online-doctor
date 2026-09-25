export interface ConsultantRow {
  id: string | number;
  name: string | null;
  photo_url: string | null;
  specialty: string | null;
  rating: number | null;
  fields: unknown;
  created_at: string | null;
  address: string | null;
}
