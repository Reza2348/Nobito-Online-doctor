"use client";

import { MdPsychology } from "react-icons/md";

import type { AdminConsultant } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import ConsultantCard from "@/components/admin/ConsultantsTable/ConsultantCard/ConsultantCard";
import EntityTable from "@/components/shared/EntityTable/EntityTable";

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

  return (
    <EntityTable
      icon={<MdPsychology size={28} />}
      title="لیست مشاوران"
      subtitle="مشاوران ثبت‌شده در سامانه"
      accent="purple"
      loadingText="در حال دریافت مشاوران..."
      emptyTitle="هنوز مشاوری ثبت نشده است."
      emptyDescription="مشاوران ثبت‌شده در سامانه"
      errorTitle="خطا در دریافت مشاوران"
      items={consultantList}
      loading={loading}
      errorMessage={errorMessage}
      savingId={savingId}
      onRefresh={actions.load}
      onRetry={actions.load}
      getItemId={(consultant) => String(consultant.id)}
      renderItem={(consultant) => (
        <ConsultantCard
          consultant={consultant}
          saving={savingId === String(consultant.id)}
          onEdit={actions.edit}
          onDelete={actions.remove}
        />
      )}
      editing={editingConsultant}
      renderForm={() =>
        editingConsultant && (
          <EntityForm
            entity="consultant"
            data={editingConsultant}
            saving={savingId === String(editingConsultant.id)}
            onClose={actions.closeEdit}
            onSave={actions.saveEdit}
          />
        )
      }
    />
  );
}
