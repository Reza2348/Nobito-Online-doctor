export interface DoctorRow {
  id: string | number;
  name: string | null;
  specialty: string | null;
  patients_satisfied: number | null;
  address: string | null;
  fields: unknown;
  rating: number | null;
  satisfied_percent: number | null;
  photo_url: string | null;
}

export interface EditDoctorFormData {
  name: string;
  specialty: string;
  address: string;
  fields: string;
  rating: string;
  satisfied_percent: string;
}
