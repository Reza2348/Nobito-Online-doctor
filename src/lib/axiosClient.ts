import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "",
  withCredentials: true,
});

export function getAxiosErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | {
          error?: string;
          message?: string;
        }
      | undefined;

    return data?.error ?? data?.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export default axiosClient;
