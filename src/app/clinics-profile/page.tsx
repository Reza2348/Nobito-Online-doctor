"use client";

import React, { useEffect, useState } from "react";
import { useClinics } from "@/context/ClinicsContext/ClinicsContext";
import { supabase } from "@/lib/supabaseClient";
import { Clinic } from "@/Types/types";
import ClinicProfile from "@/components/ClinicsProfile/ClinicsProfile";

export default function ClinicsProfilePage() {
  const { selectedClinic, setSelectedClinic } = useClinics();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinic = async () => {
      setLoading(true);
      setError(null);

      try {
        const id = selectedClinic?.id ?? 1; // اگر چیزی انتخاب نشده بود یک id پیش‌فرض
        const { data, error } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", id)
          .single();

        if (error) setError(error.message);
        else {
          setClinic(data as Clinic);
          setSelectedClinic(data as Clinic); // آپدیت Context
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [selectedClinic?.id, setSelectedClinic]);

  // نمایش Spinner هنگام بارگذاری
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        <span className="text-gray-500 font-bold text-lg">
          در حال بارگذاری پروفایل کلینیک...
        </span>
        <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  // نمایش خطا
  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        خطا در دریافت اطلاعات: {error}
      </p>
    );
  }

  // اگر کلینیک پیدا نشد
  if (!clinic) {
    return (
      <p className="text-center mt-10 text-gray-500">
        کلینیک مورد نظر پیدا نشد.
      </p>
    );
  }

  // نمایش پروفایل کلینیک
  return <ClinicProfile clinic={clinic} />;
}
