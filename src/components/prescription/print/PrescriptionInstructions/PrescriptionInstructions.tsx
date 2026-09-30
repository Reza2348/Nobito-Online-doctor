import React from "react";

import { FaClipboardList, FaInfoCircle } from "react-icons/fa";

import { Prescription } from "@/Types/types";

interface PrescriptionInstructionsProps {
  prescription: Prescription;
}

export default function PrescriptionInstructions({
  prescription,
}: PrescriptionInstructionsProps) {
  if (!prescription.instructions) {
    return null;
  }

  return (
    <section className="mb-5 w-full">
      {/* Section Title */}
      <div className="mb-2.5 flex h-9 items-center gap-2 border-r-4 border-blue-600 pr-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <FaClipboardList className="text-xs" />
        </div>

        <h2 className="text-[13px] font-bold text-gray-800">دستور پزشک</h2>
      </div>

      {/* Instructions */}
      <div
        className="
          flex
          items-start
          gap-2.5
          rounded-lg
          border
          border-blue-100
          bg-linear-to-l
          from-blue-50
          to-cyan-50
          px-3
          py-2.5
          text-[11px]
          leading-6
          text-gray-700
        "
      >
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm">
          <FaInfoCircle className="text-[10px]" />
        </div>

        <p className="min-w-0 flex-1 whitespace-pre-line wrap-break-word">
          {prescription.instructions}
        </p>
      </div>
    </section>
  );
}
