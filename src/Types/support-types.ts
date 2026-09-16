import type React from "react";

export type MessageRole = "user" | "assistant";

export type Message = {
  role: MessageRole;
  content: string;
};

export type SignupStep = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
};
