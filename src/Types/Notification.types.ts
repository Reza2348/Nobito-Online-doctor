export type NotificationType = "doctor" | "consultant" | "clinic" | "system";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  entity_id: string | null;
  is_read: boolean;
  created_at: string;
  time: string;
  read: boolean;
}

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  entity_id?: string | null;
}
