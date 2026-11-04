import "server-only";

import { redirect } from "next/navigation";

import {
  BACKEND_URL,
  getVerifiedUser,
  signBackendToken,
} from "@/lib/backendUser";

import type { Prescription } from "@/Types/types";

/**
 * نسخهٔ واقعی کاربر واردشده، از بک‌اند.
 *
 * - کاربر واردنشده → هدایت به صفحهٔ ورود (و بازگشت به همین نسخه)
 * - نسخه وجود ندارد یا متعلق به کاربر دیگری است → null (بک‌اند 404 می‌دهد)
 * - خطای بک‌اند → استثنا، تا error.tsx نمایش داده شود
 */
export async function getPrescriptionById(
  id: string,
): Promise<Prescription | null> {
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    return null;
  }

  const user = await getVerifiedUser();

  if (!user) {
    redirect(
      `/auth/signup?redirect=${encodeURIComponent(`/patient/prescriptions/${id}`)}`,
    );
  }

  const token = await signBackendToken(user);

  const response = await fetch(
    `${BACKEND_URL}/api/me/prescriptions/${encodeURIComponent(id)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (response.status === 404 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`خواندن نسخه ناموفق بود (${response.status})`);
  }

  const data = (await response.json()) as { prescription?: Prescription };

  return data.prescription ?? null;
}
