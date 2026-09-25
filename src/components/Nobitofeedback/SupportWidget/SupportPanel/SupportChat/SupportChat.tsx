"use client";

import { useState } from "react";

import type { Message } from "@/Types/types";

import { sendSupportMessage } from "@/lib/support-api";

import ChatMessages from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/ChatMessages/ChatMessages";
import ChatInput from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/ChatInput/ChatInput";
import HumanSupportButton from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportChat/HumanSupportButton/HumanSupportButton";

type Props = {
  messages: Message[];
  onMessage: (message: Message) => void;
  conversationId: string | null;
  onConversationId: (id: string) => void;
  faqLoading: boolean;
};

export default function SupportChat({
  messages,
  onMessage,
  conversationId,
  onConversationId,
  faqLoading,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (value?: string) => {
    const text = (value ?? input).trim();

    if (!text || loading || faqLoading) {
      return;
    }

    setInput("");

    onMessage({
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
        onConversationId(data.conversationId);
      }

      onMessage({
        role: "assistant",
        content:
          data.reply || "متأسفم، در حال حاضر نتوانستم پاسخ مناسبی پیدا کنم.",
      });
    } catch (error) {
      console.error("Support chat error:", error);

      onMessage({
        role: "assistant",
        content:
          "متأسفانه در ارتباط با سامانه پشتیبانی مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChatMessages messages={messages} loading={loading || faqLoading} />

      <HumanSupportButton
        conversationId={conversationId}
        onMessage={onMessage}
      />

      <ChatInput
        value={input}
        loading={loading || faqLoading}
        onChange={setInput}
        onSubmit={() => void sendMessage()}
      />
    </div>
  );
}
