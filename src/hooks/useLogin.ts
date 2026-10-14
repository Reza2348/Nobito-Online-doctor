"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { axiosClient, getAxiosErrorMessage } from "@/lib/axiosClient";

import type { Role } from "@/Types/types";

export function useLogin() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("admin");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSubmittingRef = useRef(false);

  const handleLogin = useCallback(async () => {
    if (isSubmittingRef.current) {
      return;
    }

    setError("");

    if (!username.trim()) {
      setError("لطفاً نام کاربری را وارد کنید");

      return;
    }

    if (!password) {
      setError("لطفاً رمز عبور را وارد کنید");

      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      const response = await axiosClient.post(
        "/api/admin/login",
        {
          username: username.trim(),
          password: password,
        },
        {
          timeout: 10000,
        },
      );

      if (
        !response.data?.success ||
        !response.data?.admin ||
        !response.data?.token
      ) {
        throw new Error("اطلاعات ورود نامعتبر است");
      }

      // ذخیره توکن در کوکی روی دامنه فرانت (برای proxy.ts)
      await axios.post("/api/auth/session", {
        token: response.data.token,
        rememberMe,
      });

      const loggedInRole = response.data.admin.role as Role;

      if (loggedInRole === "admin") {
        router.replace("/Admin/dashboard");

        return;
      }

      if (loggedInRole === "consultant") {
        router.replace("/Admin/Consultant");

        return;
      }

      if (loggedInRole === "content") {
        router.replace("/Admin/Content");

        return;
      }

      throw new Error("نقش کاربری نامعتبر است");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message = getAxiosErrorMessage(error, "اتصال به سرور برقرار نشد");

      setError(message);

      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, [username, password, rememberMe, router]);

  return {
    role,
    username,
    password,
    showPassword,
    rememberMe,

    loading,
    error,

    setRole,
    setUsername,
    setPassword,
    setShowPassword,
    setRememberMe,

    handleLogin,
  };
}
