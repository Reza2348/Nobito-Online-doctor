"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";

import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";

import { ConsultantsProfile } from "@/components/ConsultantsProfile/ConsultantsProfile";

import type { Consultant } from "@/Types/types";

export default function ConsultantProfilePage() {
  const { consultantId: contextId, setConsultantId } = useConsultant();

  const [consultant, setConsultant] = useState<Consultant | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const consultantId = contextId ?? 1;

  useEffect(() => {
    if (!contextId) {
      setConsultantId(consultantId);
    }

    const fetchConsultant = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from("consultants")
          .select("*")
          .eq("id", consultantId)
          .single();

        if (supabaseError) {
          setError("خطا در دریافت اطلاعات مشاور.");
          setConsultant(null);
          return;
        }

        setConsultant(data);
      } catch {
        setError("خطایی هنگام دریافت اطلاعات مشاور رخ داد.");
        setConsultant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultant();
  }, [consultantId, contextId, setConsultantId]);

  if (loading) {
    return (
      <div
        className="flex flex-col sm:flex-row items-center justify-center min-h-screen gap-4 px-4"
        role="status"
        aria-live="polite"
      >
        <span className="text-gray-500 font-bold text-lg whitespace-nowrap">
          در حال بارگذاری پروفایل مشاور...
        </span>

        <div
          className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500" role="alert">
        {error}
      </div>
    );
  }

  if (!consultant) {
    return (
      <div className="text-center mt-10 text-gray-500">مشاور پیدا نشد.</div>
    );
  }

  return <ConsultantsProfile consultant={consultant} />;
}
