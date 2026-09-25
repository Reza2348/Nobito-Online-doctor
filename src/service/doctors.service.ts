import type { AdminDoctor } from "@/Types/types";
import { supabase } from "@/lib/supabaseClient";

const DOCTORS_TABLE = "doctors";

/* =========================================================
   Fetch Doctors (عمومی — خواندنی)
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
   Delete Doctor (حالا از طریق API محافظت‌شده)
========================================================= */

export async function deleteDoctor(id: string): Promise<void> {
  const response = await fetch("/api/admin/doctors", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در حذف پزشک");
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
   Update Doctor (حالا از طریق API محافظت‌شده)
========================================================= */

export async function updateDoctor(
  id: string,
  updates: UpdateDoctorData,
): Promise<AdminDoctor> {
  const response = await fetch("/api/admin/doctors", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در ویرایش پزشک");
  }

  return result.doctor as AdminDoctor;
}

/* =========================================================
   Get Doctor By ID (عمومی — خواندنی)
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
