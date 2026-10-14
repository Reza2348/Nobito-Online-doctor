import { supabase } from "@/lib/supabaseClient";
import { isSupabaseUnavailable } from "@/lib/supabaseAvailability";

import type { ProfessionalType } from "@/Types/types";

import { saveProfessionalToMongo } from "./professionalMongo.service";

export interface InsertError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface InsertResult {
  data: Record<string, unknown> | null;
  error: InsertError | null;
  /** true یعنی Supabase در دسترس نبود و فقط در MongoDB ذخیره شد */
  usedFallback: boolean;
}

// اگر Supabase جواب ندهد، قبل از رفتن به MongoDB این‌قدر صبر می‌کنیم
const SUPABASE_TIMEOUT_MS = 8000;

/**
 * ثبت در Supabase، و اگر Supabase خاموش بود ثبت در MongoDB (از طریق بک‌اند).
 * رکوردی که در حالت اضطراری ساخته می‌شود sync_status = "pending" دارد
 * تا بعداً به Supabase منتقل شود.
 */
export async function insertProfessional(
  table: "doctors" | "consultants" | "clinics",
  type: ProfessionalType,
  payload: Record<string, unknown>,
): Promise<InsertResult> {
  let unavailable = false;
  let supabaseError: InsertError | null = null;

  try {
    const result = await supabase
      .from(table)
      .insert(payload)
      .select()
      .abortSignal(AbortSignal.timeout(SUPABASE_TIMEOUT_MS))
      .single();

    if (!result.error) {
      return {
        data: result.data as Record<string, unknown> | null,
        error: null,
        usedFallback: false,
      };
    }

    supabaseError = result.error;
    unavailable = isSupabaseUnavailable(result.error, result.status);
  } catch (thrown) {
    // خطای شبکه که کتابخانه به‌جای برگرداندن، throw کرده
    supabaseError = {
      message: thrown instanceof Error ? thrown.message : String(thrown),
    };
    unavailable = isSupabaseUnavailable(supabaseError);
  }

  // خطای معمولی (مثلاً اعتبارسنجی): همان خطا را برمی‌گردانیم
  if (!unavailable) {
    return { data: null, error: supabaseError, usedFallback: false };
  }

  // ---- Supabase در دسترس نیست: ذخیره در MongoDB ----
  console.warn("SUPABASE UNAVAILABLE, FALLING BACK TO MONGODB:", supabaseError);

  const fallbackId = crypto.randomUUID();

  try {
    const saved = await saveProfessionalToMongo(type, fallbackId, payload, {
      sync_status: "pending",
      // کپی کامل payload برای انتقال دقیق به Supabase بعد از روشن شدن
      raw_payload: payload,
    });

    return {
      data: { ...(saved ?? {}), ...payload, id: fallbackId },
      error: null,
      usedFallback: true,
    };
  } catch (mongoError) {
    console.error("MONGO FALLBACK ERROR:", mongoError);

    return {
      data: null,
      error: {
        message: "Supabase و MongoDB هر دو در دسترس نیستند. کمی بعد دوباره تلاش کنید.",
      },
      usedFallback: false,
    };
  }
}
