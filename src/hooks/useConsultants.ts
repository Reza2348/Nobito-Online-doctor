// hooks/useConsultants.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Consultant } from "@/Types/types";

export const useConsultants = () => {
  const fetchConsultants = async (): Promise<Consultant[]> => {
    const { data, error } = await supabase
      .from("consultants")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  };

  return useQuery<Consultant[]>({
    queryKey: ["consultants"],
    queryFn: fetchConsultants,
  });
};
