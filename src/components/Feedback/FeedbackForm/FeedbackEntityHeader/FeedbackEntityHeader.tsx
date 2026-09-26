import type { FeedbackFormProps } from "@/Types/types";
import type { EntityInfo } from "@/hooks/useFeedbackEntity";

interface FeedbackEntityHeaderProps {
  entity: EntityInfo;
  type: FeedbackFormProps["type"];
}

function getEntityTitle(type: FeedbackFormProps["type"]) {
  switch (type) {
    case "doctor":
      return "ثبت نظر درباره پزشک";

    case "consultant":
      return "ثبت نظر درباره مشاور";

    case "clinic":
      return "ثبت نظر درباره کلینیک";
  }
}

function getEntityLabel(type: FeedbackFormProps["type"]) {
  switch (type) {
    case "doctor":
      return "پزشک";

    case "consultant":
      return "مشاور";

    case "clinic":
      return "کلینیک";
  }
}

export default function FeedbackEntityHeader({
  entity,
  type,
}: FeedbackEntityHeaderProps) {
  const title = getEntityTitle(type);
  const label = getEntityLabel(type);

  return (
    <div className="mb-7 rounded-3xl border border-sky-100 bg-sky-50/50 p-4">
      <div className="flex items-center gap-4">
        {/* Photo */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-white">
          {entity.photo_url ? (
            <img
              src={entity.photo_url}
              alt={entity.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sky-100 text-2xl font-black text-sky-600">
              {entity.name?.charAt(0) || "؟"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-slate-400">{title}</p>

          <h2 className="mt-1 truncate text-lg font-black text-slate-900">
            {entity.name}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            تجربه خود را درباره این {label} با ما به اشتراک بگذارید.
          </p>
        </div>
      </div>
    </div>
  );
}
