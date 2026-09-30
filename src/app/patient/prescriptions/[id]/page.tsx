import Link from "next/link";
import { notFound } from "next/navigation";

import PrescriptionHeader from "@/components/prescription/PrescriptionHeader/PrescriptionHeader";
import MedicationTable from "@/components/prescription/MedicationTable/MedicationTable";
import PrescriptionActions from "@/components/prescription/PrescriptionActions/PrescriptionActions";

import { getPrescriptionById } from "@/services/prescription.service";

interface PrescriptionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PrescriptionDetailsPage({
  params,
}: PrescriptionDetailsPageProps) {
  const { id } = await params;

  const prescription = await getPrescriptionById(id);

  if (!prescription) {
    notFound();
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/patient/prescriptions"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-teal-600"
          >
            <span>→</span>
            بازگشت به نسخه‌های من
          </Link>
        </div>

        <div
          id="prescription-print"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <PrescriptionHeader prescription={prescription} />

          <div className="space-y-8 p-6 sm:p-8">
            {/* Patient & Doctor */}
            <section className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    👤
                  </div>

                  <h2 className="font-bold text-slate-900">اطلاعات بیمار</h2>
                </div>

                <p className="text-sm text-slate-500">نام بیمار</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {prescription.patientName}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    👨‍⚕️
                  </div>

                  <h2 className="font-bold text-slate-900">اطلاعات پزشک</h2>
                </div>

                <p className="text-sm text-slate-500">پزشک معالج</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {prescription.doctorName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {prescription.doctorSpecialty}
                </p>
              </div>
            </section>

            {/* Diagnosis */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  🩺
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">تشخیص پزشک</h2>

                  <p className="text-sm text-slate-500">
                    نتیجه بررسی و تشخیص در زمان ویزیت
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="font-semibold text-amber-900">
                  {prescription.diagnosis}
                </p>
              </div>
            </section>

            {/* Medication */}
            <MedicationTable medications={prescription.medications} />

            {/* Instructions */}
            {prescription.instructions && (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    📝
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">دستور پزشک</h2>

                    <p className="text-sm text-slate-500">
                      توصیه‌های پزشک برای ادامه درمان
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 leading-8 text-slate-700">
                  {prescription.instructions}
                </div>
              </section>
            )}

            {/* Next Visit */}
            {prescription.nextVisit && (
              <section className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal-700">
                      مراجعه بعدی
                    </p>

                    <p className="mt-1 text-lg font-bold text-teal-900">
                      {new Date(prescription.nextVisit).toLocaleDateString(
                        "fa-IR",
                      )}
                    </p>
                  </div>

                  <div className="text-3xl">📅</div>
                </div>
              </section>
            )}

            {/* Actions */}
            <div className="border-t border-slate-200 pt-6">
              <PrescriptionActions prescription={prescription} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
