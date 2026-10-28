"use client";

import UserTableRow from "@/components/admin/Siteuserstable/UserTableRow/UserTableRow";
import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";

type UsersTableProps = {
  users: UserRow[];
  onEdit: (user: UserRow) => void;
};

export default function UsersTable({ users, onEdit }: UsersTableProps) {
  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <table className="w-full min-w-[540px] border-collapse text-right text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th scope="col" className="py-3 pr-2 font-medium">
              نام کاربر
            </th>

            <th scope="col" className="py-3 font-medium">
              ایمیل
            </th>

            <th scope="col" className="py-3 font-medium">
              تاریخ عضویت
            </th>

            <th scope="col" className="py-3 pl-2 text-center font-medium">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.length > 0 ? (
            users.map((user) => (
              <UserTableRow key={user.id} user={user} onEdit={onEdit} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                کاربری برای نمایش وجود ندارد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
