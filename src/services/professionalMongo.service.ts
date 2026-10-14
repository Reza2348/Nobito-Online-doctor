import axios from "axios";

import type { ProfessionalType } from "@/Types/types";

/**
 * ثبت پزشک، مشاور یا کلینیک در MongoDB (از طریق بک‌اند)
 * supabaseId همان id رکورد Supabase است تا دو دیتابیس به هم وصل بمانند.
 *
 * extra: فیلدهای اضافه، مثلاً { sync_status: "pending" } وقتی Supabase خاموش است.
 */
export async function saveProfessionalToMongo(
  type: ProfessionalType,
  supabaseId: string,
  payload: Record<string, unknown>,
  extra: Record<string, unknown> = {},
): Promise<Record<string, unknown> | null> {
  const response = await axios.post(
    "/api/admin/professionals/mongo",
    {
      type,
      data: { ...payload, ...extra, supabase_id: supabaseId },
    },
    { timeout: 60000 },
  );

  return (response.data?.data as Record<string, unknown>) ?? null;
}

/**
 * ثبت آدرس عکس در MongoDB
 */
export async function updateMongoPhotoUrl(
  type: ProfessionalType,
  supabaseId: string,
  photoUrl: string,
): Promise<void> {
  await axios.patch(
    "/api/admin/professionals/mongo",
    {
      type,
      data: { supabase_id: supabaseId, photo_url: photoUrl },
    },
    { timeout: 60000 },
  );
}

/**
 * آپلود عکس در MongoDB (وقتی Supabase Storage در دسترس نیست)
 * آدرس عمومی عکس را برمی‌گرداند.
 */
export async function uploadPhotoToMongo(
  file: File,
  type: ProfessionalType,
  supabaseId: string,
): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);
  formData.append("professionalId", supabaseId);

  const response = await axios.post(
    "/api/admin/professionals/mongo-photo",
    formData,
    { timeout: 60000 },
  );

  const url = response.data?.url;

  if (typeof url !== "string" || !url.trim()) {
    throw new Error("آدرس عکس از سرور دریافت نشد.");
  }

  return url.trim();
}
