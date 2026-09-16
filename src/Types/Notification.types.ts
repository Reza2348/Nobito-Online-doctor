export type NotificationType = "doctor" | "consultant" | "clinic" | "system";

export interface NotificationRow {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  entity_id: string | null;
  is_read: boolean;
  created_at: string;
}

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  entity_id?: string | null;
}
