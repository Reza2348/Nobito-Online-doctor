// =========================================================
// MEDICAL RECORDS
// =========================================================

export type MedicalRecordType = "test" | "prescription" | "diagnosis";

export interface MedicalRecord {
  id: number;
  type: MedicalRecordType;
  title: string;
  doctorName: string;
  specialty: string;
  date: string;
  description: string;
}
