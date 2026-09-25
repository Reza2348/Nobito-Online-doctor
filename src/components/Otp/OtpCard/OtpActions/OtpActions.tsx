"use client";

import { MdArrowForward, MdRefresh } from "react-icons/md";

interface OtpActionsProps {
  cooldown: number;
  isResending: boolean;
  isChangingEmail: boolean;
  isSubmitting: boolean;
  onResend: () => void | Promise<void>;
  onChangeEmail: () => void | Promise<void>;
}

export default function OtpActions({
  cooldown,
  isResending,
  isChangingEmail,
  isSubmitting,
  onResend,
  onChangeEmail,
}: OtpActionsProps) {
  const isBusy = isResending || isChangingEmail || isSubmitting;

  const minutes = String(Math.floor(cooldown / 60)).padStart(2, "0");

  const seconds = String(cooldown % 60).padStart(2, "0");

  return (
    <div
      className="
        mt-3
        flex
        w-full
        items-center
        justify-center
        gap-2
        text-xs
        sm:text-sm
      "
    >
      {cooldown > 0 ? (
        <span className="text-gray-500">
          ارسال مجدد کد تا{" "}
          <span dir="ltr" className="font-medium text-gray-700">
            {minutes}:{seconds}
          </span>{" "}
          دیگر
        </span>
      ) : (
        <button
          type="button"
          onClick={onResend}
          disabled={isBusy}
          className="
            inline-flex
            items-center
            gap-1.5
            font-bold
            text-brand
            transition-colors
            hover:text-brand-dark
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <MdRefresh
            size={15}
            className={isResending ? "animate-spin" : undefined}
          />

          {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
        </button>
      )}

      <span className="select-none text-gray-300">|</span>

      <button
        type="button"
        onClick={onChangeEmail}
        disabled={isBusy}
        className="
          inline-flex
          items-center
          gap-1
          font-medium
          text-gray-500
          transition-colors
          hover:text-gray-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdArrowForward size={14} />

        {isChangingEmail ? "در حال تغییر..." : "تغییر ایمیل"}
      </button>
    </div>
  );
}
