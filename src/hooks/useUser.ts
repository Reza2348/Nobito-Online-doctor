"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

const BROWSER_SESSION_FLAG = "nobito_browser_session_active";

type Status = "loading" | "authenticated" | "unauthenticated";

type FormattedUser = {
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
      : (user.email?.split("@")[0] ?? "US"),
});

export function useUser(idleTime: number = 5 * 60 * 1000) {
  const router = useRouter();

  const [user, setUser] = useState<FormattedUser | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  const clearIdleTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startIdleTimer = useCallback(() => {
    clearIdleTimer();

    timerRef.current = setTimeout(() => {
      router.replace("/auth/signup");
    }, idleTime);
  }, [clearIdleTimer, idleTime, router]);

  const updateAuthState = useCallback((session: any) => {
    if (session?.user) {
      sessionStorage.setItem(BROWSER_SESSION_FLAG, "1");

      setUser(formatUser(session.user));
      setStatus("authenticated");
    } else {
      sessionStorage.removeItem(BROWSER_SESSION_FLAG);

      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const logout = useCallback(async () => {
    clearIdleTimer();

    await supabase.auth.signOut();

    sessionStorage.removeItem(BROWSER_SESSION_FLAG);

    setUser(null);
    setStatus("unauthenticated");

    router.replace("/");
  }, [router, clearIdleTimer]);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        const firstBrowserOpen =
          !initializedRef.current &&
          sessionStorage.getItem(BROWSER_SESSION_FLAG) === null;

        initializedRef.current = true;

        if (session && firstBrowserOpen) {
          await supabase.auth.signOut();
          return;
        }

        updateAuthState(session);
      } catch (error) {
        console.error(error);

        if (!mounted) return;

        setUser(null);
        setStatus("unauthenticated");
      }
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      updateAuthState(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearIdleTimer();
    };
  }, [clearIdleTimer, updateAuthState]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      clearIdleTimer();
      return;
    }

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ] as const;

    const handleActivity = () => startIdleTimer();

    events.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true }),
    );

    startIdleTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );

      clearIdleTimer();
    };
  }, [status, startIdleTimer, clearIdleTimer]);

  return {
    user,
    userId: user?.id ?? null,
    status,
    logout,
  };
}
