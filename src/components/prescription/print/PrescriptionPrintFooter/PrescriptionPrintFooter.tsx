import React from "react";

import { FaCalendarAlt, FaFileMedical, FaUserMd } from "react-icons/fa";

import { Prescription } from "@/Types/types";

interface PrescriptionPrintFooterProps {
  prescription: Prescription;
  createdDate: string;
}

export default function PrescriptionPrintFooter({
  prescription,
  createdDate,
}: PrescriptionPrintFooterProps) {
  return (
    <footer
      className="
        mt-6
        flex
        items-end
        justify-between
        gap-6
        border-t
        border-blue-100
        pt-4
        text-[10px]
        text-gray-600
      "
    >
      {/* Prescription Info */}
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <FaFileMedical className="text-xs" />
        </div>

        <div className="space-y-1.5 leading-5">
          <div className="font-semibold text-gray-700">
            این نسخه به صورت الکترونیکی صادر شده است.
          </div>

          <div className="flex items-center gap-1.5 text-gray-500">
            <FaCalendarAlt className="text-[9px] text-cyan-600" />

            <span>تاریخ صدور:</span>

            <span className="font-bold text-gray-800">{createdDate}</span>
          </div>
        </div>
      </div>

      {/* Doctor */}
      <div className="min-w-37.5 text-center">
        <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-gray-600">
          <FaUserMd className="text-blue-600" />
          <span>پزشک معالج</span>
        </div>

        <div className="border-b border-blue-300 pb-1.5 text-[11px] font-bold text-gray-900">
          {prescription.doctorName}
        </div>
      </div>
    </footer>
  );
}
