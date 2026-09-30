import { FaCalendarAlt } from "react-icons/fa";

import SectionHeader from "@/components/prescription/PrescriptionPDF/SectionHeader/SectionHeader";

interface NextVisitSectionProps {
  date?: string | null;
}

export default function NextVisitSection({ date }: NextVisitSectionProps) {
  if (!date) return null;

  return (
    <section
      className="
        mb-3 box-border break-inside-avoid
        rounded-xl border border-gray-200 p-3
      "
    >
      <SectionHeader
        icon={FaCalendarAlt}
        title="زمان مراجعه بعدی"
        gradient="from-cyan-500 to-cyan-600"
      />

      <div
        className="
          flex items-center gap-2 rounded-lg
          border border-cyan-200 bg-cyan-50
          p-2.5 font-bold text-cyan-800
        "
      >
        <FaCalendarAlt className="text-cyan-500" />
        <span>{date}</span>
      </div>
    </section>
  );
}
