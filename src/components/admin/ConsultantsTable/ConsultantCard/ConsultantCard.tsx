"use client";

import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { AdminConsultant } from "@/Types/types";

import { parseFields } from "@/components/admin/ConsultantsTable/utils/consultants.utils";

import ConsultantAvatar from "@/components/ConsultantCard/ConsultantAvatar/ConsultantAvatar";
import ConsultantInfo from "@/components/ConsultantCard/ConsultantInfo/ConsultantInfo";
import ConsultantStats from "@/components/ConsultantCard/ConsultantStats/ConsultantStats";
import ConsultantActions from "@/components/ConsultantCard/ConsultantActions/ConsultantActions";
import DeleteConsultantModal from "@/components/ConsultantCard/DeleteConsultantModal/DeleteConsultantModal";

interface Props {
  consultant: AdminConsultant;
  saving: boolean;
  onEdit: (consultant: AdminConsultant) => void;
  onDelete: (id: string) => void | Promise<void>;
}

export default function ConsultantCard({
  consultant,
  saving,
  onEdit,
  onDelete,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const consultantId = String(consultant.id);

  const fields = parseFields(consultant.fields);

  async function handleDelete() {
    try {
      await onDelete(consultantId);

      setShowConfirm(false);

      toast.success("مشاور با موفقیت حذف شد.");
    } catch (error) {
      console.error("DELETE CONSULTANT ERROR:", error);

      toast.error(error instanceof Error ? error.message : "خطا در حذف مشاور.");
    }
  }

  return (
    <>
      {/* Consultant Card */}
      <div
        dir="rtl"
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-purple-200
          hover:shadow-xl
        "
      >
        {/* نوار بالای کارت */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-1
            bg-linear-to-l
            from-purple-600
            via-fuchsia-500
            to-violet-400
          "
        />

        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-start
            xl:justify-between
          "
        >
          {/* Main Information */}
          <div
            className="
              flex
              min-w-0
              flex-1
              gap-5
            "
          >
            <ConsultantAvatar
              photoUrl={consultant.photo_url}
              name={consultant.name}
            />

            <ConsultantInfo
              name={consultant.name}
              specialty={consultant.specialty}
              address={consultant.address}
              fields={fields}
            />
          </div>

          {/* Stats */}
          <ConsultantStats ratingValue={consultant.rating} />

          {/* Actions */}
          <ConsultantActions
            consultant={consultant}
            saving={saving}
            onEdit={onEdit}
            onDeleteClick={() => setShowConfirm(true)}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConsultantModal
        open={showConfirm}
        consultantName={consultant.name}
        saving={saving}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />

      <ToastContainer position="top-left" autoClose={3000} rtl newestOnTop />
    </>
  );
}
