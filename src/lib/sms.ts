import "server-only";

import { toLocalPhone } from "@/lib/phone";

/**
 * ارسال پیامک کد تأیید با سرویس کاوه‌نگار (verify/lookup).
 *
 * متغیرهای محیطی:
 *   KAVENEGAR_API_KEY       کلید API
 *   KAVENEGAR_OTP_TEMPLATE  نام قالب تأییدشده‌ی پیامک (با توکن %token)
 *
 * اگر از سرویس دیگری استفاده می‌کنید فقط همین تابع را عوض کنید.
 */
export interface SendSmsResult {
  ok: boolean;
  error?: string;
}

export function isSmsConfigured(): boolean {
  return Boolean(
    process.env.KAVENEGAR_API_KEY?.trim() &&
      process.env.KAVENEGAR_OTP_TEMPLATE?.trim(),
  );
}

export async function sendOtpSms(
  phoneE164: string,
  code: string,
): Promise<SendSmsResult> {
  const apiKey = process.env.KAVENEGAR_API_KEY?.trim();
  const template = process.env.KAVENEGAR_OTP_TEMPLATE?.trim();

  if (!apiKey || !template) {
    return { ok: false, error: "SMS provider is not configured" };
  }

  try {
    const response = await fetch(
      `https://api.kavenegar.com/v1/${encodeURIComponent(apiKey)}/verify/lookup.json`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          receptor: toLocalPhone(phoneE164),
          token: code,
          template,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );

    const data = (await response.json().catch(() => null)) as {
      return?: { status?: number; message?: string };
    } | null;

    if (!response.ok || data?.return?.status !== 200) {
      return {
        ok: false,
        error: data?.return?.message ?? `SMS status ${response.status}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "SMS request failed",
    };
  }
}
