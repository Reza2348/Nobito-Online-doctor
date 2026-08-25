"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export function useUser(idleTime: number = 5 * 60 * 1000) {
  const router = useRouter();

  const [user, setUser] = useState<FormattedUser | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIdleTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const updateAuthState = useCallback((session: Session | null) => {
    console.log("🔐 AUTH STATE CHANGED:", session?.user);

    if (session?.user) {
      sessionStorage.setItem(BROWSER_SESSION_FLAG, "1");

      const formattedUser = formatUser(session.user);

      console.log("👤 FORMATTED USER:", formattedUser);

      setUser(formattedUser);
      setStatus("authenticated");
    } else {
      sessionStorage.removeItem(BROWSER_SESSION_FLAG);

      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        console.log("🔵 INITIAL SESSION:", session?.user);

        updateAuthState(session);
      } catch (error) {
        console.error("❌ Auth initialization error:", error);

        if (!mounted) return;

        setUser(null);
        setStatus("unauthenticated");
      }
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      console.log("🔥 SUPABASE AUTH EVENT:", event);
      console.log("🔥 SESSION USER:", session?.user);

      updateAuthState(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [updateAuthState]);

  const logout = useCallback(async () => {
    clearIdleTimer();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("❌ Logout error:", error);
      return;
    }

    setUser(null);
    setStatus("unauthenticated");

    sessionStorage.removeItem(BROWSER_SESSION_FLAG);

    router.replace("/");
  }, [clearIdleTimer, router]);

  useEffect(() => {
    if (status !== "unauthenticated") {
      clearIdleTimer();
      return;
    }

    const startTimer = () => {
      clearIdleTimer();

      timerRef.current = setTimeout(() => {
        router.replace("/auth/signup");
      }, idleTime);
    };

    startTimer();

    return clearIdleTimer;
  }, [status, idleTime, router, clearIdleTimer]);

  return {
    user,
    userId: user?.id ?? null,
    status,
    logout,
  };
}
