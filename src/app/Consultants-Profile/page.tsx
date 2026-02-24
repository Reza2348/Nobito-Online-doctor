"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useConsultant } from "@/context/ConsultantsContext";
import { ConsultantsProfile } from "@/components/ConsultantsProfile/ConsultantsProfile";
import type { Consultant } from "@/Types/types";

export default function ConsultantProfilePage() {
  const { consultantId: contextId, setConsultantId } = useConsultant();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ID پیش‌فرض وقتی کاربر مستقیم وارد شود
  const consultantId = contextId ?? 1;

  useEffect(() => {
    if (!contextId) setConsultantId(consultantId);

    const fetchConsultant = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("consultants")
          .select("*")
          .eq("id", consultantId)
          .single();

        if (error) setError(error.message);
        else setConsultant(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultant();
  }, [consultantId, contextId, setConsultantId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        {/* متن سمت راست */}
        <span className="text-gray-500 font-bold text-lg">
          در حال بارگذاری پروفایل...
        </span>

        {/* spinner سمت چپ */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!consultant)
    return <p className="text-center mt-10 text-gray-500">مشاور پیدا نشد.</p>;

  return <ConsultantsProfile consultant={consultant} />;
}
