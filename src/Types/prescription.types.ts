export type PrescriptionStatus = "active" | "completed" | "cancelled";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;

  patientId: string;
  patientName: string;

  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;

  appointmentId: string;

  diagnosis: string;

  medications: Medication[];

  instructions?: string;

  nextVisit?: string;

  status: PrescriptionStatus;

  createdAt: string;
  updatedAt: string;
}
