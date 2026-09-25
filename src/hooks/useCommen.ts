"use client";

import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import type { Comment } from "@/Types/types";

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase.from("Comments").select("*");

      if (error) {
        throw error;
      }

      setComments(data || []);
    } catch (error) {
      console.error("FETCH COMMENTS ERROR:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "خطا در دریافت نظرات",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    comments,
    loading,
    errorMessage,
    actions: { load },
  };
}
