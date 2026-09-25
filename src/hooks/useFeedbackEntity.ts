import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { FeedbackFormProps } from "@/Types/types";

export interface EntityInfo {
  id: number;
  name: string;
  photo_url: string | null;
}

type EntityTable = "doctors" | "consultants" | "clinics";

function getEntityTable(type: FeedbackFormProps["type"]): EntityTable {
  switch (type) {
    case "doctor":
      return "doctors";

    case "consultant":
      return "consultants";

    case "clinic":
      return "clinics";
  }
}

function getEntityName(type: FeedbackFormProps["type"]): string {
  switch (type) {
    case "doctor":
      return "پزشک";

    case "consultant":
      return "مشاور";

    case "clinic":
      return "کلینیک";
  }
}

export function useFeedbackEntity(
  type: FeedbackFormProps["type"],
  entityId: FeedbackFormProps["entityId"],
) {
  const [entity, setEntity] = useState<EntityInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEntity = async () => {
      setLoading(true);
      setEntity(null);
      setError(null);

      const numericEntityId =
        typeof entityId === "number" ? entityId : Number(entityId);

      if (!Number.isInteger(numericEntityId) || numericEntityId <= 0) {
        if (!isMounted) return;

        setError("شناسه پزشک، مشاور یا کلینیک نامعتبر است.");
        setLoading(false);

        return;
      }

      const table = getEntityTable(type);
      const entityName = getEntityName(type);

      try {
        const { data, error: fetchError } = await supabase
          .from(table)
          .select("id, name, photo_url")
          .eq("id", numericEntityId)
          .maybeSingle();

        if (!isMounted) return;

        if (fetchError) {
          console.error("Feedback entity fetch error:", fetchError);

          setError(`اطلاعات ${entityName} دریافت نشد.`);

          setLoading(false);

          return;
        }

        if (!data) {
          setError(`${entityName} موردنظر پیدا نشد.`);

          setLoading(false);

          return;
        }

        setEntity({
          id: data.id,
          name: data.name,
          photo_url: data.photo_url ?? null,
        });

        setLoading(false);
      } catch (err) {
        console.error("Feedback entity fetch failed:", err);

        if (!isMounted) return;

        setError("دریافت اطلاعات با خطا مواجه شد.");

        setLoading(false);
      }
    };

    fetchEntity();

    return () => {
      isMounted = false;
    };
  }, [entityId, type]);

  return {
    entity,
    loading,
    error,
  };
}
