import type { AuthStatus } from "@/Types/types";

interface Props {
  status: AuthStatus | null;
}

export default function SystemStatsCard({ status }: Props) {
  const stats = [
    {
      label: "کاربران MongoDB",
      value: status?.usersInMongo,
    },
    {
      label: "کدهای ورود در انتظار",
      value: status?.pendingLocalCodes,
    },
    {
      label: "ثبت‌نام‌های در انتظار",
      value: status?.pendingSignups,
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">آمار سیستم</h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-600">{stat.label}</p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value ?? "—"}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        آمار از API بک‌اند دریافت می‌شود.
      </p>
    </section>
  );
}
