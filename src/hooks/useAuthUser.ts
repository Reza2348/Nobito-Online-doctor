"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const useAuthUser = () => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    username: string;
  } | null>(null);
  const router = useRouter();

  // فرمت امن user
  const formatUser = (user: any) => ({
    id: user.id,
    email: user.email ?? "",
    username:
      (user.user_metadata?.username as string) ||
      user.email?.split("@")[0] ||
      "US",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (data.session?.user) {
          setUser(formatUser(data.session.user));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          setUser(formatUser(session.user));
        } else {
          setUser(null);
        }
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // تابع logout با مدیریت خطا
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, logout };
};
