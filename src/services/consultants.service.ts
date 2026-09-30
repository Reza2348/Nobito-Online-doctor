import type { AdminConsultant } from "@/Types/types";

import { supabase } from "@/lib/supabaseClient";

const CONSULTANTS_TABLE = "consultants";

/**
 * دریافت لیست مشاوران (عمومی — خواندنی)
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
 * حذف مشاور (از طریق API محافظت‌شده)
 */
export async function deleteConsultant(id: string): Promise<void> {
  const response = await fetch("/api/admin/consultants", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در حذف مشاور");
  }
}

/**
 * اطلاعات قابل ویرایش مشاور
 */
export type UpdateConsultantData = Partial<
  Pick<AdminConsultant, "name" | "specialty" | "address" | "fields" | "rating">
>;

/**
 * ویرایش مشاور (از طریق API محافظت‌شده)
 */
export async function updateConsultant(
  id: string,
  updates: UpdateConsultantData,
): Promise<AdminConsultant> {
  const response = await fetch("/api/admin/consultants", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "خطا در ویرایش مشاور");
  }

  return result.consultant as AdminConsultant;
}
