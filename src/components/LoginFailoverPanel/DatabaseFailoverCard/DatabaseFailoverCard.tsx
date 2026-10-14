import type {
  DatabaseMode,
  FailoverStatus,
  FailoverAction,
  CheckState,
} from "@/Types/types";

import { databaseModeText } from "../helpers/helpers";
import StatusItem from "../StatusItem/StatusItem";

interface Props {
  status: FailoverStatus | null;
  busy: boolean;
  message: string;
  onAction: (action: FailoverAction) => void;
}

export default function DatabaseFailoverCard({
  status,
  busy,
  message,
  onAction,
}: Props) {
  const supabaseState: CheckState = !status
    ? "loading"
    : !status.supabaseEnabled
      ? "warning"
      : status.supabaseReachable
        ? "success"
        : "error";

  const mongoState: CheckState = !status
    ? "loading"
    : status.mongoReachable
      ? "success"
      : "error";

  const selectDatabase = (value: DatabaseMode) => {
    onAction({ type: "database", value });
  };

  const buttonBase =
    "rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors";

  const activeButton = "border-gray-300 bg-white text-black hover:bg-gray-50";

  const disabledButton =
    "cursor-not-allowed border-gray-300 bg-gray-200 text-black";

  const supabaseButton = "border-black bg-black text-white hover:bg-gray-800";

  return (
    <section className="rounded-2xl border  bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-gray-900">مدیریت دیتابیس</h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        انتخاب دیتابیس جایگزین و مدیریت ارتباط Supabase. عملکرد این کنترل‌ها به
        پیاده‌سازی API سمت سرور وابسته است.
      </p>

      <div className="mt-5 space-y-3">
        <StatusItem
          label="دیتابیس فعال"
          value={databaseModeText(status?.databaseMode)}
          state={status ? "success" : "loading"}
        />

        <StatusItem
          label="ارتباط Supabase"
          value={
            !status
              ? "نامشخص"
              : !status.supabaseEnabled
                ? "غیرفعال در تنظیمات"
                : status.supabaseReachable
                  ? "قابل دسترس"
                  : "غیرقابل دسترس"
          }
          state={supabaseState}
        />

        <StatusItem
          label="ارتباط MongoDB"
          value={
            !status
              ? "نامشخص"
              : status.mongoReachable
                ? "قابل دسترس"
                : "غیرقابل دسترس"
          }
          state={mongoState}
        />

        <StatusItem
          label="Failover خودکار"
          value={
            status ? (status.automaticFailover ? "فعال" : "غیرفعال") : "نامشخص"
          }
          state={
            !status
              ? "loading"
              : status.automaticFailover
                ? "success"
                : "warning"
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {/* قطع Supabase */}
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            onAction({
              type: "supabase",
              value: false,
            })
          }
          className={`${buttonBase} ${
            busy
              ? disabledButton
              : "border-gray-300 bg-white text-black hover:bg-gray-50"
          }`}
        >
          قطع Supabase
        </button>

        {/* انتقال به MongoDB */}
        <button
          type="button"
          disabled={busy || !status}
          onClick={() => selectDatabase("mongo")}
          className={`${buttonBase} ${
            busy || !status ? disabledButton : activeButton
          }`}
        >
          انتقال به MongoDB
        </button>

        {/* بازگشت به Supabase */}
        <button
          type="button"
          disabled={busy || !status}
          onClick={() => selectDatabase("supabase")}
          className={`${buttonBase} ${
            busy || !status ? disabledButton : activeButton
          }`}
        >
          بازگشت به Supabase
        </button>

        {/* فعال یا غیرفعال کردن Failover خودکار */}
        <button
          type="button"
          disabled={busy || !status}
          onClick={() => {
            if (!status) return;

            onAction({
              type: "automatic",
              value: !status.automaticFailover,
            });
          }}
          className={`${buttonBase} ${
            busy || !status ? disabledButton : activeButton
          }`}
        >
          {status?.automaticFailover
            ? "غیرفعال‌سازی Failover خودکار"
            : "فعال‌سازی Failover خودکار"}
        </button>
      </div>

      {busy && (
        <p role="status" className="mt-4 text-sm text-blue-700">
          در حال اعمال تنظیمات...
        </p>
      )}

      {message && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700"
        >
          {message}
        </p>
      )}
    </section>
  );
}
