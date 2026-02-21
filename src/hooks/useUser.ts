"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export function useUser(idleTime = 5 * 60 * 1000) {
  // پیش‌فرض 5 دقیقه
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    email: string;
    username: string;
  } | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // تابع امن برای فرمت user
  const formatUser = (user: User) => ({
    id: user.id,
    email: user.email ?? "",
    username:
      (user.user_metadata?.username as string) ||
      user.email?.split("@")[0] ||
      "US",
  });

  // reset تایمر idle
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (status === "authenticated") return;

    timerRef.current = setTimeout(() => {
      router.push("/auth/signup"); // redirect بعد از idle
    }, idleTime);
  }, [status, idleTime, router]);

  // load initial user و listener تغییرات auth
  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (data.session?.user) {
          setUser(formatUser(data.session.user));
          setStatus("authenticated");
        } else {
          setUser(null);
          setStatus("unauthenticated");
          resetTimer();
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
        setStatus("unauthenticated");
        resetTimer();
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          setUser(formatUser(session.user));
          setStatus("authenticated");
        } else {
          setUser(null);
          setStatus("unauthenticated");
          resetTimer();
        }
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  // مدیریت activity user برای reset timer
  useEffect(() => {
    if (status === "authenticated") return;

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    const activityHandler = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, activityHandler));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, activityHandler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, resetTimer]);

  return { user, userId: user?.id ?? null, status };
}
