"use client";

import { useState } from "react";
import { FiPlay } from "react-icons/fi";

import type { Message } from "@/Types/types";
import { sendSupportMessage } from "@/lib/support-api";

import ChatMessages from "../SupportChat/ChatMessages/ChatMessages";
import ChatInput from "../SupportChat/ChatInput/ChatInput";
import HumanSupportButton from "../SupportChat/HumanSupportButton/HumanSupportButton";

type Props = {
  onClose: () => void;
};

export default function SignupGuide({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) return;

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
      console.error("Signup guide chat error:", error);

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
      {/* ویدئوی آموزش ثبت‌نام */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="overflow-hidden rounded-3xl bg-black shadow-sm">
          <div className="relative aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              <source
                src="/videos/nobito-login-tutorial.mp4"
                type="video/mp4"
              />
              مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
            </video>
            <div className="mt-4 rounded-2xl bg-[#1F7168]/5 px-4 py-3">
              <h3 className="text-sm font-bold text-gray-800">
                راهنمای ثبت‌نام در نوبیتو
              </h3>

              <p className="mt-1 text-xs leading-6 text-gray-500">
                با مشاهده این ویدئو، مراحل ثبت‌نام را به‌سادگی یاد بگیرید. اگر
                در هر مرحله سؤالی داشتید، می‌توانید از دستیار هوشمند بپرسید.
              </p>
            </div>

            <div
              className="
                pointer-events-none
                absolute right-3 top-3
                flex items-center gap-1.5
                rounded-full
                bg-black/50
                px-3 py-1.5
                text-xs text-white
                backdrop-blur-sm
              "
            >
              <FiPlay size={12} />
              آموزش ثبت نام
            </div>
          </div>
        </div>

        {/* پیام‌های چت */}
        {messages.length > 0 && (
          <div className="mt-4">
            <ChatMessages messages={messages} loading={loading} />
          </div>
        )}
      </div>

      {/* تماس با پشتیبان انسانی */}
      <HumanSupportButton
        conversationId={conversationId}
        onMessage={addMessage}
      />

      {/* پیام خود را بنویسید... */}
      <ChatInput
        value={input}
        loading={loading}
        onChange={setInput}
        onSubmit={() => {
          void sendMessage();
        }}
      />
    </div>
  );
}
