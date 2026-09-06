"use client";

import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import type { AdminDoctor } from "@/Types/types";

import { parseFields } from "@/components/admin/DoctorsTable/utils/doctors.utils";

import DoctorHeader from "@/components/admin/DoctorsTable/DoctorCard/DoctorHeader/DoctorHeader";
import DoctorActions from "@/components/admin/DoctorsTable/DoctorCard/DoctorActions/DoctorActions";
import DoctorStats from "@/components/admin/DoctorsTable/DoctorCard/DoctorStats/DoctorStats";
import DoctorFields from "@/components/admin/DoctorsTable/DoctorCard/DoctorFields/DoctorFields";
import SavingIndicator from "@/components/admin/DoctorsTable/DoctorCard/SavingIndicator/SavingIndicator";
import DeleteDoctorModal from "@/components/admin/DoctorsTable/DoctorCard/DeleteDoctorModal/DeleteDoctorModal";

interface Props {
  doctor: AdminDoctor;
  saving: boolean;
  onEdit: (doctor: AdminDoctor) => void;
  onDelete: (id: string) => void | Promise<void>;
}

export default function DoctorCard({
  doctor,
  saving,
  onEdit,
  onDelete,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const doctorId = String(doctor.id);

  const fields = parseFields(doctor.fields);

  const handleConfirmDelete = async () => {
    try {
      await onDelete(doctorId);

      setShowConfirm(false);

      toast.success("پزشک با موفقیت حذف شد.");
    } catch {
      toast.error("حذف پزشک با خطا مواجه شد. دوباره تلاش کنید.");
    }
  };

  return (
    <>
      <article
        dir="rtl"
        className="
          group
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200
          bg-white
          shadow-[0_8px_30px_rgba(15,23,42,0.05)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-slate-300
          hover:shadow-[0_22px_60px_rgba(15,23,42,0.10)]
        "
      >
        {/* Top Accent */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-0.75
            bg-linear-to-l
            from-teal-500
            via-cyan-500
            to-blue-500
          "
        />

        <div className="p-5 sm:p-6 lg:p-7">
          {/* Header */}
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <DoctorHeader doctor={doctor} />

            <DoctorActions
              doctor={doctor}
              saving={saving}
              onEdit={onEdit}
              onDelete={() => setShowConfirm(true)}
            />
          </div>

          {/* Stats */}
          <DoctorStats doctor={doctor} />

          {/* Fields */}
          <DoctorFields fields={fields} doctorId={doctorId} />

          {/* Saving */}
          <SavingIndicator saving={saving} />
        </div>
      </article>

      {/* Delete Modal */}
      <DeleteDoctorModal
        open={showConfirm}
        doctor={doctor}
        saving={saving}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

      <ToastContainer position="top-center" rtl autoClose={3000} newestOnTop />
    </>
  );
}
