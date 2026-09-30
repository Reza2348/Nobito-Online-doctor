import type { AdminClinic } from "@/Types/types";

import { supabase } from "@/lib/supabaseClient";

const CLINICS_TABLE = "clinics";

// =========================================================
// دریافت لیست کلینیک‌ها (عمومی — خواندنی)
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
// حذف کلینیک (از طریق API محافظت‌شده)
// =========================================================

export async function deleteClinic(id: string): Promise<void> {
  const response = await fetch("/api/admin/clinics", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در حذف کلینیک");
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
// ویرایش کلینیک (از طریق API محافظت‌شده)
// =========================================================

export async function updateClinic(
  id: string,
  updates: UpdateClinicData,
): Promise<AdminClinic> {
  const response = await fetch("/api/admin/clinics", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در ویرایش کلینیک");
  }

  return result.clinic as AdminClinic;
}
