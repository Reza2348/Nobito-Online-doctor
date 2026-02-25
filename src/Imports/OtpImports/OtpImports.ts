// "@/Imports/OtpImports/OtpImports.ts"
"use client";

// React و هوک‌ها
export { useState, useRef, useEffect } from "react";
export type {
  FC,
  KeyboardEvent,
  ClipboardEvent,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";

// Next.js
export { useRouter } from "next/navigation";

// Toast
export { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Supabase
export { supabase } from "@/lib/supabaseClient";

// کامپوننت‌ها
export { OtpCard } from "@/components/Otp/OtpCard/OtpCard";
export { OtpInput } from "@/components/Otp/OtpInput/OtpInput";

// تایپ‌ها
export type { OtpInputProps } from "@/Types/types";
