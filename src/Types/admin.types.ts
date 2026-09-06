// =========================================================
// ADMIN HEALTHCARE
// =========================================================

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface AdminDoctor {
  id: string;
  name: string;
  photo_url: string;
  role: "پزشک";
  specialty: string;
  fields: string;
  phone: string;
  address: string;
  city?: string | null;
  medical_license_number?: string | null;
  rating?: number | null;
  patients_satisfied?: number | null;
  satisfied_percent?: number | string | null;
}

export interface AdminConsultant {
  id: string;
  name: string;
  specialty: string;
  rating: number | null;
  fields: string[] | string | null;
  created_at: string;
  address: string | null;
  photo_url: string | null;
}

// =========================================================
// ADMIN CLINIC
// =========================================================

export interface AdminClinic {
  id: string;
  name: string;
  photo_url: string | null;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[] | string | null;
  rating: number | null;
  created_at: string;
  satisfied_percent: number | null;
}

// =========================================================
// ADMIN APPOINTMENT
// =========================================================

export type AdminAppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface AdminAppointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: AdminAppointmentStatus;
}

// =========================================================
// ADMIN PAGE
// =========================================================

export type AdminPage =
  | "dashboard"
  | "users"
  | "doctors"
  | "consultants"
  | "clinics"
  | "appointments"
  | "settings"
  | "add";
