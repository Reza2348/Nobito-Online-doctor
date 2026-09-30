import React from "react";

import { Prescription } from "@/Types/types";

import { FaStethoscope } from "react-icons/fa";

interface PrescriptionDiagnosisProps {
  prescription: Prescription;
}

export default function PrescriptionDiagnosis({
  prescription,
}: PrescriptionDiagnosisProps) {
  return (
    <section className="mb-6 w-full">
      {/* عنوان */}
      <div
        className="
          mb-3
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
           bg-linear-to-br
            from-blue-500
            to-cyan-400
            text-white
            shadow-sm
          "
        >
          <FaStethoscope className="text-base" />
        </div>

        <h2 className="text-base font-extrabold text-blue-700">تشخیص</h2>

        <div className="h-px flex-1 bg-linear-to-l from-blue-100 to-transparent" />
      </div>

      {/* متن تشخیص */}
      <div
        className="
          rounded-xl
          border
          border-blue-100
          bg-linear-to-r
          from-blue-50
          via-cyan-50
          to-white
          px-4
          py-3
          text-sm
          leading-7
          text-gray-700
          shadow-sm
        "
      >
        <div className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />

          <span className="font-medium">{prescription.diagnosis}</span>
        </div>
      </div>
    </section>
  );
}
