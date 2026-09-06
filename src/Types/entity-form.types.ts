import type { AdminClinic, AdminConsultant, AdminDoctor } from "@/Types/types";

// =========================================================
// ENTITY TYPE
// =========================================================

export type EntityType = "doctor" | "consultant" | "clinic";

// =========================================================
// ENTITY DATA
// =========================================================

export type EntityData = AdminDoctor | AdminConsultant | AdminClinic;

// =========================================================
// FORM DATA
// =========================================================

export interface EntityFormData {
  name?: string;
  specialty?: string;

  address?: string | null;

  fields?: string | string[] | null;

  rating?: number | string | null;

  patients_satisfied?: number | null;

  satisfied_percent?: number | string | null;

  photo_url?: string | null;

  phone?: string;

  city?: string | null;

  medical_license_number?: string | null;

  role?: "پزشک";

  created_at?: string;

  [key: string]: unknown;
}

// =========================================================
// FIELD TYPE
// =========================================================

export type EntityFieldType = "text" | "textarea" | "number" | "tags" | "url";

// =========================================================
// FIELD CONFIG
// =========================================================

export interface EntityFieldConfig {
  name: string;
  label: string;
  type: EntityFieldType;

  placeholder?: string;

  required?: boolean;

  min?: number;
  max?: number;
  step?: number;

  rows?: number;

  description?: string;
}

// =========================================================
// FORM PROPS
// =========================================================

export interface EntityFormProps<T extends EntityData = EntityData> {
  entity: EntityType;

  data: T;

  saving?: boolean;

  onClose: () => void;

  onSave: (data: T) => void | Promise<void>;
}
