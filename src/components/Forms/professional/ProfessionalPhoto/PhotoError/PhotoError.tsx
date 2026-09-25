import { FiX } from "react-icons/fi";

interface PhotoErrorProps {
  error?: string | null;
}

export function PhotoError({ error }: PhotoErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-600"
    >
      <FiX className="mt-0.5 shrink-0" size={14} />
      <span>{error}</span>
    </div>
  );
}
