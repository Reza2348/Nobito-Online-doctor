interface PrescriptionFooterProps {
  doctorName: string;
  createdDate: string;
}

export default function PrescriptionFooter({
  doctorName,
  createdDate,
}: PrescriptionFooterProps) {
  return (
    <footer
      className="
        mt-5 flex items-end justify-between gap-8
        break-inside-avoid border-t border-gray-200
        pt-3 text-[10px] text-gray-500
      "
    >
      <div>
        <div>این نسخه به صورت الکترونیکی صادر شده است.</div>

        <div className="mt-1 text-gray-400">تاریخ صدور: {createdDate}</div>
      </div>

      <div className="w-35 text-center">
        <div className="font-semibold text-gray-700">پزشک معالج</div>

        <div
          className="
            mt-6 border-t border-gray-400
            pt-1 text-gray-900
          "
        >
          {doctorName}
        </div>
      </div>
    </footer>
  );
}
