"use client";

import React from "react";

import { Prescription } from "@/Types/types";

import PrescriptionPrintHeader from "@/components/prescription/print/PrescriptionPrintHeader/PrescriptionPrintHeader";
import PrescriptionPatientInfo from "@/components/prescription/print/PrescriptionPatientInfo/PrescriptionPatientInfo";
import PrescriptionDiagnosis from "@/components/prescription/print/PrescriptionDiagnosis/PrescriptionDiagnosis";
import PrescriptionMedications from "@/components/prescription/print/PrescriptionMedications/PrescriptionMedications";
import PrescriptionInstructions from "@/components/prescription/print/PrescriptionInstructions/PrescriptionInstructions";
import PrescriptionNextVisit from "@/components/prescription/print/PrescriptionNextVisit/PrescriptionNextVisit";
import PrescriptionPrintFooter from "@/components/prescription/print/PrescriptionPrintFooter/PrescriptionPrintFooter";

interface PrescriptionPrintProps {
  prescription: Prescription;
}

export default function PrescriptionPrint({
  prescription,
}: PrescriptionPrintProps) {
  const createdDate = new Date(prescription.createdAt).toLocaleDateString(
    "fa-IR",
  );

  return (
    <main dir="rtl" className="w-full bg-white text-right text-gray-900">
      <div
        className="
          mx-auto
          box-border
          w-[210mm]
          min-h-[297mm]
          bg-white
          px-[12mm]
          py-[10mm]
          font-sans
          text-[13px]
          leading-relaxed
          text-gray-900
        "
      >
        <PrescriptionPrintHeader prescription={prescription} />

        <PrescriptionPatientInfo
          prescription={prescription}
          createdDate={createdDate}
        />

        <PrescriptionDiagnosis prescription={prescription} />

        <PrescriptionMedications prescription={prescription} />

        <PrescriptionInstructions prescription={prescription} />

        <PrescriptionNextVisit prescription={prescription} />

        <PrescriptionPrintFooter
          prescription={prescription}
          createdDate={createdDate}
        />
      </div>
    </main>
  );
}
