"use client";

import { FiCheckCircle, FiPower, FiXCircle } from "react-icons/fi";

interface ProfessionalStatusProps {
  title: string;
  isActive: boolean;
  onChange: (checked: boolean) => void;
}

export default function ProfessionalStatus({
  title,
  isActive,
  onChange,
}: ProfessionalStatusProps) {
  const active = isActive === true;

  const handleToggle = () => {
    onChange(!active);
  };

  return (
    <section
      dir="rtl"
      className={`
        rounded-2xl
        border
        p-5 sm:p-6
        transition-all duration-300
        ${
          active
            ? `
              border-emerald-200/80
              bg-emerald-50/30
              shadow-[0_2px_12px_rgba(16,185,129,0.06)]
              hover:border-emerald-300
              hover:shadow-[0_6px_24px_rgba(16,185,129,0.10)]
            `
            : `
              border-gray-200/80
              bg-white
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              hover:border-gray-300
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
            `
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-5">
        {/* Content */}
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

              {active ? "فعال" : "غیرفعال"}
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            {active ? (
              <>
                <span className="font-medium text-emerald-600">{title}</span>{" "}
                بعد از ثبت در سایت نمایش داده و فعال خواهد بود.
              </>
            ) : (
              <>
                <span className="font-medium text-gray-600">{title}</span> بعد
                از ثبت در سایت غیرفعال خواهد بود.
              </>
            )}
          </p>
        </div>

        {/* Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={`تغییر وضعیت ${title}`}
          onClick={handleToggle}
          className="
            relative
            inline-flex
            shrink-0
            cursor-pointer
            items-center
            rounded-full
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            focus-visible:ring-offset-2
          "
        >
          {/* Switch Track */}
          <span
            aria-hidden="true"
            className={`
              relative
              h-7
              w-12
              rounded-full
              shadow-inner
              ring-1
              ring-inset
              ring-black/5
              transition-all
              duration-300
              ease-out

              ${
                active
                  ? `
                    bg-emerald-500
                    shadow-[0_3px_10px_rgba(16,185,129,0.30)]
                  `
                  : `
                    bg-gray-300
                    hover:bg-gray-400
                  `
              }

              after:absolute
              after:right-1
              after:top-1
              after:h-5
              after:w-5
              after:rounded-full
              after:bg-white
              after:shadow-[0_1px_4px_rgba(0,0,0,0.20)]
              after:transition-transform
              after:duration-300
              after:ease-out

              ${active ? "after:-translate-x-5" : "after:translate-x-0"}
            `}
          />
        </button>
      </div>

      {/* Bottom Status */}
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
          <>
            <FiCheckCircle size={14} className="shrink-0 text-emerald-500" />

            <span>
              این {title} در حال حاضر{" "}
              <strong className="font-semibold">فعال</strong> است.
            </span>
          </>
        ) : (
          <>
            <FiXCircle size={14} className="shrink-0 text-gray-400" />

            <span>
              این {title} در حال حاضر{" "}
              <strong className="font-semibold">غیرفعال</strong> است و در سایت
              نمایش داده نمی‌شود.
            </span>
          </>
        )}
      </div>
    </section>
  );
}
