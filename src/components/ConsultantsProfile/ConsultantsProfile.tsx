"use client";

import React, { useEffect, useState } from "react";

import axiosClient, { getAxiosErrorMessage } from "@/lib/axiosClient";

import type { Consultant } from "@/Types/types";

import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";

import ProviderProfile from "@/components/shared/ProviderProfile/ProviderProfile";

import { fromConsultant } from "@/components/shared/Adapters/Adapters";

interface ConsultantResponse {
  success: boolean;
  data: Consultant;
}

export const ConsultantsProfile: React.FC = () => {
  const { consultantId } = useConsultant();

  const [consultant, setConsultant] = useState<Consultant | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!consultantId) {
      setConsultant(null);
      setLoading(false);
      return;
    }

    const fetchConsultant = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get<ConsultantResponse>(
          `/api/consultants/${consultantId}`,
        );

        setConsultant(response.data.data);
      } catch (error) {
        setError(getAxiosErrorMessage(error, "خطا در دریافت اطلاعات مشاور."));

        setConsultant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultant();
  }, [consultantId]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 sm:flex-row"
        role="status"
        aria-live="polite"
      >
        <span className="whitespace-nowrap text-lg font-bold text-gray-500">
          در حال بارگذاری پروفایل مشاور...
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

  if (!consultant) {
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        مشاوری انتخاب نشده است.
      </div>
    );
  }

  return (
    <ProviderProfile kind="consultant" data={fromConsultant(consultant)} />
  );
};

export default ConsultantsProfile;
