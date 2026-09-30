import Link from "next/link";
import { Prescription } from "@/Types/types";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export default function PrescriptionCard({
  prescription,
}: PrescriptionCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
              💊
            </div>

            <div>
              <p className="text-sm text-slate-500">نسخه پزشکی</p>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                نسخه #{prescription.prescriptionNumber}
              </h2>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
              prescription.status === "active"
                ? "bg-emerald-50 text-emerald-700"
                : prescription.status === "completed"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-red-50 text-red-700"
            }`}
          >
            {prescription.status === "active"
              ? "فعال"
              : prescription.status === "completed"
                ? "تکمیل شده"
                : "لغو شده"}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">پزشک</p>

            <p className="mt-1 font-semibold text-slate-800">
              {prescription.doctorName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {prescription.doctorSpecialty}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">تاریخ صدور</p>

            <p className="mt-1 font-semibold text-slate-800">
              {new Date(prescription.createdAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-100 p-4">
          <p className="text-xs text-slate-400">تشخیص</p>

          <p className="mt-1 font-semibold text-slate-800">
            {prescription.diagnosis}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">تعداد دارو</p>

            <p className="mt-1 font-bold text-slate-800">
              {prescription.medications.length} دارو
            </p>
          </div>

          <Link
            href={`/patient/prescriptions/${prescription.id}`}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            مشاهده نسخه
          </Link>
        </div>
      </div>
    </article>
  );
}
