import Link from "next/link";

import type { SessionUser } from "@/lib/authFallback";

import StatusItem from "../StatusItem/StatusItem";

interface Props {
  user: SessionUser | null;
}

export default function UserStatusCard({ user }: Props) {
  const userId = user?.id ?? user?._id;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">وضعیت کاربر</h2>

      <div className="mt-4 space-y-3">
        <StatusItem
          label="کاربر احراز هویت محلی"
          value={user?.email ?? "کاربری در نشست محلی پیدا نشد"}
          state={user ? "success" : "warning"}
        />

        <StatusItem
          label="شناسه کاربر"
          value={userId != null ? String(userId) : "در دسترس نیست"}
          state={userId != null ? "success" : "warning"}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          رفتن به ثبت‌نام
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
