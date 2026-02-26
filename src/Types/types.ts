// types.ts
import React from "react";

// =======================
// ===== User =====
// =======================
export interface User {
  id: string;
  username: string;
  email: string;
}

// =======================
// ===== Navigation =====
// =======================
export interface NavLink {
  href: string;
  label: string;
}

// =======================
// ===== Footer =====
// =======================
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

// =======================
// ===== Auth Forms =====
// =======================
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

// =======================
// ===== General Form Data =====
// =======================
export type FormData = {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  country: string;
  state: string;
};

// =======================
// ===== FAQ =====
// =======================
export interface FAQItem {
  question: string;
  answer: string;
}

// =======================
// ===== Search Box =====
// =======================
export interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
}

// =======================
// ===== Doctor =====
// =======================
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
}

// =======================
// ===== Service =====
// =======================
export interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// =======================
// ===== Consultant =====
// =======================
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

// =======================
// ===== OTP Input =====
// =======================
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
  bio?: string; // <-- اضافه شد
};
