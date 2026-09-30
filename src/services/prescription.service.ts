import { prescriptions } from "@/data/prescriptions";
import { Prescription } from "@/Types/types";

export async function getPrescriptions(): Promise<Prescription[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return prescriptions;
}

export async function getPrescriptionById(
  id: string,
): Promise<Prescription | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const prescription = prescriptions.find((item) => item.id === id);

  return prescription ?? null;
}
