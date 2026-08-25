"use client";

import { FaUserTie, FaBrain, FaEdit } from "react-icons/fa";

import type { Role } from "@/Types/types";

type Props = {
  role: Role;
  onChange: (role: Role) => void;
};

const roles = [
  {
    id: "admin",
    title: "Admin",
    icon: FaUserTie,
  },
  {
    id: "consultant",
    title: "مشاور",
    icon: FaBrain,
  },
  {
    id: "content",
    title: "مدیر محتوا",
    icon: FaEdit,
  },
];

export default function RoleSelector({ role, onChange }: Props) {
  return (
    <div className="mb-6 flex justify-center gap-3">
      {roles.map((item) => {
        const Icon = item.icon;
        const active = role === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id as Role)}
            className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl border transition ${
              active
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Icon size={25} />
            <span className="mt-2 text-xs">{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}
