import type { Message } from "@/Types/types";

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function ChatMessages({ messages, loading }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message, index) => {
        const isUser = message.role === "user";

        return (
          <div
            key={index}
            className={`flex ${isUser ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`
                max-w-[85%]
                rounded-2xl
                px-4 py-3
                text-sm leading-6
                whitespace-pre-line
                ${
                  isUser
                    ? "bg-[#1F7168] text-white rounded-br-md"
                    : "bg-gray-100 text-gray-700 rounded-bl-md"
                }
              `}
            >
              {message.content}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex justify-end">
          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center gap-1">
              {[0, 0.15, 0.3].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
