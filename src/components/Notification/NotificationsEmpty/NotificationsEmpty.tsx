import { FaBell } from "react-icons/fa6";

export function NotificationsEmpty() {
  return (
    <div
      className="
        rounded-3xl border border-dashed
        border-gray-200 bg-white
        py-16 text-center shadow-sm
      "
    >
      <FaBell className="mx-auto mb-4 text-4xl text-gray-300" />

      <h2 className="font-bold text-gray-600">اعلانی وجود ندارد</h2>

      <p className="mt-2 text-sm text-gray-400">
        در حال حاضر هیچ اعلانی برای شما ثبت نشده است.
      </p>
    </div>
  );
}
