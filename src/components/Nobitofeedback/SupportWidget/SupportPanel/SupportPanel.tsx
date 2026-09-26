"use client";

import { useState } from "react";

import type { Message } from "@/Types/types";

import SupportHeader from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportHeader/SupportHeader";
import SupportFaq from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportFaq/SupportFaq";
import SupportChat from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/SupportChat";
import SignupGuide from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SignupGuide/SignupGuide";

type View = "faq" | "chat" | "signup";

type Props = {
  onClose: () => void;
};

export default function SupportPanel({ onClose }: Props) {
  const [view, setView] = useState<View>("faq");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "سلام 👋\nمن دستیار هوشمند پشتیبانی نوبیتو هستم.\nسؤال خود را مستقیم بپرسید؛ چطور می‌توانم کمکتان کنم؟",
    },
  ]);

  const [conversationId, setConversationId] = useState<string | null>(null);

  const [faqLoading, setFaqLoading] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleFaqMessage = (question: string, answer: string) => {
    setView("chat");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setFaqLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
        },
      ]);

      setFaqLoading(false);
    }, 2500);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-65 bg-black/20 backdrop-blur-[2px] md:hidden"
        onClick={onClose}
      />

      <div
        className="
          fixed z-70
          bottom-24 left-4 md:left-6
          w-[calc(100%-2rem)] md:w-97.5
          max-w-97.5
          h-[min(650px,calc(100vh-120px))]
          bg-white
          rounded-3xl
          shadow-[0_20px_70px_rgba(0,0,0,0.18)]
          border border-gray-100
          overflow-hidden
          flex flex-col
        "
        dir="rtl"
      >
        <SupportHeader
          view={view}
          onBack={() => setView("faq")}
          onClose={onClose}
        />

        {view === "faq" && (
          <SupportFaq
            onChat={() => setView("chat")}
            onSignup={() => setView("signup")}
            onFaqMessage={handleFaqMessage}
            requestHumanSupport={() => {}}
            humanLoading={false}
            authLoading={false}
          />
        )}

        {view === "chat" && (
          <SupportChat
            messages={messages}
            onMessage={addMessage}
            conversationId={conversationId}
            onConversationId={setConversationId}
            faqLoading={faqLoading}
          />
        )}

        {view === "signup" && <SignupGuide onClose={() => setView("faq")} />}
      </div>
    </>
  );
}
