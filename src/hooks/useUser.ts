"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";

const BROWSER_SESSION_FLAG = "nobito_browser_session_active";

type Status = "loading" | "authenticated" | "unauthenticated";

export type FormattedUser = {
  id: string;
  email: string;
  username: string;
};

const formatUser = (user: User): FormattedUser => ({
  id: user.id,
  email: user.email ?? "",
  username:
    typeof user.user_metadata?.username === "string"
      ? user.user_metadata.username
      : (user.email?.split("@")[0] ?? "کاربر"),
});

export function useUser() {
  const router = useRouter();

  const [user, setUser] = useState<FormattedUser | null>(null);

  const [status, setStatus] = useState<Status>("loading");

  /**
   * تغییر وضعیت احراز هویت
   */
  const updateAuthState = useCallback((session: Session | null) => {
    if (session?.user) {
      sessionStorage.setItem(BROWSER_SESSION_FLAG, "1");

      const formattedUser = formatUser(session.user);

      setUser(formattedUser);
      setStatus("authenticated");
    } else {
      sessionStorage.removeItem(BROWSER_SESSION_FLAG);

      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  /**
   * دریافت Session اولیه
   */
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        updateAuthState(session);
      } catch (error) {
        console.error("❌ Auth initialization error:", error);

        if (!mounted) return;

        setUser(null);
        setStatus("unauthenticated");
      }
    };

    initialize();

    /**
     * گوش دادن به تغییرات Auth
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      updateAuthState(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [updateAuthState]);

  /**
   * خروج از حساب
   */
  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Logout error:", error);

      return;
    }

    setUser(null);
    setStatus("unauthenticated");

    sessionStorage.removeItem(BROWSER_SESSION_FLAG);

    router.replace("/");
  }, [router]);

  return {
    user,
    userId: user?.id ?? null,
    status,
    logout,
  };
}
