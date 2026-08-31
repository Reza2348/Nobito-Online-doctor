interface FeedbackFormStatusProps {
  error: string | null;
  message: string | null;
}

export default function FeedbackFormStatus({
  error,
  message,
}: FeedbackFormStatusProps) {
  return (
    <>
      {error && (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          {message}
        </div>
      )}
    </>
  );
}
