interface OtpSubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  onSubmit: () => void;
}

export default function OtpSubmitButton({
  isSubmitting,
  disabled = false,
  onSubmit,
}: OtpSubmitButtonProps) {
  const isDisabled = disabled || isSubmitting;

  return (
    <button
      type="button"
      onClick={onSubmit}
      disabled={isDisabled}
      aria-live="polite"
      className={`
        mt-2
        w-full
        rounded-xl
        py-3
        text-sm
        font-bold
        text-white
        transition-colors
        sm:py-4
        sm:text-base

        ${
          isDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "bg-brand hover:bg-brand-dark"
        }
      `}
    >
      {isSubmitting ? "در حال تایید..." : "تایید و ورود به داشبورد"}
    </button>
  );
}
