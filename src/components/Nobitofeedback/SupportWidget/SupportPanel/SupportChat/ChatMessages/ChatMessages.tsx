"use client";

import { useEffect, useRef } from "react";

import type { Message } from "@/Types/types";

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function ChatMessages({ messages, loading }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message, index) => {
        const isUser = message.role === "user";

        return (
          <div
            key={index}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            {isUser ? (
              <div className="flex max-w-[85%] items-start gap-2">
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full bg-[#E8F5F2] text-lg shadow-sm
                  "
                >
                  👤
                </div>

                <div
                  className="
                    rounded-2xl rounded-br-md
                    bg-[#1F7168]
                    px-4 py-3
                    text-sm leading-6
                    whitespace-pre-line
                    text-white
                  "
                >
                  {message.content}
                </div>
              </div>
            ) : (
              <div className="flex max-w-[90%] items-start gap-2">
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full bg-[#E8F5F2] text-lg shadow-sm
                  "
                >
                  🤖
                </div>

                <div
                  className="
                    rounded-2xl rounded-bl-md
                    bg-gray-100
                    px-4 py-3
                    text-sm leading-6
                    whitespace-pre-line
                    text-gray-700
                  "
                >
                  {message.content}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {loading && (
        <div className="flex justify-start">
          <div className="flex items-start gap-2">
            <div
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full bg-[#E8F5F2] text-lg shadow-sm
              "
            >
              🤖
            </div>

            <div
              className="
                rounded-2xl rounded-bl-md
                bg-gray-100
                px-4 py-3
              "
            >
              <div className="flex items-center gap-1">
                <span
                  className="
                    h-1.5 w-1.5 rounded-full
                    bg-gray-400
                    animate-bounce
                  "
                  style={{ animationDelay: "0s" }}
                />

                <span
                  className="
                    h-1.5 w-1.5 rounded-full
                    bg-gray-400
                    animate-bounce
                  "
                  style={{ animationDelay: "0.15s" }}
                />

                <span
                  className="
                    h-1.5 w-1.5 rounded-full
                    bg-gray-400
                    animate-bounce
                  "
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* همیشه انتهای چت */}
      <div ref={messagesEndRef} />
    </div>
  );
}
