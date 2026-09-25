interface Props {
  saving: boolean;
}

export default function SavingIndicator({ saving }: Props) {
  if (!saving) {
    return null;
  }

  return (
    <div
      className="
        mt-5
        flex
        items-center
        gap-2.5
        rounded-2xl
        border
        border-blue-100
        bg-blue-50
        px-4 py-3
        text-xs
        font-bold
        text-blue-700
      "
    >
      <span
        className="
          h-4 w-4
          animate-spin
          rounded-full
          border-2
          border-blue-200
          border-t-blue-600
        "
      />
      در حال پردازش...
    </div>
  );
}
