"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

import type { AdminClinic } from "@/Types/types";

import { getFields } from "@/components/admin/ClinicsTable/utils/clinics.utils";

import ClinicAvatar from "@/components/ClinicCard/ClinicAvatar/ClinicAvatar";
import ClinicInfo from "@/components/ClinicCard/ClinicInfo/ClinicInfo";
import ClinicStats from "@/components/ClinicCard/ClinicStats/ClinicStats";
import ClinicActions from "@/components/ClinicCard/ClinicActions/ClinicActions";
import DeleteClinicModal from "@/components/ClinicCard/DeleteClinicModal/DeleteClinicModal";

import { formatNumber } from "@/components/ClinicCard/utils/clinic-card.utils";

interface Props {
  clinic: AdminClinic;
  deleting: boolean;
  saving: boolean;
  onEdit: (clinic: AdminClinic) => void;
  onDelete: (id: string) => void | Promise<void>;
}

export default function ClinicCard({
  clinic,
  deleting,
  saving,
  onEdit,
  onDelete,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const clinicId = String(clinic.id);

  const fields = getFields(clinic.fields);

  const disabled = deleting || saving;

  const handleDelete = async () => {
    try {
      await onDelete(clinicId);

      setShowConfirm(false);

      toast.success("کلینیک با موفقیت حذف شد.", {
        position: "top-right",
        autoClose: 2500,
        rtl: true,
      });
    } catch (error) {
      console.error("DELETE CLINIC ERROR:", error);

      toast.error(
        error instanceof Error ? error.message : "حذف کلینیک با خطا مواجه شد.",
        {
          position: "top-right",
          autoClose: 3500,
          rtl: true,
        },
      );
    }
  };

  return (
    <>
      {/* Card */}
      <div
        dir="rtl"
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-100
          bg-white
          shadow-[0_2px_10px_rgba(15,23,42,0.05)]
          transition-all
          duration-300
          hover:shadow-[0_10px_30px_rgba(15,23,42,0.10)]
        "
      >
        {/* Top gradient */}
        <div
          className="
            h-1.5
            w-full
            bg-linear-to-l
            from-purple-600
            via-fuchsia-500
            to-pink-500
          "
        />

        <div className="p-5">
          <div
            className="
              flex
              flex-wrap
              items-start
              justify-between
              gap-5
            "
          >
            {/* Clinic Info */}
            <div
              className="
                flex
                min-w-0
                flex-1
                items-start
                gap-4
              "
            >
              <ClinicAvatar photoUrl={clinic.photo_url} name={clinic.name} />

              <ClinicInfo
                clinicId={clinicId}
                name={clinic.name}
                specialty={clinic.specialty}
                address={clinic.address}
                fields={fields}
                formatNumber={formatNumber}
              />
            </div>

            {/* Stats + Actions */}
            <div
              className="
                flex
                shrink-0
                flex-wrap
                items-center
                gap-3
              "
            >
              <ClinicStats
                rating={clinic.rating}
                satisfiedPercent={clinic.satisfied_percent}
                patientsSatisfied={clinic.patients_satisfied}
              />

              <ClinicActions
                clinic={clinic}
                disabled={disabled}
                saving={saving}
                deleting={deleting}
                onEdit={onEdit}
                onDeleteClick={() => setShowConfirm(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showConfirm &&
        typeof document !== "undefined" &&
        createPortal(
          <DeleteClinicModal
            open={showConfirm}
            deleting={deleting}
            name={clinic.name}
            specialty={clinic.specialty}
            photoUrl={clinic.photo_url}
            onClose={() => setShowConfirm(false)}
            onConfirm={handleDelete}
          />,
          document.body,
        )}
    </>
  );
}
