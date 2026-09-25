"use client";

import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabaseClient";
import { requestHumanSupport } from "@/lib/support-api";
import type { Message } from "@/Types/types";

const GUEST_HUMAN_SUPPORT_MESSAGE =
  "برای ارتباط با پشتیبان انسانی، ابتدا وارد حساب کاربری خود شوید؛ سپس گزینه «تماس با پشتیبان انسانی» را انتخاب کنید تا درخواستتان برای تیم پشتیبانی ارسال شود. پشتیبانی انسانی در روزهای کاری از ساعت ۹ تا ۱۸ پاسخ‌گو است.";

const NO_CONVERSATION_MESSAGE =
  "ابتدا یک گفتگو با دستیار هوشمند شروع کنید و سپس درخواست پشتیبان انسانی بدهید.";

type Props = {
  conversationId: string | null;
  onMessage: (message: Message) => void;
  onOpenChat?: () => void;
};

export default function HumanSupportButton({
  conversationId,
  onMessage,
  onOpenChat,
}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [humanLoading, setHumanLoading] = useState(false);

  // -------------------------------------------------------
  // Authentication
  // -------------------------------------------------------

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const {
          data: { user: currentUser },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.warn("SUPABASE USER CHECK:", error.message);

          if (mounted) {
            setUser(null);
          }

          return;
        }

        if (mounted) {
          setUser(currentUser ?? null);
        }
      } catch (error) {
        console.warn("SUPABASE AUTH CHECK:", error);

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // -------------------------------------------------------
  // Human Support
  // -------------------------------------------------------

  const handleRequestSupport = async () => {
    if (authLoading || humanLoading) {
      return;
    }

    // Guest
    if (!user) {
      onMessage({
        role: "assistant",
        content: GUEST_HUMAN_SUPPORT_MESSAGE,
      });

      onOpenChat?.();

      return;
    }

    // Logged-in user without conversation
    if (!conversationId) {
      onMessage({
        role: "assistant",
        content: NO_CONVERSATION_MESSAGE,
      });

      onOpenChat?.();

      return;
    }

    setHumanLoading(true);

    try {
      const { response, data } = await requestHumanSupport(conversationId);

      // Session expired
      if (response.status === 401) {
        setUser(null);

        onMessage({
          role: "assistant",
          content: data?.error || GUEST_HUMAN_SUPPORT_MESSAGE,
        });

        onOpenChat?.();

        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "ثبت درخواست پشتیبان انسانی ناموفق بود.",
        );
      }

      onMessage({
        role: "assistant",
        content: data?.message || "درخواست شما با موفقیت ثبت شد.",
      });

      onOpenChat?.();
    } catch (error) {
      console.error("Human support error:", error);

      onMessage({
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "ثبت درخواست پشتیبان انسانی با مشکل مواجه شد. لطفاً دوباره تلاش کنید.",
      });

      onOpenChat?.();
    } finally {
      setHumanLoading(false);
    }
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  const buttonText = authLoading
    ? "در حال بررسی حساب..."
    : humanLoading
      ? "در حال ثبت درخواست..."
      : "تماس با پشتیبان انسانی";

  return (
    <div className="px-4 pb-2">
      <button
        type="button"
        disabled={authLoading || humanLoading}
        onClick={handleRequestSupport}
        className="
          w-full
          flex items-center justify-center gap-2
          py-2.5
          rounded-xl
          bg-gray-50
          border border-gray-200
          text-xs text-gray-600
          hover:bg-gray-100
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        <FiUser size={15} />

        {buttonText}
      </button>
    </div>
  );
}
