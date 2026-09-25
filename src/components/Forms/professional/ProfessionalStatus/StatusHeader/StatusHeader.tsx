import { FiCheckCircle, FiPower } from "react-icons/fi";
import { STATUS_TEXT } from "../constants/constants";

interface StatusHeaderProps {
  title: string;
  active: boolean;
}

export function StatusHeader({ title, active }: StatusHeaderProps) {
  const text = active ? STATUS_TEXT.active : STATUS_TEXT.inactive;

  return (
    <div className="min-w-0 flex-1">
      {/* Title + Badge */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Icon */}
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300
            ${
              active
                ? "bg-emerald-100 text-emerald-600"
                : "bg-gray-100 text-gray-400"
            }
          `}
        >
          {active ? <FiCheckCircle size={18} /> : <FiPower size={18} />}
        </div>

        {/* Title */}
        <h3
          className={`
            text-base
            font-semibold
            tracking-tight
            sm:text-lg
            ${active ? "text-gray-900" : "text-gray-800"}
          `}
        >
          وضعیت {title}
        </h3>

        {/* Badge */}
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            transition-all
            duration-300
            ${
              active
                ? `
                  bg-emerald-100
                  text-emerald-700
                  ring-1
                  ring-inset
                  ring-emerald-200
                `
                : `
                  bg-gray-100
                  text-gray-500
                  ring-1
                  ring-inset
                  ring-gray-200
                `
            }
          `}
        >
          <span
            aria-hidden="true"
            className={`
              h-1.5
              w-1.5
              rounded-full
              transition-all
              duration-300
              ${
                active
                  ? `
                    bg-emerald-500
                    shadow-[0_0_0_3px_rgba(16,185,129,0.12)]
                  `
                  : "bg-gray-400"
              }
            `}
          />

          {text.badge}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
        {active ? (
          <>
            <span className="font-medium text-emerald-600">{title}</span> بعد از
            ثبت در سایت نمایش داده و فعال خواهد بود.
          </>
        ) : (
          <>
            <span className="font-medium text-gray-600">{title}</span> بعد از
            ثبت در سایت غیرفعال خواهد بود.
          </>
        )}
      </p>
    </div>
  );
}
