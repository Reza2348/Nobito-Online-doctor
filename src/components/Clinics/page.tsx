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

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-6">
        {data?.map((clinic) => (
          <ClinicsCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
