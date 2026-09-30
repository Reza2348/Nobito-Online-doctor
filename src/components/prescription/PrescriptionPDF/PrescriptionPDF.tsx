"use client";

import { Prescription } from "@/Types/types";

import PrescriptionHeader from "@/components/prescription/PrescriptionPDF/PrescriptionHeader/PrescriptionHeader";
import PrescriptionInfo from "@/components/prescription/PrescriptionPDF/PrescriptionInfo/PrescriptionInfo";
import DiagnosisSection from "@/components/prescription/PrescriptionPDF/DiagnosisSection/DiagnosisSection";
import MedicationsSection from "@/components/prescription/PrescriptionPDF/MedicationsSection/MedicationsSection";
import InstructionsSection from "@/components/prescription/PrescriptionPDF/InstructionsSection/InstructionsSection";
import NextVisitSection from "@/components/prescription/PrescriptionPDF/NextVisitSection/NextVisitSection";
import PrescriptionFooter from "@/components/prescription/PrescriptionPDF/PrescriptionFooter/PrescriptionFooter";

interface PrescriptionPrintProps {
  prescription: Prescription;
}

export default function PrescriptionPrint({
  prescription,
}: PrescriptionPrintProps) {
  const createdDate = new Date(prescription.createdAt).toLocaleDateString(
    "fa-IR",
  );

  const nextVisitDate = prescription.nextVisit
    ? new Date(prescription.nextVisit).toLocaleDateString("fa-IR")
    : null;

  return (
    <div
      dir="rtl"
      className="
        min-h-screen bg-gray-100 p-6
        text-gray-800 box-border
        print:min-h-0 print:bg-white print:p-0
      "
      style={{
        fontFamily: "IRANSansWeb, Arial, sans-serif",
      }}
    >
      <div
        className="
          mx-auto box-border min-h-[297mm] w-[210mm]
          bg-white px-[16mm] py-[18mm]
          text-[13px] leading-7
          print:m-0 print:min-h-[297mm]
          print:w-[210mm]
          print:px-[16mm]
          print:py-[18mm]
          print:shadow-none
        "
      >
        <PrescriptionHeader
          prescriptionNumber={prescription.prescriptionNumber}
        />

        <PrescriptionInfo
          prescription={prescription}
          createdDate={createdDate}
        />

        <DiagnosisSection diagnosis={prescription.diagnosis} />

        <MedicationsSection medications={prescription.medications} />

        <InstructionsSection instructions={prescription.instructions} />

        <NextVisitSection date={nextVisitDate} />

        <PrescriptionFooter
          doctorName={prescription.doctorName}
          createdDate={createdDate}
        />
      </div>
    </div>
  );
}
