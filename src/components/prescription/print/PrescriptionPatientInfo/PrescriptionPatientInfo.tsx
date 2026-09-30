import React from "react";

import { FaCalendarAlt, FaStethoscope, FaUserMd, FaUser } from "react-icons/fa";

import { Prescription } from "@/Types/types";

interface PrescriptionPatientInfoProps {
  prescription: Prescription;
  createdDate: string;
}

export default function PrescriptionPatientInfo({
  prescription,
  createdDate,
}: PrescriptionPatientInfoProps) {
  return (
    <section className="mb-5 w-full">
      {/* Section Title */}
      <div className="mb-2.5 flex h-9 items-center gap-2 border-r-4 border-blue-600 pr-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <FaUser className="text-xs" />
        </div>

        <h2 className="text-[13px] font-bold text-gray-800">اطلاعات نسخه</h2>
      </div>

      {/* Information Grid */}
      <div className="grid w-full grid-cols-2 gap-2.5">
        {/* Patient */}
        <div className="flex `min-h-13] items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm">
            <FaUser className="text-[10px]" />
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] text-gray-500">بیمار</span>

            <span className="block truncate text-[11px] font-bold text-gray-800">
              {prescription.patientName}
            </span>
          </div>
        </div>

        {/* Doctor */}
        <div className="flex min-h-13 items-center gap-2 rounded-lg border border-cyan-100 bg-cyan-50/50 px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-cyan-600 shadow-sm">
            <FaUserMd className="text-[10px]" />
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] text-gray-500">پزشک</span>

            <span className="block truncate text-[11px] font-bold text-gray-800">
              {prescription.doctorName}
            </span>
          </div>
        </div>

        {/* Specialty */}
        <div className="flex min-h-13items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm">
            <FaStethoscope className="text-[10px]" />
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] text-gray-500">تخصص</span>

            <span className="block truncate text-[11px] font-bold text-gray-800">
              {prescription.doctorSpecialty}
            </span>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex min-h-13 items-center gap-2 rounded-lg border border-cyan-100 bg-cyan-50/50 px-3 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-cyan-600 shadow-sm">
            <FaCalendarAlt className="text-[10px]" />
          </div>

          <div className="min-w-0">
            <span className="block text-[10px] text-gray-500">تاریخ صدور</span>

            <span className="block truncate text-[11px] font-bold text-gray-800">
              {createdDate}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
