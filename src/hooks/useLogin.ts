"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@/Types/types";

type LoginResponse = {
  success?: boolean;
  message?: string;
  admin?: {
    id?: string;
    username?: string;
    role?: Role;
  };
};

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
    console.log("========== LOGIN START ==========");

    // جلوگیری از ارسال چندباره
    if (isSubmittingRef.current) {
      console.log("LOGIN ALREADY RUNNING");
      return;
    }

    setError("");

    const trimmedUsername = username.trim();

    // بررسی نام کاربری
    if (!trimmedUsername) {
      console.log("USERNAME EMPTY");
      setError("لطفاً نام کاربری را وارد کنید");
      return;
    }

    // بررسی رمز عبور
    if (!password) {
      console.log("PASSWORD EMPTY");
      setError("لطفاً رمز عبور را وارد کنید");
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);

    try {
      console.log("1. CALLING NEXT LOGIN API");
      console.log("URL: /api/auth/login");

      /*
       * بسیار مهم:
       *
       * اینجا مستقیماً به Express نمی‌رویم.
       *
       * ابتدا به Route خود Next.js می‌رویم:
       *
       * /api/auth/login
       *
       * سپس Next.js به Express درخواست می‌دهد.
       * این کار باعث می‌شود Cookie مربوط به auth-token
       * روی دامنه Next.js تنظیم شود.
       */
      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        credentials: "include",

        cache: "no-store",

        body: JSON.stringify({
          username: trimmedUsername,
          password,
          role,
          rememberMe,
        }),
      });

      console.log("2. HTTP STATUS:", response.status);
      console.log("3. HTTP OK:", response.ok);
      console.log("4. CONTENT-TYPE:", response.headers.get("content-type"));

      /*
       * ابتدا text می‌خوانیم تا اگر سرور HTML یا
       * پاسخ غیر JSON داد، خطای واقعی مشخص شود.
       */
      const rawResponse = await response.text();

      console.log("5. RAW SERVER RESPONSE:");
      console.log(rawResponse);

      if (!rawResponse) {
        throw new Error(`سرور پاسخ خالی برگرداند. HTTP ${response.status}`);
      }

      let data: LoginResponse;

      try {
        data = JSON.parse(rawResponse) as LoginResponse;
      } catch (parseError) {
        console.error("JSON PARSE ERROR:", parseError);
        console.error("RAW RESPONSE:", rawResponse);

        throw new Error(`پاسخ سرور JSON نیست. HTTP ${response.status}`);
      }

      console.log("6. PARSED RESPONSE:", data);

      // بررسی خطای HTTP
      if (!response.ok) {
        throw new Error(data.message || `خطای سرور (${response.status})`);
      }

      // بررسی موفق بودن Login
      if (!data.success || !data.admin) {
        throw new Error(data.message || "اطلاعات ورود نامعتبر است");
      }

      const loggedInRole = data.admin.role;

      console.log("7. LOGIN SUCCESS");
      console.log("ADMIN:", data.admin);
      console.log("ROLE:", loggedInRole);

      // بررسی Role
      if (
        loggedInRole !== "admin" &&
        loggedInRole !== "consultant" &&
        loggedInRole !== "content"
      ) {
        throw new Error("نقش کاربری نامعتبر است");
      }

      // انتقال کاربر بر اساس Role
      if (loggedInRole === "admin") {
        console.log("8. REDIRECT → /Admin/dashboard");

        router.replace("/Admin/dashboard");
        return;
      }

      if (loggedInRole === "consultant") {
        console.log("8. REDIRECT → /Admin/Consultant");

        router.replace("/Admin/Consultant");
        return;
      }

      if (loggedInRole === "content") {
        console.log("8. REDIRECT → /Admin/Content");

        router.replace("/Admin/Content");
        return;
      }

      throw new Error("نقش کاربری نامعتبر است");
    } catch (error) {
      console.error("========== LOGIN ERROR ==========");
      console.error(error);

      const message =
        error instanceof Error ? error.message : "اتصال به سرور برقرار نشد";

      setError(message);
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
