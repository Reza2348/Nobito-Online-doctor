import type { AdminConsultant } from "@/Types/types";

import { supabase } from "@/lib/supabaseClient";

const CONSULTANTS_TABLE = "consultants";

/**
 * دریافت لیست مشاوران
 */
export async function fetchConsultants(): Promise<AdminConsultant[]> {
  const { data, error } = await supabase
    .from(CONSULTANTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("FETCH CONSULTANTS ERROR:", error);

    throw new Error(error.message || "خطا در دریافت لیست مشاوران");
  }

  return (data ?? []) as AdminConsultant[];
}

/**
 * حذف مشاور
 */
export async function deleteConsultant(id: string): Promise<void> {
  const { error } = await supabase
    .from(CONSULTANTS_TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE CONSULTANT ERROR:", error);

    throw new Error(error.message || "خطا در حذف مشاور");
  }
}

/**
 * اطلاعات قابل ویرایش مشاور
 */
export type UpdateConsultantData = Partial<
  Pick<AdminConsultant, "name" | "specialty" | "address" | "fields" | "rating">
>;

/**
 * ویرایش مشاور
 */
export async function updateConsultant(
  id: string,
  updates: UpdateConsultantData,
): Promise<AdminConsultant> {
  const { data, error } = await supabase
    .from(CONSULTANTS_TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE CONSULTANT ERROR:", error);

    throw new Error(error.message || "خطا در ویرایش مشاور");
  }

  if (!data) {
    throw new Error("مشاور موردنظر پیدا نشد");
  }

  return data as AdminConsultant;
}
