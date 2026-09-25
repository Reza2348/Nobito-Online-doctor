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

export interface FormData {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  country: string;
  state: string;
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
// LOGIN
// =========================================================

export type IdentifierKind = "email" | "phone" | "neutral";

export interface LoginFormProps {
  onSuccess?: () => void;
}
