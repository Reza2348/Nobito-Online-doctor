"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";
import type { Role } from "@/Types/types";

export function useLogin() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Remember Me
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSubmittingRef = useRef(false);

  const handleLogin = useCallback(async () => {
    if (isSubmittingRef.current) return;

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("لطفاً اطلاعات ورود را کامل کنید");
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      const { data } = await axiosClient.post("/api/auth/login", {
        username: username.trim(),
        password,
        role,
        rememberMe,
      });

      if (!data?.path) {
        setError("مسیر بازگشتی از سرور نامعتبر است");
        setLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      router.replace(data.path);
      router.refresh();
    } catch (error) {
      setError(getAxiosErrorMessage(error, "خطا در ورود"));
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, [username, password, role, rememberMe, router]);

  return {
    role,
    username,
    password,
    showPassword,
    rememberMe,
    error,
    loading,

    setRole,
    setUsername,
    setPassword,
    setShowPassword,
    setRememberMe,

    handleLogin,
  };
}
