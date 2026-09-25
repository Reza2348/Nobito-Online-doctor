"use client";

import { MdMedicalServices } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import DoctorCard from "@/components/admin/DoctorsTable/DoctorCard/DoctorCard";
import EntityTableHeader from "@/components/shared/EntityTableHeader/EntityTableHeader";
import EntityTableState from "@/components/shared/EntityTableState/EntityTableState";

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

  const headerProps = {
    icon: <MdMedicalServices size={28} />,
    title: "لیست پزشکان",
    subtitle: "پزشکان ثبت‌شده در سامانه",
    accent: "teal" as const,
  };

  const stateProps = {
    icon: <MdMedicalServices size={28} />,
    title: "لیست پزشکان",
    subtitle: "پزشکان ثبت‌شده در سامانه",
    accent: "teal" as const,
    loadingText: "در حال دریافت پزشکان...",
    emptyTitle: "هنوز پزشکی ثبت نشده است.",
    emptyDescription:
      "پزشکان ثبت‌شده در جدول doctors اینجا نمایش داده می‌شوند.",
    errorTitle: "خطا در دریافت پزشکان",
  };

  if (loading) {
    return <EntityTableState {...stateProps} type="loading" />;
  }

  if (errorMessage) {
    return (
      <EntityTableState
        {...stateProps}
        type="error"
        message={errorMessage}
        onRetry={actions.load}
      />
    );
  }

  return (
    <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
      <EntityTableHeader
        {...headerProps}
        onRefresh={actions.load}
        refreshing={Boolean(savingId)}
      />

      {doctorList.length === 0 ? (
        <EntityTableState {...stateProps} type="empty" />
      ) : (
        <div className="space-y-4">
          {doctorList.map((doctor) => {
            const doctorId = String(doctor.id);

            return (
              <DoctorCard
                key={doctorId}
                doctor={doctor}
                saving={savingId === doctorId}
                onEdit={actions.edit}
                onDelete={actions.remove}
              />
            );
          })}
        </div>
      )}

      {editingDoctor && (
        <EntityForm
          entity="doctor"
          data={editingDoctor}
          saving={savingId === String(editingDoctor.id)}
          onClose={actions.closeEdit}
          onSave={actions.saveEdit}
        />
      )}
    </div>
  );
}
