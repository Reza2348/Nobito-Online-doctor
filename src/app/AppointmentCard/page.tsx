import type { Metadata } from "next";

import DoctorList from "@/components/DoctorList/DoctorList";

export const metadata: Metadata = {
  title: "نوبت‌دهی پزشکان | نوبیتو",
  description: "پزشک موردنظر خود را انتخاب کنید و نوبت آنلاین یا حضوری رزرو کنید.",
};

export default function AppointmentCardPage() {
  return (
    <section className="bg-gray-50 py-16" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h1 className="mb-12 text-3xl font-bold text-black">نوبت‌دهی پزشکان</h1>
      </div>

      <DoctorList />
    </section>
  );
}
