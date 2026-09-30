import { FaCapsules } from "react-icons/fa";

import { Prescription } from "@/Types/types";
import SectionHeader from "@/components/prescription/PrescriptionPDF/SectionHeader/SectionHeader";

interface MedicationsSectionProps {
  medications: Prescription["medications"];
}

export default function MedicationsSection({
  medications,
}: MedicationsSectionProps) {
  return (
    <section
      className="
        mb-3 box-border break-inside-avoid
        rounded-xl border border-gray-200 p-3
      "
    >
      <SectionHeader
        icon={FaCapsules}
        title="داروهای تجویز شده"
        gradient="from-emerald-500 to-emerald-600"
      />

      <table
        className="
          w-full table-fixed border-collapse text-[10px]
        "
      >
        <thead>
          <tr>
            <TableHeader width="7%">ردیف</TableHeader>
            <TableHeader width="22%">دارو</TableHeader>
            <TableHeader width="15%">مقدار</TableHeader>
            <TableHeader width="21%">نحوه مصرف</TableHeader>
            <TableHeader width="13%">مدت</TableHeader>
            <TableHeader width="22%">توضیحات</TableHeader>
          </tr>
        </thead>

        <tbody>
          {medications.map((medication, index) => (
            <tr key={medication.id} className="odd:bg-white even:bg-gray-50">
              <td className={cellClass}>
                <span
                  className="
                    inline-flex h-5.25 w-5.25
                    items-center justify-center rounded-full
                    bg-emerald-50 font-extrabold text-emerald-600
                  "
                >
                  {index + 1}
                </span>
              </td>

              <td className={`${cellClass} font-extrabold text-emerald-700`}>
                {medication.name}
              </td>

              <td className={cellClass}>{medication.dosage}</td>

              <td className={cellClass}>{medication.frequency}</td>

              <td className={cellClass}>{medication.duration}</td>

              <td className={`${cellClass} wrap-break-word`}>
                {medication.instructions || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  width: string;
}

function TableHeader({ children, width }: TableHeaderProps) {
  return (
    <th
      style={{ width }}
      className="
        border border-gray-300 bg-emerald-50
        px-1 py-2 font-extrabold text-emerald-700
      "
    >
      {children}
    </th>
  );
}

const cellClass = `
  border border-gray-300
  px-1 py-2
  text-center align-middle
`;
