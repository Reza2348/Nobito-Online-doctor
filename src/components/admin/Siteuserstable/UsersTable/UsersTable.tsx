import UserTableRow from "@/components/admin/Siteuserstable/UserTableRow/UserTableRow";
import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";

type UsersTableProps = {
  users: UserRow[];
  onEdit: (user: UserRow) => void;
};

export default function UsersTable({ users, onEdit }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-135 border-collapse text-right text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500">
            <th className="py-3 pr-2 font-medium">نام کاربر</th>

            <th className="py-3 font-medium">ایمیل</th>

            <th className="py-3 pr-2 font-medium">شماره موبایل</th>

            <th className="py-3 font-medium">تاریخ عضویت</th>

            <th className="py-3 pl-2 font-medium">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
