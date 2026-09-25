"use client";

import { useSearchParams } from "next/navigation";

import FeedbackForm from "@/components/Feedback/FeedbackForm/FeedbackForm";

export default function FeedbackClinicsPage() {
  const searchParams = useSearchParams();

  const clinicId = searchParams.get("clinicId");

  if (!clinicId) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-red-600">شناسه کلینیک مشخص نشده است.</p>
        </div>
      </main>
    );
  }

  const entityId = Number(clinicId);

  if (!Number.isInteger(entityId) || entityId <= 0) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-red-600">شناسه کلینیک نامعتبر است.</p>
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <FeedbackForm type="clinic" entityId={entityId} />
      </div>
    </main>
  );
}
