import { FaBrain, FaEdit, FaUserTie } from "react-icons/fa";

import type { Role } from "@/Types/types";

export const roles = [
  {
    id: "admin" as Role,

    title: "Admin",

    icon: FaUserTie,
  },

  {
    id: "consultant" as Role,

    title: "مشاور",

    icon: FaBrain,
  },

  {
    id: "content" as Role,

    title: "مدیر محتوا",

    icon: FaEdit,
  },
];
