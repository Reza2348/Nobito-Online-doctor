"use client";

import { useEffect, useRef, useState } from "react";

import { useClinics } from "@/context/ClinicsContext/ClinicsContext";

import axiosClient, { getAxiosErrorMessage } from "@/lib/axiosClient";

import type { Clinic } from "@/Types/types";

interface ClinicResponse {
  success: boolean;
  data: Clinic;
}

export function useClinicProfile() {
  const { selectedClinic, setSelectedClinic } = useClinics();

  const [clinic, setClinic] = useState<Clinic | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const clinicId = selectedClinic?.id;

  const selectedClinicRef = useRef(selectedClinic);

  useEffect(() => {
    selectedClinicRef.current = selectedClinic;
  }, [selectedClinic]);

  useEffect(() => {
    let cancelled = false;

    const fetchClinic = async () => {
      setLoading(true);
      setError(null);

      try {
        const id = clinicId ?? 1;

        const response = await axiosClient.get<ClinicResponse>(
          `/api/clinics/${id}`,
        );

        if (cancelled) return;

        const fetchedClinic = response.data.data;

        setClinic(fetchedClinic);

        if (selectedClinicRef.current?.id !== fetchedClinic.id) {
          setSelectedClinic(fetchedClinic);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            getAxiosErrorMessage(error, "خطا در دریافت اطلاعات کلینیک."),
          );

          setClinic(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchClinic();

    return () => {
      cancelled = true;
    };
  }, [clinicId, setSelectedClinic]);

  return {
    clinic,
    loading,
    error,
  };
}
