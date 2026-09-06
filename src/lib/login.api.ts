interface SendOtpResponse {
  channel: "email" | "phone";
}

export async function sendLoginOtp(
  identifier: string,
): Promise<SendOtpResponse> {
  const response = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "خطا در ارسال لینک یا کد تایید");
  }

  return result;
}
