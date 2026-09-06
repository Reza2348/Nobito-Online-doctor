"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { AdminConsultant } from "@/Types/types";

import {
  deleteConsultant,
  fetchConsultants,
  updateConsultant,
} from "@/components/admin/ConsultantsTable/service/consultants.service";

interface UseConsultantsProps {
  initialConsultants: AdminConsultant[];
  onDelete?: (id: string) => void;
}

export function useConsultants({
  initialConsultants,
  onDelete,
}: UseConsultantsProps) {
  const [consultantList, setConsultantList] =
    useState<AdminConsultant[]>(initialConsultants);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [editingConsultant, setEditingConsultant] =
    useState<AdminConsultant | null>(null);

  const [savingId, setSavingId] = useState<string | null>(null);

  // دریافت مشاوران
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const consultants = await fetchConsultants();

      setConsultantList(consultants);
    } catch (error) {
      console.error("FETCH CONSULTANTS ERROR:", error);

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

  // حذف مشاور
  const remove = useCallback(
    async (id: string) => {
      const confirmed = window.confirm("آیا از حذف این مشاور مطمئن هستید؟");

      if (!confirmed) {
        return;
      }

      try {
        setSavingId(id);

        await deleteConsultant(id);

        setConsultantList((current) =>
          current.filter((consultant) => String(consultant.id) !== String(id)),
        );

        onDelete?.(id);

        toast.success("مشاور با موفقیت حذف شد.");
      } catch (error) {
        console.error("DELETE CONSULTANT ERROR:", error);

        toast.error(
          error instanceof Error ? error.message : "خطا در حذف مشاور",
        );
      } finally {
        setSavingId(null);
      }
    },
    [onDelete],
  );

  // باز کردن فرم ویرایش
  const edit = useCallback((consultant: AdminConsultant) => {
    setEditingConsultant(consultant);
  }, []);

  // بستن فرم ویرایش
  const closeEdit = useCallback(() => {
    if (savingId) {
      return;
    }

    setEditingConsultant(null);
  }, [savingId]);

  // ذخیره ویرایش
  const saveEdit = useCallback(
    async (updatedConsultant: AdminConsultant) => {
      if (!editingConsultant) {
        return;
      }

      const consultantId = String(editingConsultant.id);

      try {
        setSavingId(consultantId);

        const updated = await updateConsultant(consultantId, updatedConsultant);

        setConsultantList((current) =>
          current.map((consultant) =>
            String(consultant.id) === consultantId ? updated : consultant,
          ),
        );

        setEditingConsultant(null);

        toast.success("اطلاعات مشاور با موفقیت ویرایش شد.");
      } catch (error) {
        console.error("UPDATE CONSULTANT ERROR:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "هنگام ویرایش مشاور خطایی رخ داد.",
        );
      } finally {
        setSavingId(null);
      }
    },
    [editingConsultant],
  );

  return {
    consultantList,
    loading,
    errorMessage,
    editingConsultant,
    savingId,

    actions: {
      load,
      remove,
      edit,
      closeEdit,
      saveEdit,
    },
  };
}
