"use client";

import type { FocusEvent } from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

import type { IdentifierKind } from "@/Types/types";

interface LoginIdentifierFieldProps {
  value: string;
  error?: string;
  disabled?: boolean;
  kind: IdentifierKind;

  onChange: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export function LoginIdentifierField({
  value,
  error,
  disabled,
  kind,
  onChange,
  onFocus,
  onBlur,
}: LoginIdentifierFieldProps) {
  const hasError = Boolean(error);

  const Icon = kind === "email" ? HiOutlineMail : HiOutlinePhone;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative">
        <span
          className={`
            pointer-events-none
            absolute inset-y-0 right-4
            flex items-center
            transition-colors duration-200
            ${
              hasError
                ? "text-red-400"
                : kind !== "neutral"
                  ? "text-brand"
                  : "text-gray-400"
            }
          `}
        >
          <Icon size={20} />
        </span>

        <input
          type="text"
          inputMode="email"
          autoComplete="username"
          placeholder="ایمیل یا شماره موبایل"
          disabled={disabled}
          dir="ltr"
          value={value}
          aria-invalid={hasError}
          aria-describedby={hasError ? "identifier-error" : undefined}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`
            w-full
            rounded-xl
            border
            bg-white
            py-4
            pr-12
            pl-4
            text-right
            text-black
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-200
            disabled:cursor-not-allowed
            disabled:opacity-60

            ${
              hasError
                ? `
                  border-red-400
                  focus:ring-2
                  focus:ring-red-200
                `
                : `
                  border-gray-300
                  focus:border-brand
                  focus:ring-2
                  focus:ring-brand/25
                `
            }
          `}
        />
      </div>

      {error && (
        <p
          id="identifier-error"
          role="alert"
          className="
            flex items-center
            gap-1
            text-sm
            text-red-500
            animate-in
            fade-in
            slide-in-from-top-1
            duration-200
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}
