import React, { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";

// =========================================================
// AUTH / USER
// =========================================================

export interface User {
  id: string;
  username: string;
  email: string;
}

export type Role = "admin" | "consultant" | "content";

export interface Account {
  username: string;
  passwordHash: string;
  path: string;
}

// =========================================================
// NAVIGATION
// =========================================================

export interface NavLink {
  href: string;
  label: string;
}

// =========================================================
// FOOTER
// =========================================================

export interface FooterLink {
  name: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// =========================================================
// AUTH FORMS
// =========================================================

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export type FormData = {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  country: string;
  state: string;
};

// =========================================================
// FAQ
// =========================================================

export interface FAQItem {
  question: string;
  answer: string;
}

// =========================================================
// SEARCH
// =========================================================

export interface SearchBoxProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

// =========================================================
// DOCTOR
// =========================================================

export interface Doctor {
  id: number;
  name: string;
  photo_url: string | null;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[];
  rating?: string;
  satisfied_percent?: string;
  bio?: string;
  slug: string;
}

// =========================================================
// SERVICE
// =========================================================

export interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

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

// =========================================================
// OTP
// =========================================================

export interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
}

// =========================================================
// CLINIC
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

// =========================================================
// MENU
// =========================================================

export interface MenuItem {
  id: number;
  title: string;
  icon: IconType;
  href?: string;
}

// =========================================================
// PASSWORD
// =========================================================

export interface PasswordFormData {
  password?: string;
  confirmPassword?: string;
}

// =========================================================
// COMMENTS
// =========================================================

export interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  photo_url: string;
  rating: number;
}

// =========================================================
// APPOINTMENT
// =========================================================

export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  day: string;
  time: string;
}

// =========================================================
// SUPABASE USER
// =========================================================

export type SupabaseUser = {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: {
    phone?: string;
    [key: string]: unknown;
  };
};

// =========================================================
// FEEDBACK
// =========================================================

export type FeedbackTab = "positive" | "negative";

export type DoctorFeedbackPayload = {
  doctor_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

export type ConsultantFeedbackPayload = {
  consultant_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

export type ClinicFeedbackPayload = {
  clinic_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

export type FeedbackOption = string;

// =========================================================
// HISTORY
// =========================================================

export type HistoryIconType = "phone" | "video" | "doctor";

export interface HistoryItem {
  id: number;
  type: string;
  iconType: HistoryIconType;
  doctorName: string;
  specialty: string;
  avatar: string;
  note: string;
  date: string;
}

// =========================================================
// ARTICLES
// =========================================================

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  views: number;
  published: boolean;
  created_at: string;
};

export type PopularArticle = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  display_order: number;
  published?: boolean;
};

// =========================================================
// ADMIN HEALTHCARE
// =========================================================

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
  rating?: number | string | null;
  patients_satisfied?: number | null;
  satisfied_percent?: number | string | null;
}

export interface AdminConsultant {
  id: string;
  name: string;
  photo_url: string;
  role: "مشاور";
  specialty: string;
  fields: string;
  phone: string;
  address: string;
}

export interface AdminClinic {
  id: string;
  name: string;
  photo_url?: string;
  specialty?: string;
  address: string;
  phone: string;
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
  | "settings";

// =========================================================
// MENU CARD
// =========================================================

export interface MenuCardProps {
  title: string;
  description: string;
  icon: IconType;
  color: string;
}

export type FeedbackType = "doctor" | "consultant" | "clinic";

export type FeedbackSentiment = "positive" | "negative";

export interface FeedbackFormProps {
  type: FeedbackType;
  entityId: number | string;
  onSuccess?: () => void;
}

export interface FeedbackFormData {
  rating: number;
  positive_or_negative: FeedbackSentiment;
  options: string[];
  comment: string;
}

export interface FeedbackConfig {
  title: string;
  positiveOptions: string[];
  negativeOptions: string[];
}

export interface FeedbackRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export interface FeedbackTypeSelectorProps {
  value: FeedbackSentiment;
  onChange: (value: FeedbackSentiment) => void;
}

export interface FeedbackOptionsProps {
  options: string[];
  selectedOptions: string[];
  sentiment: FeedbackSentiment;
  onToggle: (option: string) => void;
}

export interface FeedbackCommentProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}
