"use client";

import { useState } from "react";

import type { Message } from "@/Types/types";
import { sendSupportMessage } from "@/lib/support-api";

import ChatMessages from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/ChatMessages/ChatMessages";

import ChatInput from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/ChatInput/ChatInput";

import HumanSupportButton from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/HumanSupportButton/HumanSupportButton";

export default function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "سلام 👋\nمن دستیار هوشمند پشتیبانی نوبیتو هستم.\nسؤال خود را مستقیم بپرسید؛ چطور می‌توانم کمکتان کنم؟",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (value?: string) => {
    const text = (value ?? input).trim();

    if (!text || loading) {
      return;
    }

    setInput("");

    addMessage({
      role: "user",
      content: text,
    });

    setLoading(true);

    try {
      const data = await sendSupportMessage({
        message: text,
        conversationId,
      });

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      addMessage({
        role: "assistant",
        content:
          data.reply || "متأسفم، در حال حاضر نتوانستم پاسخ مناسبی پیدا کنم.",
      });
    } catch (error) {
      console.error("Support chat error:", error);

      addMessage({
        role: "assistant",
        content:
          "متأسفانه در ارتباط با سامانه پشتیبانی مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ChatMessages messages={messages} loading={loading} />

      <HumanSupportButton
        conversationId={conversationId}
        onMessage={addMessage}
      />

      <ChatInput
        value={input}
        loading={loading}
        onChange={setInput}
        onSubmit={() => sendMessage()}
      />
    </div>
  );
}
