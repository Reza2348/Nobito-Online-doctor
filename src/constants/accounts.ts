import type { Role, Account } from "@/Types/types";

export const accounts: Record<Role, Account> = {
  admin: {
    username: "systemadmin",
    passwordHash: "",
    path: "/Admin/dashboard",
  },

  consultant: {
    username: "consultant",
    passwordHash: "",
    path: "/Admin/Consultant",
  },

  content: {
    username: "contentmanager",
    passwordHash: "",
    path: "/Admin/Content",
  },
};
