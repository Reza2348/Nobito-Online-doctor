import type { UseFormRegister } from "react-hook-form";

// =========================================================
// CONTACT
// =========================================================

export type ContactFormData = {
  name: string;
  Lastname: string;
  number: string;
  email: string;
  message: string;
};

export type ContactFieldProps = {
  type: "text" | "email" | "tel";
  placeholder: string;
  name: keyof ContactFormData;
  register: UseFormRegister<ContactFormData>;
  error?: string;
};
