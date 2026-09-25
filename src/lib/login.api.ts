import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";

interface SendOtpResponse {
  channel: "email" | "phone";
}

export async function sendLoginOtp(
  identifier: string,
): Promise<SendOtpResponse> {
  try {
    const { data } = await axiosClient.post<SendOtpResponse>(
      "/api/auth/send-otp",
      { identifier },
    );

    return data;
  } catch (error) {
    throw new Error(
      getAxiosErrorMessage(error, "خطا در ارسال لینک یا کد تایید"),
    );
  }
}
