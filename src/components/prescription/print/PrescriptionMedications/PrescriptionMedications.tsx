import React from "react";

import { FaCapsules, FaClock, FaInfoCircle, FaListOl } from "react-icons/fa";

import { Prescription } from "@/Types/types";

interface PrescriptionMedicationsProps {
  prescription: Prescription;
}

export default function PrescriptionMedications({
  prescription,
}: PrescriptionMedicationsProps) {
  return (
    <section className="mb-5 w-full">
      {/* Section Title */}
      <div className="mb-2.5 flex h-9 items-center gap-2 border-r-4 border-blue-600 pr-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          <FaCapsules className="text-xs" />
        </div>

        <h2 className="text-[13px] font-bold text-gray-800">
          داروهای تجویز شده
        </h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg border border-blue-100">
        <table className="w-full table-fixed border-collapse text-right text-[11px] leading-5">
          <thead>
            <tr className="bg-linear-to-l from-blue-600 to-cyan-500 text-white">
              <th className="w-[7%] border border-blue-500 px-1.5 py-2 font-bold">
                <div className="flex items-center justify-center gap-1">
                  <FaListOl className="shrink-0 text-[10px]" />
                  <span>ردیف</span>
                </div>
              </th>

              <th className="w-[20%] border border-blue-500 px-2 py-2 font-bold">
                <div className="flex items-center justify-center gap-1">
                  <FaCapsules className="shrink-0 text-[10px]" />
                  <span>دارو</span>
                </div>
              </th>

              <th className="w-[13%] border border-blue-500 px-2 py-2 font-bold">
                مقدار
              </th>

              <th className="w-[25%] border border-blue-500 px-2 py-2 font-bold">
                نحوه مصرف
              </th>

              <th className="w-[12%] border border-blue-500 px-2 py-2 font-bold">
                <div className="flex items-center justify-center gap-1">
                  <FaClock className="shrink-0 text-[10px]" />
                  <span>مدت</span>
                </div>
              </th>

              <th className="w-[23%] border border-blue-500 px-2 py-2 font-bold">
                <div className="flex items-center justify-center gap-1">
                  <FaInfoCircle className="shrink-0 text-[10px]" />
                  <span>توضیحات</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {prescription.medications.map((medication, index) => (
              <tr
                key={medication.id}
                className="
                  break-inside-avoid
                  align-middle
                  odd:bg-white
                  even:bg-blue-50/50
                "
              >
                {/* Row */}
                <td className="border border-blue-100 px-1.5 py-2 text-center">
                  <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                    {index + 1}
                  </span>
                </td>

                {/* Medicine */}
                <td className="border border-blue-100 px-2 py-2 font-semibold text-gray-900">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-100 text-cyan-700">
                      <FaCapsules className="text-[10px]" />
                    </span>

                    <span className="wrap-break-word">{medication.name}</span>
                  </div>
                </td>

                {/* Dosage */}
                <td className="border border-blue-100 px-2 py-2 text-center font-medium text-gray-700">
                  <span className="inline-flex max-w-full rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-700">
                    {medication.dosage}
                  </span>
                </td>

                {/* Frequency */}
                <td className="wrap-break-word border border-blue-100 px-2 py-2 text-gray-700">
                  {medication.frequency}
                </td>

                {/* Duration */}
                <td className="border border-blue-100 px-2 py-2 text-center">
                  <span className="inline-flex max-w-full items-center justify-center gap-1 rounded-md bg-cyan-50 px-1.5 py-0.5 text-[10px] text-cyan-700">
                    <FaClock className="shrink-0 text-[9px]" />
                    <span className="wrap-break-word">
                      {medication.duration}
                    </span>
                  </span>
                </td>

                {/* Instructions */}
                <td className="wrap-break-word border border-blue-100 px-2 py-2 text-gray-600">
                  {medication.instructions || (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
