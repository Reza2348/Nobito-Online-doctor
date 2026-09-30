import { Medication } from "@/Types/types";

interface MedicationTableProps {
  medications: Medication[];
}

export default function MedicationTable({ medications }: MedicationTableProps) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          💊
        </div>

        <div>
          <h2 className="font-bold text-slate-900">داروهای تجویز شده</h2>

          <p className="text-sm text-slate-500">لیست داروها و نحوه مصرف</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="hidden bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600 md:grid md:grid-cols-4 md:gap-4">
          <div>دارو</div>
          <div>دوز</div>
          <div>زمان مصرف</div>
          <div>مدت مصرف</div>
        </div>

        <div className="divide-y divide-slate-200">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="p-5 transition hover:bg-slate-50"
            >
              <div className="grid gap-4 md:grid-cols-4 md:items-center">
                <div>
                  <p className="font-bold text-slate-900">{medication.name}</p>

                  {medication.instructions && (
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {medication.instructions}
                    </p>
                  )}
                </div>

                <div>
                  <span className="mb-1 block text-xs text-slate-400 md:hidden">
                    دوز
                  </span>

                  <span className="text-sm text-slate-700">
                    {medication.dosage}
                  </span>
                </div>

                <div>
                  <span className="mb-1 block text-xs text-slate-400 md:hidden">
                    زمان مصرف
                  </span>

                  <span className="text-sm text-slate-700">
                    {medication.frequency}
                  </span>
                </div>

                <div>
                  <span className="mb-1 block text-xs text-slate-400 md:hidden">
                    مدت مصرف
                  </span>

                  <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                    {medication.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
