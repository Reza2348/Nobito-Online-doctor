"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  nationalId: string;
  country: string;
  province: string;
  avatarUrl: string;
  role: "patient" | "doctor" | "admin";
};

export type ProfileInput = Partial<
  Pick<Profile, "fullName" | "phone" | "nationalId" | "country" | "province">
>;

const KEY = ["dashboard", "profile"] as const;

class ProfileError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request(init?: RequestInit): Promise<Profile> {
  const res = await fetch("/api/dashboard/profile", {
    cache: "no-store",
    ...init,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.profile) {
    throw new ProfileError(
      data?.message || "خطا در ارتباط با سرور.",
      res.status,
    );
  }

  return data.profile as Profile;
}

/** پروفایل کاربر واردشده؛ داده‌ی خصوصی است و در localStorage ذخیره نمی‌شود. */
export function useProfile() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => request(),
    staleTime: 60_000,
    retry: (count, error) =>
      !(error instanceof ProfileError && error.status < 500) && count < 2,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProfileInput) =>
      request({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    retry: false, // نوشتن هیچ‌وقت خودکار تکرار نمی‌شود
    onSuccess: (profile) => queryClient.setQueryData(KEY, profile),
  });
}
