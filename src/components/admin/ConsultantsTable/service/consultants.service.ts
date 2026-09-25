import { supabase } from "@/lib/supabaseClient";
import type { AdminConsultant } from "@/Types/types";

import {
  createConsultantUpdateData,
  getSupabaseErrorMessage,
  mapConsultant,
  type ConsultantRow,
} from "@/components/admin/ConsultantsTable/utils/consultants.utils";

const CONSULTANT_SELECT =
  "id, name, photo_url, specialty, rating, fields, created_at, address";

/**
 * دریافت تمام مشاوران
 */
export async function fetchConsultants(): Promise<AdminConsultant[]> {
  const { data, error } = await supabase
    .from("consultants")
    .select(CONSULTANT_SELECT)
    .order("id", { ascending: true });

  if (error) {
    console.error("SUPABASE CONSULTANTS ERROR:", error);

    throw new Error(getSupabaseErrorMessage(error) || "خطا در دریافت مشاوران");
  }

  return (data ?? []).map((consultant) =>
    mapConsultant(consultant as ConsultantRow),
  );
}

/**
 * حذف مشاور
 */
export async function deleteConsultant(id: string): Promise<void> {
  const { error } = await supabase.from("consultants").delete().eq("id", id);

  if (error) {
    console.error("DELETE CONSULTANT ERROR:", error);

    throw new Error(getSupabaseErrorMessage(error) || "خطا در حذف مشاور");
  }
}

/**
 * ویرایش مشاور
 */
export async function updateConsultant(
  id: string,
  consultant: AdminConsultant,
): Promise<AdminConsultant> {
  const updateData = createConsultantUpdateData(consultant);

  const { data, error } = await supabase
    .from("consultants")
    .update(updateData)
    .eq("id", id)
    .select(CONSULTANT_SELECT)
    .single();

  if (error) {
    console.error("UPDATE CONSULTANT ERROR:", error);

    throw new Error(
      getSupabaseErrorMessage(error) || "خطا در ویرایش اطلاعات مشاور",
    );
  }

  if (!data) {
    throw new Error("ویرایش انجام شد اما اطلاعات جدید دریافت نشد.");
  }

  return mapConsultant(data as ConsultantRow);
}
