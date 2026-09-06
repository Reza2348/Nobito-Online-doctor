// =========================================================
// HISTORY
// =========================================================

export type HistoryStatus = "current" | "completed" | "cancelled";

export type HistoryIconType = "phone" | "video" | "doctor";

export interface HistoryItem {
  id: number;
  doctorName: string;
  specialty: string;
  avatar: string;
  iconType: HistoryIconType;
  type: string;
  note: string;
  date: string;
  status: HistoryStatus;
}
