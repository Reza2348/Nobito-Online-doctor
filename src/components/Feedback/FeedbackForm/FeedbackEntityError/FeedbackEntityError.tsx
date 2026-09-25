import type { FeedbackFormProps } from "@/Types/types";

interface FeedbackEntityErrorProps {
  entityId: FeedbackFormProps["entityId"];
  type: FeedbackFormProps["type"];
  message: string | null;
}

function getDefaultMessage(type: FeedbackFormProps["type"]) {
  switch (type) {
    case "doctor":
      return "اطلاعات پزشک پیدا نشد.";

    case "consultant":
      return "اطلاعات مشاور پیدا نشد.";

    case "clinic":
      return "اطلاعات کلینیک پیدا نشد.";
  }
}

export default function FeedbackEntityError({
  entityId,
  type,
  message,
}: FeedbackEntityErrorProps) {
  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-red-100 bg-white p-6 shadow-sm"
    >
      <div className="rounded-2xl bg-red-50 px-4 py-5 text-center">
        <p className="font-bold text-red-600">
          {message || getDefaultMessage(type)}
        </p>

        <p className="mt-2 text-xs text-red-400">شناسه: {entityId}</p>
      </div>
    </section>
  );
}
