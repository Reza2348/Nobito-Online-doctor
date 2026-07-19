import React from "react";
import { IconType } from "react-icons";
import { Dispatch, SetStateAction } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface NavLink {
  href: string;
  label: string;
}

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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SearchBoxProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

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

export interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

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
}

export interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  isSubmitting: boolean;
}

export type Clinic = {
  id: number;
  name: string;
  photo_url: string;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[];
  rating: number;
  satisfied_percent: number;
  bio?: string;
};

export interface MenuItem {
  id: number;
  title: string;
  icon: IconType;
  href?: string;
}

export interface PasswordFormData {
  password?: string;
  confirmPassword?: string;
}

export interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  photo_url: string;
  rating: number;
}

export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  day: string;
  time: string;
}

export type SupabaseUser = {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: {
    phone?: string;
    [key: string]: any;
  };
};

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

export type AppointmentIconType = "phone" | "video" | "doctor";

export interface AppointmentHistoryItem {
  id: number;
  type: string;
  iconType: AppointmentIconType;
  doctorName: string;
  specialty: string;
  avatar: string;
  note: string;
  date: string;
}

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
