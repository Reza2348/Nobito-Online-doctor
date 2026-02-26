import { supabase } from "@/lib/supabaseClient";
import { Clinic } from "@/Types/types";

/**
 * fetchClinics
 * دریافت لیست کلینیک‌ها از Supabase
 */
export const fetchClinics = async (): Promise<Clinic[]> => {
  const { data, error } = await supabase
    .from("clinics")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);

  // اگر داده‌ای نباشد، آرایه خالی برگردان
  return data || [];
};
