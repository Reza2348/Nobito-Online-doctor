"use client";

import { MdPsychology } from "react-icons/md";

import type { AdminConsultant } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import ConsultantCard from "@/components/admin/ConsultantsTable/ConsultantCard/ConsultantCard";
import EntityTableHeader from "@/components/shared/EntityTableHeader/EntityTableHeader";
import EntityTableState from "@/components/shared/EntityTableState/EntityTableState";

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

  const headerProps = {
    icon: <MdPsychology size={28} />,
    title: "لیست مشاوران",
    subtitle: "مشاوران ثبت‌شده در سامانه",
    accent: "purple" as const,
  };

  const stateProps = {
    icon: <MdPsychology size={28} />,
    title: "لیست مشاوران",
    subtitle: "مشاوران ثبت‌شده در سامانه",
    accent: "purple" as const,
    loadingText: "در حال دریافت مشاوران...",
    emptyTitle: "هنوز مشاوری ثبت نشده است.",
    emptyDescription: "مشاوران ثبت‌شده در سامانه",
    errorTitle: "خطا در دریافت مشاوران",
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return <EntityTableState {...stateProps} type="loading" />;
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

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

  // -----------------------------------------
  // Main
  // -----------------------------------------

  return (
    <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
      <EntityTableHeader
        {...headerProps}
        onRefresh={actions.load}
        refreshing={Boolean(savingId)}
      />

      {consultantList.length === 0 ? (
        <EntityTableState {...stateProps} type="empty" />
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

      {/* Shared Entity Form */}
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
