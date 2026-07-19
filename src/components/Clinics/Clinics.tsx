"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClinics } from "@/components/Clinics/services/clinicsService";
import ClinicsCard from "@/components/Clinics/ClinicsCard/ClinicsCard";

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clinics"],
    queryFn: fetchClinics,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        در حال بارگزاری کلینک های پزشکی ...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-16 text-red-400 font-sans">
        خطا در بارگذاری داده‌ها
      </div>
    );

  if (!data?.length)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        هیچ کلنیک یافت نشد
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 mb-6">
      {data.map((clinic) => (
        <ClinicsCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
}
