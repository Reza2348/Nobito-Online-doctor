import type { Role, Account } from "@/Types/types";

function readHash(envKey: string): string {
  const value = process.env[envKey];

  if (!value) {
    // در حالت dev اینو لاگ می‌کنیم که سریع بفهمی env درست ست نشده
    console.warn(
      `[accounts] هشدار: مقدار ${envKey} توی .env.local پیدا نشد. لاگین این نقش کار نخواهد کرد.`,
    );
  }

  return value ?? "";
}

export const accounts: Record<Role, Account> = {
  admin: {
    username: "systemadmin",
    passwordHash: readHash("ADMIN_PASSWORD_HASH"),
    path: "/Admin/dashboard",
  },

  consultant: {
    username: "consultant",
    passwordHash: readHash("CONSULTANT_PASSWORD_HASH"),
    path: "/Admin/Consultant",
  },

  content: {
    username: "contentmanager",
    passwordHash: readHash("CONTENT_PASSWORD_HASH"),
    path: "/Admin/Content",
  },
};
