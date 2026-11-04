import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";

interface SendOtpResponse {
  success: boolean;
  message: string;
}

export async function sendLoginOtp(email: string): Promise<SendOtpResponse> {
  try {
    const { data } = await axiosClient.post<SendOtpResponse>(
      "/api/auth/send-otp",
      {
        email,
      },
    );

    return data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "خطا در ارسال کد تأیید"));
  }
}

/** ارسال کد پیامکی از مسیر همین اپلیکیشن (نه بک‌اند جدا) */
export async function sendPhoneOtp(phone: string): Promise<SendOtpResponse> {
  const response = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: phone }),
  });

  const data = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  if (!response.ok) {
    throw new Error(data?.error ?? "خطا در ارسال کد تأیید");
  }

  return { success: true, message: "" };
}
