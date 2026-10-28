"use client";

import { MdEdit } from "react-icons/md";
import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";

type UserTableRowProps = {
  user: UserRow;
  onEdit: (user: UserRow) => void;
};

export default function UserTableRow({ user, onEdit }: UserTableRowProps) {
  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("fa-IR")
    : "—";

  return (
    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
      <td className="whitespace-nowrap py-3 pr-2 font-medium text-gray-800">
        {user.full_name || "—"}
      </td>

      <td dir="ltr" className="whitespace-nowrap py-3 text-right text-gray-600">
        {user.email || "—"}
      </td>

      <td className="whitespace-nowrap py-3 text-gray-600">{formattedDate}</td>

      <td className="whitespace-nowrap py-3 pl-2 text-center">
        <button
          type="button"
          onClick={() => onEdit(user)}
          aria-label={`ویرایش کاربر ${user.full_name || user.email || ""}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
        >
          <MdEdit size={16} />
          <span>ویرایش</span>
        </button>
      </td>
    </tr>
  );
}
