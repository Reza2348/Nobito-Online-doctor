import React from "react";

import { Prescription } from "@/Types/types";

interface PrescriptionPrintHeaderProps {
  prescription: Prescription;
}

export default function PrescriptionPrintHeader({
  prescription,
}: PrescriptionPrintHeaderProps) {
  return (
    <header
      className="
        mb-6
        w-full
        border-b-2
        border-gray-800
        pb-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* برند و شماره نسخه */}
        <div className="flex flex-col items-start gap-1">
          <div
            className="
              text-2xl
              font-extrabold
              tracking-wide
              text-blue-600
            "
          >
            Nobito
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
            <span>شماره نسخه:</span>

            <span
              className="
      rounded-lg
      bg-blue-50
      px-3
      py-1
      font-bold
      text-blue-700
      ring-1
      ring-blue-100
    "
            >
              {prescription.prescriptionNumber}
            </span>
          </div>
        </div>

        {/* عنوان نسخه */}
        <div
          className="
    rounded-xl
   bg-linear-to-r
    from-blue-500
    to-cyan-400
    px-6
    py-3
    text-lg
    font-bold
    text-white
    shadow-md
  "
        >
          نسخه پزشکی
        </div>
      </div>
    </header>
  );
}
