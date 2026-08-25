import type { Role, Account } from "@/Types/types";

export const accounts: Record<Role, Account> = {
  admin: {
    username: "systemadmin",
    passwordHash: process.env.ADMIN_PASSWORD_HASH!,
    path: "/Admin/dashboard",
  },

  consultant: {
    username: "consultant",
    passwordHash: process.env.CONSULTANT_PASSWORD_HASH!,
    path: "/Admin/Consultant",
  },

  content: {
    username: "contentmanager",
    passwordHash: process.env.CONTENT_PASSWORD_HASH!,
    path: "/Admin/Content",
  },
};
