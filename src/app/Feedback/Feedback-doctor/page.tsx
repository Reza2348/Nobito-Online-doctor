"use client";

import { useSearchParams } from "next/navigation";

import FeedbackForm from "@/components/Feedback/FeedbackForm/FeedbackForm";

export default function FeedbackDoctorPage() {
  const searchParams = useSearchParams();

  // -----------------------------------------
  // دریافت ID پزشک
  // -----------------------------------------

  const doctorId = searchParams.get("doctorId");

  // -----------------------------------------
  // شناسه پزشک وجود ندارد
  // -----------------------------------------

  if (!doctorId) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-red-600">شناسه پزشک مشخص نشده است.</p>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // تبدیل ID به number
  // -----------------------------------------

  const entityId = Number(doctorId);

  // -----------------------------------------
  // بررسی ID
  // -----------------------------------------

  if (!Number.isInteger(entityId) || entityId <= 0) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="font-bold text-red-600">شناسه پزشک نامعتبر است.</p>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // نمایش Feedback
  // -----------------------------------------

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <FeedbackForm type="doctor" entityId={entityId} />
      </div>
    </main>
  );
}
