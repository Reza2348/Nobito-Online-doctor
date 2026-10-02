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
