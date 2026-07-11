"use client";

import { useEffect, useRef, useState } from "react";
import { useClinics } from "@/context/ClinicsContext/ClinicsContext";
import { supabase } from "@/lib/supabaseClient";
import { Clinic } from "@/Types/types";

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
        const { data, error } = await supabase
          .from("clinics")
          .select("*")
          .eq("id", id)
          .single();

        if (cancelled) return;

        if (error) {
          setError(error.message);
        } else {
          const fetchedClinic = data as Clinic;
          setClinic(fetchedClinic);

          if (selectedClinicRef.current?.id !== fetchedClinic.id) {
            setSelectedClinic(fetchedClinic);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "خطای ناشناخته رخ داد");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchClinic();

    return () => {
      cancelled = true;
    };
  }, [clinicId, setSelectedClinic]);

  return { clinic, loading, error };
}
