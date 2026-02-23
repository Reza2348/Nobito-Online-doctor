import * as D from "@/Imports/DoctorListImports/DoctorListImports";

export const fetchDoctors = async (): Promise<D.Doctor[]> => {
  const { data, error } = await D.supabase
    .from("doctors")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data as D.Doctor[];
};
