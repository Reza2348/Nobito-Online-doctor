"use client";

import React, { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import type { Doctor } from "@/Types/types";

import { useDoctor } from "@/context/DoctorContext/DoctorContext";

import ProviderProfile from "@/components/shared/ProviderProfile/ProviderProfile";
import { fromDoctor } from "@/components/shared/Adapters/Adapters";

export default function DoctorProfile() {
  const { doctorId } = useDoctor();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) {
      setDoctor(null);
      setLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from("doctors")
          .select("*")
          .eq("id", doctorId)
          .single();

        if (supabaseError) {
          setError("خطا در دریافت اطلاعات پزشک.");
          setDoctor(null);
          return;
        }

        setDoctor(data);
      } catch {
        setError("خطایی هنگام دریافت اطلاعات پزشک رخ داد.");
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div
        className="flex flex-col sm:flex-row items-center justify-center min-h-screen gap-4 px-4"
        role="status"
        aria-live="polite"
      >
        <span className="text-gray-500 font-bold text-lg whitespace-nowrap">
          در حال بارگذاری پروفایل پزشک...
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
      <div className="p-10 text-center text-red-500 font-bold" role="alert">
        {error}
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        پزشکی انتخاب نشده است.
      </div>
    );
  }

  return <ProviderProfile kind="doctor" data={fromDoctor(doctor)} />;
}
