"use client";

import { MdLocalHospital } from "react-icons/md";

import type { AdminClinic } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import ClinicCard from "@/components/admin/ClinicsTable/ClinicCard/ClinicCard";
import EntityTable from "@/components/shared/EntityTable/EntityTable";

import { useClinics } from "@/hooks/useClinics";

interface Props {
  clinics?: AdminClinic[];
  onDelete?: (id: string) => void;
}

export default function ClinicsTable({ clinics = [], onDelete }: Props) {
  const {
    clinicList,
    loading,
    errorMessage,
    editingClinic,
    savingId,
    deletingId,
    actions,
  } = useClinics({
    initialClinics: clinics,
    onDelete,
  });

  return (
    <EntityTable
      icon={<MdLocalHospital size={28} />}
      title="کلینیک‌ها"
      subtitle="مدیریت مراکز درمانی سیستم"
      accent="blue"
      loadingText="در حال دریافت کلینیک‌ها..."
      emptyTitle="هنوز کلینیکی ثبت نشده است."
      emptyDescription="کلینیک‌های ثبت‌شده در جدول clinics اینجا نمایش داده می‌شوند."
      errorTitle="خطا در دریافت کلینیک‌ها"
      items={clinicList}
      loading={loading}
      errorMessage={errorMessage}
      savingId={savingId}
      onRefresh={actions.load}
      onRetry={actions.load}
      getItemId={(clinic) => String(clinic.id)}
      renderItem={(clinic) => (
        <ClinicCard
          clinic={clinic}
          deleting={deletingId === String(clinic.id)}
          saving={savingId === String(clinic.id)}
          onEdit={actions.edit}
          onDelete={actions.remove}
        />
      )}
      editing={editingClinic}
      renderForm={() =>
        editingClinic && (
          <EntityForm
            entity="clinic"
            data={editingClinic}
            saving={savingId === String(editingClinic.id)}
            onClose={actions.closeEdit}
            onSave={actions.saveEdit}
          />
        )
      }
    />
  );
}
