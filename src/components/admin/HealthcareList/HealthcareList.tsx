"use client";

import DoctorsTable from "@/components/admin/DoctorsTable/DoctorsTable";
import ConsultantsTable from "@/components/admin/ConsultantsTable/ConsultantsTable";
import ClinicsTable from "@/components/admin/ClinicsTable/ClinicsTable";

import { AdminDoctor, AdminConsultant, AdminClinic } from "@/Types/types";

interface Props {
  doctors: AdminDoctor[];

  consultants: AdminConsultant[];

  clinics: AdminClinic[];

  onDeleteDoctor: (id: string) => void;

  onDeleteConsultant: (id: string) => void;

  onDeleteClinic: (id: string) => void;
}

export default function HealthcareList({
  doctors,

  consultants,

  clinics,

  onDeleteDoctor,

  onDeleteConsultant,

  onDeleteClinic,
}: Props) {
  return (
    <div
      dir="rtl"
      className="
space-y-10
text-black
"
    >
      <DoctorsTable doctors={doctors} onDelete={onDeleteDoctor} />

      <ConsultantsTable
        consultants={consultants}
        onDelete={onDeleteConsultant}
      />

      <ClinicsTable clinics={clinics} onDelete={onDeleteClinic} />
    </div>
  );
}
