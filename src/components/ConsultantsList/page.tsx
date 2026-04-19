"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Consultant } from "@/Types/types";
import { ConsultantCard } from "@/components/ConsultantsList/ConsultantCard/ConsultantCard";

const ConsultantsList = () => {
  const fetchConsultants = async (): Promise<Consultant[]> => {
    const { data, error } = await supabase
      .from("consultants")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  };

  const {
    data: consultants = [],
    isLoading,
    isError,
    error,
  } = useQuery<Consultant[]>({
    queryKey: ["consultants"],
    queryFn: fetchConsultants,
  });

  if (isLoading)
    return (
      <p className="flex justify-center py-16 text-gray-400 font-sans">
        در حال بارگذاری مشاورین...
      </p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">خطا در بارگذاری داده‌ها</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {consultants.map((c) => (
        <ConsultantCard key={c.id} consultant={c} />
      ))}
    </div>
  );
};

export default ConsultantsList;
