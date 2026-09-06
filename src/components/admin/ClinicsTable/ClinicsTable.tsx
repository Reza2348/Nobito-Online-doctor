"use client";

import type { AdminClinic } from "@/Types/types";

import EntityForm from "@/components/admin/AdminDashboard/shared/EntityForm/EntityForm";
import ClinicCard from "@/components/admin/ClinicsTable/ClinicCard/ClinicCard";
import ClinicsTableHeader from "@/components/admin/ClinicsTable/ClinicsTableHeader/ClinicsTableHeader";
import ClinicsTableState from "@/components/admin/ClinicsTable/ClinicsTableState/ClinicsTableState";

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
    deletingId,
    editingClinic,
    savingId,
    actions,
  } = useClinics({
    initialClinics: clinics,
    onDelete,
  });

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return (
      <div dir="rtl" className="p-4">
        <ClinicsTableHeader onRefresh={actions.load} refreshing />

        <ClinicsTableState type="loading" />
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (errorMessage) {
    return (
      <div dir="rtl" className="p-4">
        <ClinicsTableHeader onRefresh={actions.load} />

        <ClinicsTableState
          type="error"
          message={errorMessage}
          onRetry={actions.load}
        />
      </div>
    );
  }

  // -----------------------------------------
  // Main
  // -----------------------------------------

  return (
    <div dir="rtl" className="p-4">
      <ClinicsTableHeader onRefresh={actions.load} refreshing={loading} />

      <div className="rounded-3xl border bg-white p-6 shadow-lg">
        {clinicList.length === 0 ? (
          <ClinicsTableState type="empty" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <tbody>
                {clinicList.map((clinic) => {
                  const clinicId = String(clinic.id);

                  return (
                    <ClinicCard
                      key={clinicId}
                      clinic={clinic}
                      deleting={deletingId === clinicId}
                      saving={savingId === clinicId}
                      onEdit={actions.edit}
                      onDelete={actions.remove}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shared Entity Form */}
      {editingClinic && (
        <EntityForm
          entity="clinic"
          data={editingClinic}
          saving={savingId === String(editingClinic.id)}
          onClose={actions.closeEdit}
          onSave={actions.saveEdit}
        />
      )}
    </div>
  );
}
