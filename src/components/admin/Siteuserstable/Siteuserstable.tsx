"use client";

import { useMemo, useState } from "react";

import UsersSearch from "@/components/admin/Siteuserstable/UsersSearch/UsersSearch";
import UsersTable from "@/components/admin/Siteuserstable/UsersTable/UsersTable";
import EmptyUsers from "@/components/admin/Siteuserstable/EmptyUsers/EmptyUsers";
import EditUserModal from "@/components/admin/Siteuserstable/EditUserModal/EditUserModal";

import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";

// Re-export برای استفاده در فایل‌های دیگر
export type { UserRow };

type SiteUsersTableProps = {
  initialUsers: UserRow[];
};

export default function SiteUsersTable({ initialUsers }: SiteUsersTableProps) {
  const [query, setQuery] = useState("");

  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return initialUsers;
    }

    return initialUsers.filter((user) => {
      const name = user.full_name?.toLowerCase() ?? "";

      const email = user.email?.toLowerCase() ?? "";

      return name.includes(normalizedQuery) || email.includes(normalizedQuery);
    });
  }, [initialUsers, query]);

  return (
    <div
      className="
        rounded-3xl
        border border-gray-100
        bg-white/80
        p-6
        shadow-lg
        backdrop-blur-xl
        sm:p-8
      "
    >
      <UsersSearch value={query} onChange={setQuery} />

      {filteredUsers.length === 0 ? (
        <EmptyUsers />
      ) : (
        <UsersTable users={filteredUsers} onEdit={setEditingUser} />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}
