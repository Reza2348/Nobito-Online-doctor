"use client";

import type { AdminConsultant } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import ConsultantCard from "@/components/admin/ConsultantsTable/ConsultantCard/ConsultantCard";
import ConsultantsTableHeader from "@/components/admin/ConsultantsTable/ConsultantsTableHeader/ConsultantsTableHeader";
import ConsultantsTableState from "@/components/admin/ConsultantsTable/ConsultantsTableState/ConsultantsTableState";

import { useConsultants } from "@/hooks/useConsultant";

interface Props {
  consultants?: AdminConsultant[];
  onDelete?: (id: string) => void;
}

export default function ConsultantsTable({
  consultants = [],
  onDelete,
}: Props) {
  const {
    consultantList,
    loading,
    errorMessage,
    editingConsultant,
    savingId,
    actions,
  } = useConsultants({
    initialConsultants: consultants,
    onDelete,
  });

  if (loading) {
    return <ConsultantsTableState type="loading" />;
  }

  if (errorMessage) {
    return (
      <ConsultantsTableState
        type="error"
        message={errorMessage}
        onRetry={actions.load}
      />
    );
  }

  return (
    <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
      <ConsultantsTableHeader />

      {consultantList.length === 0 ? (
        <ConsultantsTableState type="empty" />
      ) : (
        <div className="space-y-4">
          {consultantList.map((consultant) => {
            const consultantId = String(consultant.id);

            return (
              <ConsultantCard
                key={consultantId}
                consultant={consultant}
                saving={savingId === consultantId}
                onEdit={actions.edit}
                onDelete={actions.remove}
              />
            );
          })}
        </div>
      )}

      {editingConsultant && (
        <EntityForm
          entity="consultant"
          data={editingConsultant}
          saving={savingId === String(editingConsultant.id)}
          onClose={actions.closeEdit}
          onSave={actions.saveEdit}
        />
      )}
    </div>
  );
}
