"use client";

import { useClinicProfile } from "@/hooks/useClinicProfile";
import ClinicProfile from "@/components/ClinicsProfile/ClinicsProfile";

export default function ClinicsProfilePage() {
  const { clinic, loading, error } = useClinicProfile();

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen gap-4"
        role="status"
        aria-live="polite"
      >
        <span className="text-gray-500 font-bold text-lg">
          در حال بارگذاری پروفایل کلینیک...
        </span>
        <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500" role="alert">
        خطا در دریافت اطلاعات: {error}
      </p>
    );
  }

  if (!clinic) {
    return (
      <p className="text-center mt-10 text-gray-500">
        کلینیک مورد نظر پیدا نشد.
      </p>
    );
  }

  return <ClinicProfile clinic={clinic} />;
}
