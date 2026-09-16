"use client";

import { useQuery } from "@tanstack/react-query";
import { MdPeople } from "react-icons/md";
import SiteUsersTable, {
  type UserRow,
} from "@/components/admin/Siteuserstable/Siteuserstable";

type UsersResponse = {
  users: UserRow[];
  total: number;
};

async function fetchUsers(): Promise<UsersResponse> {
  const res = await fetch("/api/admin/users");
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error ?? "خطا در دریافت کاربران");
  }

  return json;
}

export default function AdminUsersPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  return (
    <div dir="rtl" className="p-4">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-linear-to-br
            from-teal-600
            to-emerald-400
            text-white
            shadow-lg
          "
        >
          <MdPeople size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">کاربران</h1>
          <p className="mt-1 text-sm text-gray-500">
            {isLoading
              ? "در حال بارگذاری..."
              : `${(data?.total ?? 0).toLocaleString("fa-IR")} کاربر ثبت‌ نام‌ شده در سایت`}
          </p>
        </div>
      </div>

      {isError && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error instanceof Error ? error.message : "خطا در دریافت کاربران"}
        </div>
      )}

      {/* Card + Table */}
      <SiteUsersTable initialUsers={data?.users ?? []} />
    </div>
  );
}
