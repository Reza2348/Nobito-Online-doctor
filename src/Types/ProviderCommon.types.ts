export type ProviderKind = "doctor" | "clinic" | "consultant";

/**
 * Normalized shape consumed by every shared Provider* component.
 * Doctor / Clinic / Consultant all get mapped into this via the
 * adapters in `adapters.ts`, so the components never need to know
 * which entity type they're rendering.
 */
export interface ProviderCommon {
  id: number | string;
  name?: string;
  specialty?: string;
  bio?: string;
  fields?: string[];
  rating?: number | string;
  photoUrl?: string;
  address?: string;
  phone?: string;
  city?: string;
  medicalLicenseNumber?: string;
  patientsCount?: number | string;
  satisfiedPercent?: number | string;
}
