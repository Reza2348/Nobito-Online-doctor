import {
  FaCalendarAlt,
  FaStethoscope,
  FaUserMd,
  FaClipboardList,
} from "react-icons/fa";

import { Prescription } from "@/Types/types";
import SectionHeader from "@/components/prescription/PrescriptionPDF/SectionHeader/SectionHeader";

interface PrescriptionInfoProps {
  prescription: Prescription;
  createdDate: string;
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-gray-50 p-2">
      <span className="flex items-center gap-1 text-[11px] text-gray-500">
        <Icon className="text-[9px] text-blue-500" />
        {label}
      </span>

      <strong className="text-[13px] font-semibold text-gray-900">
        {value}
      </strong>
    </div>
  );
}

export default function PrescriptionInfo({
  prescription,
  createdDate,
}: PrescriptionInfoProps) {
  return (
    <section
      className="
        mb-3 box-border break-inside-avoid
        rounded-xl border border-gray-200 p-3
      "
    >
      <SectionHeader icon={FaClipboardList} title="اطلاعات نسخه" />

      <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
        <InfoItem
          icon={FaUserMd}
          label="بیمار"
          value={prescription.patientName}
        />

        <InfoItem
          icon={FaUserMd}
          label="پزشک"
          value={prescription.doctorName}
        />

        <InfoItem
          icon={FaStethoscope}
          label="تخصص"
          value={prescription.doctorSpecialty}
        />

        <InfoItem icon={FaCalendarAlt} label="تاریخ صدور" value={createdDate} />
      </div>
    </section>
  );
}
