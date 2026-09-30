import PrescriptionCard from "@/components/prescription/PrescriptionCard/PrescriptionCard";
import { getPrescriptions } from "@/services/prescription.service";

export default async function PrescriptionsPage() {
  const prescriptions = await getPrescriptions();

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-2xl">
              📋
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                نسخه‌های من
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                نسخه‌های پزشکی صادر شده توسط پزشکان
              </p>
            </div>
          </div>
        </div>

        {prescriptions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              📄
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              هنوز نسخه‌ای ندارید
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              بعد از مراجعه به پزشک، نسخه‌های شما در این قسمت نمایش داده
              می‌شوند.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
