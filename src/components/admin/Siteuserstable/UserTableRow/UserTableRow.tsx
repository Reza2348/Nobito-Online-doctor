import { MdEdit } from "react-icons/md";

import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";

type UserTableRowProps = {
  user: UserRow;
  onEdit: (user: UserRow) => void;
};

export default function UserTableRow({ user, onEdit }: UserTableRowProps) {
  return (
    <tr className="border-b border-gray-50 transition hover:bg-gray-50">
      <td className="py-3 pr-2 font-medium text-gray-800">
        {user.full_name ?? "—"}
      </td>

      <td className="py-3 text-gray-600" dir="ltr">
        {user.email ?? "—"}
      </td>

      <td className="py-3 text-gray-500">
        {new Date(user.created_at).toLocaleDateString("fa-IR")}
      </td>

      <td className="py-3 pl-2">
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-xl
            bg-teal-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-teal-700
            transition
            hover:bg-teal-600
            hover:text-white
          "
        >
          <MdEdit size={16} />
          ویرایش
        </button>
      </td>
    </tr>
  );
}
