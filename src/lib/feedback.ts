import type { FeedbackType } from "@/Types/types";

export const feedbackDatabaseConfig: Record<
  FeedbackType,
  {
    table: "doctor_feedback" | "consultant_feedback" | "clinic_feedback";
    idColumn: "doctor_id" | "consultant_id" | "clinic_id";
  }
> = {
  doctor: {
    table: "doctor_feedback",
    idColumn: "doctor_id",
  },

  consultant: {
    table: "consultant_feedback",
    idColumn: "consultant_id",
  },

  clinic: {
    table: "clinic_feedback",
    idColumn: "clinic_id",
  },
};
