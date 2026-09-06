import type { AdminClinic } from "@/Types/types";

import { supabase } from "@/lib/supabaseClient";

const CLINICS_TABLE = "clinics";

// =========================================================
// دریافت لیست کلینیک‌ها
// =========================================================

export async function fetchClinics(): Promise<AdminClinic[]> {
  const { data, error } = await supabase
    .from(CLINICS_TABLE)
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("FETCH CLINICS ERROR:", error);

    throw new Error(error.message || "خطا در دریافت لیست کلینیک‌ها");
  }

  return (data ?? []) as AdminClinic[];
}

// =========================================================
// حذف کلینیک
// =========================================================

export async function deleteClinic(id: string): Promise<void> {
  const { error } = await supabase.from(CLINICS_TABLE).delete().eq("id", id);

  if (error) {
    console.error("DELETE CLINIC ERROR:", error);

    throw new Error(error.message || "خطا در حذف کلینیک");
  }
}

// =========================================================
// داده‌های قابل ویرایش کلینیک
// =========================================================

export type UpdateClinicData = Partial<
  Pick<
    AdminClinic,
    | "name"
    | "specialty"
    | "address"
    | "fields"
    | "rating"
    | "patients_satisfied"
    | "satisfied_percent"
  >
>;

// =========================================================
// ویرایش کلینیک
// =========================================================

export async function updateClinic(
  id: string,
  updates: UpdateClinicData,
): Promise<AdminClinic> {
  const { data, error } = await supabase
    .from(CLINICS_TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE CLINIC ERROR:", error);

    throw new Error(error.message || "خطا در ویرایش کلینیک");
  }

  if (!data) {
    throw new Error("کلینیک موردنظر پیدا نشد");
  }

  return data as AdminClinic;
}
