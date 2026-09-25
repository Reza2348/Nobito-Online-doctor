import type { Message } from "@/Types/types";

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("پاسخ سرور معتبر نیست.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "خطایی رخ داده است.");
  }

  return data;
};

export const sendSupportMessage = async ({
  message,
  conversationId,
}: {
  message: string;
  conversationId: string | null;
}) => {
  const response = await fetch("/api/support-ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationId,
    }),
  });

  return parseResponse(response);
};

export const requestHumanSupport = async (conversationId: string) => {
  const response = await fetch("/api/support-human", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationId,
    }),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
};
