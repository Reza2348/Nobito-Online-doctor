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
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSubmittingRef = useRef(false);

  const handleLogin = useCallback(async () => {
    console.log("1. LOGIN STARTED");

    if (isSubmittingRef.current) {
      console.log("2. LOGIN ALREADY RUNNING");
      return;
    }

    setError("");

    if (!username.trim()) {
      console.log("2. USERNAME EMPTY");

      setError("لطفاً نام کاربری را وارد کنید");

      return;
    }

    if (!password) {
      console.log("2. PASSWORD EMPTY");

      setError("لطفاً رمز عبور را وارد کنید");

      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      console.log("3. SENDING REQUEST TO BACKEND");

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

      console.log("4. BACKEND RESPONSE:", response.data);

      if (!response.data?.success || !response.data?.admin) {
        throw new Error("اطلاعات ورود نامعتبر است");
      }

      const loggedInRole = response.data.admin.role as Role;

      console.log("5. ADMIN ROLE:", loggedInRole);

      if (loggedInRole === "admin") {
        console.log("6. REDIRECTING TO /Admin/dashboard");

        router.replace("/Admin/dashboard");

        return;
      }

      if (loggedInRole === "consultant") {
        console.log("6. REDIRECTING TO /Admin/Consultant");

        router.replace("/Admin/Consultant");

        return;
      }

      if (loggedInRole === "content") {
        console.log("6. REDIRECTING TO /Admin/Content");

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
  }, [username, password, router]);

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
