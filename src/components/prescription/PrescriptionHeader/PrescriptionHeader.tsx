import { Prescription } from "@/Types/types";

interface PrescriptionHeaderProps {
  prescription: Prescription;
}

export default function PrescriptionHeader({
  prescription,
}: PrescriptionHeaderProps) {
  const statusConfig = {
    active: {
      label: "فعال",
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    completed: {
      label: "تکمیل شده",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },

    cancelled: {
      label: "لغو شده",
      className: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const status = statusConfig[prescription.status];

  return (
    <div className="border-b border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm text-slate-500">شماره نسخه</p>

              <h1 className="text-xl font-bold text-slate-900">
                #{prescription.prescriptionNumber}
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            صادر شده در{" "}
            {new Date(prescription.createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-medium ${status.className}`}
        >
          <span className="ml-2 h-2 w-2 rounded-full bg-current" />
          {status.label}
        </span>
      </div>
    </div>
  );
}
