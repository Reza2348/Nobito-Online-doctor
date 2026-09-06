"use client";

import type { AdminDoctor } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import DoctorCard from "@/components/admin/DoctorsTable/DoctorCard/DoctorCard";
import DoctorsTableHeader from "@/components/admin/DoctorsTable/DoctorsTableHeader/DoctorsTableHeader";
import DoctorsTableState from "@/components/admin/DoctorsTable/DoctorsTableState/DoctorsTableState";

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

  if (loading) {
    return <DoctorsTableState type="loading" />;
  }

  if (errorMessage) {
    return (
      <DoctorsTableState
        type="error"
        message={errorMessage}
        onRetry={actions.load}
      />
    );
  }

  return (
    <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
      <DoctorsTableHeader
        onRefresh={actions.load}
        disabled={Boolean(savingId)}
      />

      {doctorList.length === 0 ? (
        <DoctorsTableState type="empty" />
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
