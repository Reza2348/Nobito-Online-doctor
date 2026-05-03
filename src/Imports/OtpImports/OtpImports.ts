"use client";

export { useState, useRef, useEffect } from "react";
export type {
  FC,
  KeyboardEvent,
  ClipboardEvent,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";

export { useRouter } from "next/navigation";

export { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export { supabase } from "@/lib/supabaseClient";

export { OtpCard } from "@/components/Otp/OtpCard/OtpCard";
export { OtpInput } from "@/components/Otp/OtpInput/OtpInput";

export type { OtpInputProps } from "@/Types/types";
