import type { AuthStatus, CheckState } from "@/Types/types";

import { readinessState, readinessText } from "../helpers/helpers";

import StatusItem from "../StatusItem/StatusItem";

interface Props {
  authStatus: AuthStatus | null;
  sessionExists: boolean | null;
  loading: boolean;
  refreshing: boolean;
  error: string;
  onRefresh: () => void;
}

export default function SystemStatusCard({
  authStatus,
  sessionExists,
  loading,
  refreshing,
  error,
  onRefresh,
}: Props) {
  const backendState: CheckState = authStatus
    ? "success"
    : loading
      ? "loading"
      : "error";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            وضعیت احراز هویت و سرویس‌ها
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            وضعیت بک‌اند، ورود محلی و نشست کاربر را بررسی کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {refreshing ? "در حال بررسی..." : "بررسی مجدد"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
        >
          {error}
        </div>
      )}

      {loading && !authStatus && (
        <p role="status" className="mt-4 text-sm text-gray-600">
          در حال دریافت وضعیت سیستم...
        </p>
      )}

      <div className="mt-5 space-y-3">
        <StatusItem
          label="اتصال به بک‌اند"
          value={
            authStatus ? "پاسخ دریافت شد" : loading ? "در حال بررسی" : "ناموفق"
          }
          state={backendState}
        />

        <StatusItem
          label="ورود محلی"
          value={readinessText(authStatus?.localLoginReady)}
          state={readinessState(authStatus?.localLoginReady)}
        />

        <StatusItem
          label="تنظیمات Resend"
          value={readinessText(authStatus?.resendConfigured)}
          state={readinessState(authStatus?.resendConfigured)}
        />

        <StatusItem
          label="کلید نشست سرور"
          value={readinessText(authStatus?.sessionSecretOk)}
          state={readinessState(authStatus?.sessionSecretOk)}
        />

        <StatusItem
          label="اجازه شبیه‌سازی"
          value={readinessText(authStatus?.simulationAllowed)}
          state={readinessState(authStatus?.simulationAllowed)}
        />

        <StatusItem
          label="نشست Supabase در مرورگر"
          value={
            sessionExists === null
              ? "نامشخص"
              : sessionExists
                ? "نشست فعال"
                : "نشست فعالی وجود ندارد"
          }
          state={
            sessionExists === null
              ? "loading"
              : sessionExists
                ? "success"
                : "warning"
          }
        />
      </div>
    </section>
  );
}
