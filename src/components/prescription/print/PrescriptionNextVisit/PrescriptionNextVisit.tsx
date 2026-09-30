import React from "react";

import { FaCalendarAlt, FaClock } from "react-icons/fa";

import { Prescription } from "@/Types/types";

interface PrescriptionNextVisitProps {
  prescription: Prescription;
}

export default function PrescriptionNextVisit({
  prescription,
}: PrescriptionNextVisitProps) {
  if (!prescription.nextVisit) {
    return null;
  }

  const nextVisitDate = new Date(prescription.nextVisit).toLocaleDateString(
    "fa-IR",
  );

  return (
    <section className="mb-5 w-full">
      {/* Section Title */}
      <div className="mb-2.5 flex h-9 items-center gap-2 border-r-4 border-blue-600 pr-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <FaCalendarAlt className="text-xs" />
        </div>

        <h2 className="text-[13px] font-bold text-gray-800">
          زمان مراجعه بعدی
        </h2>
      </div>

      {/* Next Visit */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-cyan-100
          bg-linear-to-l
          from-blue-50
          to-cyan-50
          px-3
          py-2
          text-[11px]
          font-semibold
          text-gray-700
        "
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm">
          <FaClock className="text-[10px]" />
        </span>

        <span>{nextVisitDate}</span>
      </div>
    </section>
  );
}
