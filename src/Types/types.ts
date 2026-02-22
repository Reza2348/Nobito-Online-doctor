// types.ts

// ===== User =====
export interface User {
  id: string;
  username: string;
  email: string;
}

// ===== Navigation =====
export interface NavLink {
  href: string;
  label: string;
}

// ===== Footer =====
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

// ===== Auth Forms =====
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

// src/types/formData.ts
export type FormData = {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  country: string;
  state: string;
};

// اگر هنوز تعریف نشده
export interface FAQItem {
  question: string;
  answer: string;
}

export interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
}
export interface Doctor {
  id: number;
  name: string;
  photo_url: string | null;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[];
}
