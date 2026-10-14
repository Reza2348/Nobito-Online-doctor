import type { CheckState } from "@/Types/types";

interface StatusItemProps {
  label: string;
  value: string;
  state?: CheckState;
}

const stateClasses: Record<CheckState, string> = {
  loading: "bg-gray-100 text-gray-700",
  success: "bg-green-100 text-green-800",
  warning: "bg-gray-100 text-gray-700",
  error: "bg-red-100 text-red-800",
};

export default function StatusItem({
  label,
  value,
  state = "loading",
}: StatusItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <span
        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${stateClasses[state]}`}
      >
        {value}
      </span>
    </div>
  );
}
