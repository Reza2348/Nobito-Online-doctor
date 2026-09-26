"use client";

import { MdMedicalServices } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import DoctorCard from "@/components/admin/DoctorsTable/DoctorCard/DoctorCard";
import EntityTable from "@/components/shared/EntityTable/EntityTable";

import { useDoctors } from "@/hooks/useDoctors";

interface Props {
  doctors?: AdminDoctor[];
  onDelete?: (id: string) => void;
}

export default function DoctorsTable({ doctors = [], onDelete }: Props) {
  const {
    doctorList,
    loading,
    errorMessage,
    editingDoctor,
    savingId,
    actions,
  } = useDoctors({
    initialDoctors: doctors,
    onDelete,
  });

  return (
    <EntityTable
      icon={<MdMedicalServices size={28} />}
      title="لیست پزشکان"
      subtitle="پزشکان ثبت‌شده در سامانه"
      accent="teal"
      loadingText="در حال دریافت پزشکان..."
      emptyTitle="هنوز پزشکی ثبت نشده است."
      emptyDescription="پزشکان ثبت‌شده در جدول doctors اینجا نمایش داده می‌شوند."
      errorTitle="خطا در دریافت پزشکان"
      items={doctorList}
      loading={loading}
      errorMessage={errorMessage}
      savingId={savingId}
      onRefresh={actions.load}
      onRetry={actions.load}
      getItemId={(doctor) => String(doctor.id)}
      renderItem={(doctor) => (
        <DoctorCard
          doctor={doctor}
          saving={savingId === String(doctor.id)}
          onEdit={actions.edit}
          onDelete={actions.remove}
        />
      )}
      editing={editingDoctor}
      renderForm={() =>
        editingDoctor && (
          <EntityForm
            entity="doctor"
            data={editingDoctor}
            saving={savingId === String(editingDoctor.id)}
            onClose={actions.closeEdit}
            onSave={actions.saveEdit}
          />
        )
      }
    />
  );
}
