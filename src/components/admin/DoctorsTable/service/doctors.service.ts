import { supabase } from "@/lib/supabaseClient";

import type { AdminDoctor } from "@/Types/types";

import {
  getSupabaseErrorMessage,
  mapDoctor,
  type DoctorRow,
} from "@/components/admin/DoctorsTable/utils/doctors.utils";

// =========================================================
// SELECT
// =========================================================

const DOCTOR_SELECT =
  "id, name, specialty, patients_satisfied, address, fields, rating, satisfied_percent, photo_url";

// =========================================================
// UPDATE DATA
// =========================================================

export interface UpdateDoctorData {
  name?: string;
  specialty?: string;
  patients_satisfied?: number | null;
  address?: string;
  fields?: string;
  rating?: number | null;
  satisfied_percent?: number | null;
  photo_url?: string | null;
}

// =========================================================
// FETCH DOCTORS
// =========================================================

export async function fetchDoctors(): Promise<AdminDoctor[]> {
  const { data, error } = await supabase
    .from("doctors")
    .select(DOCTOR_SELECT)
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error("SUPABASE DOCTORS ERROR:", error);

    throw new Error(getSupabaseErrorMessage(error));
  }

  return (data ?? []).map((doctor) => mapDoctor(doctor as DoctorRow));
}

// =========================================================
// DELETE DOCTOR
// =========================================================

export async function deleteDoctor(id: string): Promise<void> {
  const { error } = await supabase.from("doctors").delete().eq("id", id);

  if (error) {
    console.error("DELETE DOCTOR ERROR:", error);

    throw new Error(getSupabaseErrorMessage(error) || "خطا در حذف پزشک");
  }
}

// =========================================================
// UPDATE DOCTOR
// =========================================================

export async function updateDoctor(
  id: string,
  updateData: UpdateDoctorData,
): Promise<AdminDoctor> {
  const { data, error } = await supabase
    .from("doctors")
    .update(updateData)
    .eq("id", id)
    .select(DOCTOR_SELECT)
    .single();

  if (error) {
    console.error("UPDATE DOCTOR ERROR:", error);

    throw new Error(getSupabaseErrorMessage(error) || "خطا در ویرایش پزشک");
  }

  if (!data) {
    throw new Error("ویرایش انجام شد اما اطلاعات جدید دریافت نشد.");
  }

  return mapDoctor(data as DoctorRow);
}
