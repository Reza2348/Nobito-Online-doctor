"use client";

import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";

import type { AdminClinic } from "@/Types/types";

import {
  deleteClinic,
  fetchClinics,
  updateClinic,
} from "@/components/admin/ClinicsTable/service/clinics.service";

interface UseClinicsProps {
  initialClinics: AdminClinic[];
  onDelete?: (id: string) => void;
}

export function useClinics({ initialClinics, onDelete }: UseClinicsProps) {
  const [clinicList, setClinicList] = useState<AdminClinic[]>(initialClinics);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [editingClinic, setEditingClinic] = useState<AdminClinic | null>(null);

  const [savingId, setSavingId] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  // =========================================================
  // دریافت لیست کلینیک‌ها
  // =========================================================

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const clinics = await fetchClinics();

      setClinicList(clinics);
    } catch (error) {
      console.error("CLINICS LOAD ERROR:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "خطای اتصال به Supabase",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // =========================================================
  // باز کردن فرم ویرایش
  // =========================================================

  const edit = useCallback((clinic: AdminClinic) => {
    setEditingClinic(clinic);
  }, []);

  // =========================================================
  // بستن فرم ویرایش
  // =========================================================

  const closeEdit = useCallback(() => {
    if (savingId !== null) {
      return;
    }

    setEditingClinic(null);
  }, [savingId]);

  // =========================================================
  // ذخیره ویرایش
  // =========================================================

  const saveEdit = useCallback(async (updatedClinic: AdminClinic) => {
    const clinicId = String(updatedClinic.id);

    try {
      setSavingId(clinicId);

      const clinicAfterUpdate = await updateClinic(clinicId, updatedClinic);

      setClinicList((current) =>
        current.map((clinic) =>
          String(clinic.id) === clinicId ? clinicAfterUpdate : clinic,
        ),
      );

      setEditingClinic(null);

      toast.success("اطلاعات کلینیک با موفقیت ویرایش شد.");
    } catch (error) {
      console.error("UPDATE CLINIC ERROR:", error);

      toast.error(
        error instanceof Error ? error.message : "خطا در ویرایش کلینیک",
      );
    } finally {
      setSavingId(null);
    }
  }, []);

  // =========================================================
  // حذف کلینیک
  // =========================================================

  const remove = useCallback(
    async (id: string) => {
      const confirmed = window.confirm("آیا از حذف این کلینیک مطمئن هستید؟");

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(id);

        await deleteClinic(id);

        setClinicList((current) =>
          current.filter((clinic) => String(clinic.id) !== String(id)),
        );

        setEditingClinic((current) =>
          current && String(current.id) === String(id) ? null : current,
        );

        onDelete?.(id);

        toast.success("کلینیک با موفقیت حذف شد.");
      } catch (error) {
        console.error("DELETE CLINIC ERROR:", error);

        toast.error(
          error instanceof Error ? error.message : "خطا در حذف کلینیک",
        );
      } finally {
        setDeletingId(null);
      }
    },
    [onDelete],
  );

  // =========================================================
  // خروجی Hook
  // =========================================================

  return {
    clinicList,
    loading,
    errorMessage,
    editingClinic,
    savingId,
    deletingId,

    actions: {
      load,
      edit,
      remove,
      closeEdit,
      saveEdit,
    },
  };
}
