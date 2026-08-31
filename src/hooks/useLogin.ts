"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/Types/types";

export function useLogin() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
          role,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message || "خطا در ورود");
        setLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      if (!data?.path) {
        setError("مسیر بازگشتی از سرور نامعتبر است");
        setLoading(false);
        isSubmittingRef.current = false;
        return;
      }

      router.replace(data.path);
      router.refresh();
    } catch {
      setError("خطایی هنگام ورود رخ داد");
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, [username, password, role, router]);

  return {
    role,
    username,
    password,
    showPassword,
    error,
    loading,
    setRole,
    setUsername,
    setPassword,
    setShowPassword,
    handleLogin,
  };
}
