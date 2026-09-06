import type { AdminDoctor } from "@/Types/types";
import { supabase } from "@/lib/supabaseClient";

const DOCTORS_TABLE = "doctors";

/* =========================================================
   Fetch Doctors
========================================================= */

export async function fetchDoctors(): Promise<AdminDoctor[]> {
  const { data, error } = await supabase.from(DOCTORS_TABLE).select("*");

  if (error) {
    console.error("FETCH DOCTORS ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(error.message || "خطا در دریافت لیست پزشکان");
  }

  return (data ?? []) as AdminDoctor[];
}

/* =========================================================
   Delete Doctor
========================================================= */

export async function deleteDoctor(id: string): Promise<void> {
  const { error } = await supabase.from(DOCTORS_TABLE).delete().eq("id", id);

  if (error) {
    console.error("DELETE DOCTOR ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(error.message || "خطا در حذف پزشک");
  }
}

/* =========================================================
   Update Doctor Type
========================================================= */

export type UpdateDoctorData = Partial<
  Pick<
    AdminDoctor,
    | "name"
    | "specialty"
    | "address"
    | "fields"
    | "rating"
    | "patients_satisfied"
    | "satisfied_percent"
    | "photo_url"
  >
>;

/* =========================================================
   Update Doctor
========================================================= */

export async function updateDoctor(
  id: string,
  updates: UpdateDoctorData,
): Promise<AdminDoctor> {
  const { data, error } = await supabase
    .from(DOCTORS_TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE DOCTOR ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(error.message || "خطا در ویرایش پزشک");
  }

  if (!data) {
    throw new Error("پزشک موردنظر پیدا نشد");
  }

  return data as AdminDoctor;
}

/* =========================================================
   Get Doctor By ID
========================================================= */

export async function getDoctorById(id: string): Promise<AdminDoctor | null> {
  const { data, error } = await supabase
    .from(DOCTORS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("GET DOCTOR ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(error.message || "خطا در دریافت اطلاعات پزشک");
  }

  return data as AdminDoctor | null;
}
