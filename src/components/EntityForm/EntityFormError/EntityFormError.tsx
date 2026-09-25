interface EntityFormErrorProps {
  error: string;
}

export default function EntityFormError({ error }: EntityFormErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <div
      className="
        mt-5
        rounded-xl
        border border-red-200
        bg-red-50
        px-4 py-3
        text-sm
        text-red-600
      "
      role="alert"
    >
      {error}
    </div>
  );
}
