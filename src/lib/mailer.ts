/**
 * ارسال ایمیل با Resend (مستقل از Supabase).
 * فقط روی سرور استفاده شود.
 *
 * متغیرهای محیطی:
 * RESEND_API_KEY - کلید API از Resend
 * MAIL_FROM      - فرستنده تأییدشده؛ اختیاری در حالت Sandbox
 */

const RESEND_URL = "https://api.resend.com/emails";
const SANDBOX_FROM = "Nobito <onboarding@resend.dev>";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return {
      ok: false,
      error: "RESEND_API_KEY is not configured",
    };
  }

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM?.trim() || SANDBOX_FROM,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.text ? { text: input.text } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      return {
        ok: false,
        error: body.message || `Resend status ${response.status}`,
      };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function otpEmailTemplate(code: string): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: "کد ورود به نوبیتو",
    text: `کد ورود شما: ${code}\nاین کد تا چند دقیقه معتبر است.`,
    html: `<div dir="rtl" style="font-family:Tahoma,sans-serif">
      <p>کد ورود شما:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:6px">${code}</p>
      <p>این کد تا چند دقیقه معتبر است. اگر شما درخواست نداده‌اید، این ایمیل را نادیده بگیرید.</p>
    </div>`,
  };
}
