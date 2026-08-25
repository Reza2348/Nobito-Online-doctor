"use client";

import React, { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import type { Doctor } from "@/Types/types";

import { useDoctor } from "@/context/DoctorContext/DoctorContext";

import DoctorHeader from "@/components/DoctorProfile/DoctorHeader/DoctorHeader";
import DoctorBio from "@/components/DoctorProfile/DoctorBio/DoctorBio";
import DoctorLocation from "@/components/DoctorProfile/DoctorLocation/DoctorLocation";
import DoctorAppointments from "@/components/DoctorProfile/DoctorAppointments/DoctorAppointments";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";
import Warning from "@/components/Warning/Warning";

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

  return (
    <div dir="rtl" className="max-w-7xl mx-auto p-4 md:p-8 text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          <DoctorHeader doctor={doctor} />

          {/* MOBILE */}
          <div className="flex flex-col gap-5 lg:hidden w-full">
            <DoctorAppointments doctor={doctor} />
          </div>

          <div className="lg:hidden">
            <Warning />
          </div>

          <div className="lg:hidden space-y-6">
            <DoctorBio doctor={doctor} />
            <DoctorLocation doctor={doctor} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block space-y-6">
            <DoctorBio doctor={doctor} />
            <DoctorLocation doctor={doctor} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <DoctorAppointments doctor={doctor} />
            </div>

            <div className="hidden lg:block">
              <Warning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
