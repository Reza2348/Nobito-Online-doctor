"use client";

import React, { useEffect, useState } from "react";

import axiosClient, { getAxiosErrorMessage } from "@/lib/axiosClient";

import type { Doctor } from "@/Types/types";

import { useDoctor } from "@/context/DoctorContext/DoctorContext";

import ProviderProfile from "@/components/shared/ProviderProfile/ProviderProfile";

import { fromDoctor } from "@/components/shared/Adapters/Adapters";

interface DoctorResponse {
  success: boolean;
  data: Doctor;
}

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
        const response = await axiosClient.get<DoctorResponse>(
          `/api/doctors/${doctorId}`,
        );

        setDoctor(response.data.data);
      } catch (error) {
        setError(getAxiosErrorMessage(error, "خطا در دریافت اطلاعات پزشک."));

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
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 sm:flex-row"
        role="status"
        aria-live="polite"
      >
        <span className="whitespace-nowrap text-lg font-bold text-gray-500">
          در حال بارگذاری پروفایل پزشک...
        </span>

        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center font-bold text-red-500" role="alert">
        {error}
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        پزشکی انتخاب نشده است.
      </div>
    );
  }

  return <ProviderProfile kind="doctor" data={fromDoctor(doctor)} />;
}
