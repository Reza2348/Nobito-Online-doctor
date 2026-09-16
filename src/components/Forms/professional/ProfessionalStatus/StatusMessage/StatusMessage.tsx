import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { STATUS_TEXT } from "../constants/constants";

interface StatusMessageProps {
  title: string;
  active: boolean;
}

export function StatusMessage({ title, active }: StatusMessageProps) {
  const text = active ? STATUS_TEXT.active : STATUS_TEXT.inactive;

  return (
    <div
      className={`
        mt-5
        flex
        items-center
        gap-2
        rounded-xl
        border
        px-3.5
        py-2.5
        text-xs
        transition-all
        duration-300
        ${
          active
            ? `
              border-emerald-100
              bg-emerald-50
              text-emerald-700
            `
            : `
              border-gray-100
              bg-gray-50
              text-gray-500
            `
        }
      `}
    >
      {active ? (
        <FiCheckCircle size={14} className="shrink-0 text-emerald-500" />
      ) : (
        <FiXCircle size={14} className="shrink-0 text-gray-400" />
      )}

      <span>
        این {title} <strong className="font-semibold">{text.message}</strong>
      </span>
    </div>
  );
}
