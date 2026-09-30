import { FaClipboardList } from "react-icons/fa";

import SectionHeader from "@/components/prescription/PrescriptionPDF/SectionHeader/SectionHeader";

interface InstructionsSectionProps {
  instructions?: string | null;
}

export default function InstructionsSection({
  instructions,
}: InstructionsSectionProps) {
  if (!instructions) return null;

  return (
    <section
      className="
        mb-3 box-border break-inside-avoid
        rounded-xl border border-gray-200 p-3
      "
    >
      <SectionHeader
        icon={FaClipboardList}
        title="دستور پزشک"
        gradient="from-amber-500 to-orange-500"
      />

      <div
        className="
          rounded-lg border border-amber-200
          bg-amber-50 p-2.5 text-gray-700
        "
      >
        {instructions}
      </div>
    </section>
  );
}
