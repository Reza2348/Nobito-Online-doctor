import {
  FaFileMedical,
  FaFilePrescription,
  FaStethoscope,
} from "react-icons/fa";

interface PrescriptionHeaderProps {
  prescriptionNumber: string;
}

export default function PrescriptionHeader({
  prescriptionNumber,
}: PrescriptionHeaderProps) {
  return (
    <header className="mb-5 border-b-2 border-blue-600 pb-3">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-xl bg-linear-to-br from-blue-500 to-cyan-400
              text-white shadow-md print:shadow-none
            "
          >
            <FaFileMedical className="text-2xl" />
          </div>

          <div>
            <div
              className="
                text-[22px] font-extrabold tracking-wide text-blue-600
              "
            >
              Nobito
            </div>

            <div
              className="
                mt-1 flex items-center gap-1.5
                text-[11px] font-medium text-gray-600
              "
            >
              <FaFilePrescription className="text-[10px] text-blue-500" />

              <span>شماره نسخه:</span>

              <span
                className="
                  rounded-md bg-blue-50 px-2 py-0.5
                  font-extrabold text-blue-700
                "
              >
                {prescriptionNumber}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            flex items-center gap-2.5 rounded-xl border
            border-cyan-200 bg-linear-to-r
            from-blue-50 to-cyan-50 px-4 py-2.5
          "
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-lg bg-white text-blue-600 shadow-sm
            "
          >
            <FaStethoscope className="text-lg" />
          </div>

          <div className="text-right">
            <div
              className="
                text-[8px] font-semibold
                tracking-wider text-cyan-600
              "
            >
              MEDICAL PRESCRIPTION
            </div>

            <div className="text-[18px] font-extrabold text-blue-800">
              نسخه پزشکی
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex gap-1">
        <span className="h-1 w-16 rounded-full bg-blue-500" />
        <span className="h-1 w-6 rounded-full bg-cyan-400" />
      </div>
    </header>
  );
}
