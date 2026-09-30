import { FaStethoscope } from "react-icons/fa";

import { Prescription } from "@/Types/types";
import SectionHeader from "@/components/prescription/PrescriptionPDF/SectionHeader/SectionHeader";

interface DiagnosisSectionProps {
  diagnosis: Prescription["diagnosis"];
}

export default function DiagnosisSection({ diagnosis }: DiagnosisSectionProps) {
  return (
    <section
      className="
        mb-3 box-border break-inside-avoid
        rounded-xl border border-gray-200 p-3
      "
    >
      <SectionHeader
        icon={FaStethoscope}
        title="تشخیص"
        gradient="from-cyan-500 to-cyan-600"
      />

      <div
        className="
          flex items-start gap-2 rounded-lg border
          border-cyan-100 bg-linear-to-r from-blue-50 to-cyan-50
          px-3 py-2 text-sm text-gray-700
        "
      >
        <span
          className="
            mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500
          "
        />

        <span>{diagnosis}</span>
      </div>
    </section>
  );
}
