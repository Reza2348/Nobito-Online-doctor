// =========================================================
// PROFESSIONAL
// =========================================================

export type ProfessionalType = "doctor" | "consultant" | "clinic";

export type ProfessionalConsultationType = "online" | "in_person" | "both";

export interface ProfessionalFormData {
  // Personal information
  firstName: string;
  lastName: string;

  // Doctor / Consultant
  specialty: string;

  // Clinic
  name: string;
  type: string;
  services: string;

  // Contact
  phone: string;
  email: string;
  address: string;
  city: string;
  website: string;

  // Professional information
  experience: string;
  bio: string;
  description: string;

  // Consultation
  consultationType: ProfessionalConsultationType;

  // Status
  isActive: boolean;
}

export interface ProfessionalSuccessData {
  id: string;
  name: string;
  specialty: string;
  phone?: string;
  address?: string;
  fields?: string[];
  photo_url?: string | null;
  uploadedUrl?: string | null;
}

export interface ProfessionalFormProps {
  type: ProfessionalType;
  onSuccess?: (data: ProfessionalSuccessData) => void;
}

export const initialProfessionalFormData: ProfessionalFormData = {
  firstName: "",
  lastName: "",
  specialty: "",
  name: "",
  type: "",
  services: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  website: "",
  experience: "",
  bio: "",
  description: "",
  consultationType: "online",
  isActive: true,
};
