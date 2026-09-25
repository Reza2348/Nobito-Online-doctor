import { supabase } from "@/lib/supabaseClient";
import type { AdminClinic } from "@/Types/types";

import {
  createClinicUpdateData,
  mapClinic,
  type ClinicRow,
} from "@/components/admin/ClinicsTable/utils/clinics.utils";

const CLINIC_SELECT = `
  id,
  name,
  specialty,
  patients_satisfied,
  address,
  fields,
  rating,
  created_at,
  satisfied_percent,
  photo_url
`;

export async function fetchClinics(): Promise<AdminClinic[]> {
  const { data, error } = await supabase
    .from("clinics")
    .select(CLINIC_SELECT)
    .order("id", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((clinic) => mapClinic(clinic as ClinicRow));
}

export async function deleteClinic(id: string) {
  const { error } = await supabase.from("clinics").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateClinic(id: string, clinic: AdminClinic) {
  const updateData = createClinicUpdateData(clinic);

  const { error } = await supabase
    .from("clinics")
    .update(updateData)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return {
    ...clinic,
    fields: updateData.fields,
  };
}
