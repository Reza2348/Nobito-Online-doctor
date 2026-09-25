import { NotificationItem } from "../NotificationItem/NotificationItem";
import { NotificationsEmpty } from "../NotificationsEmpty/NotificationsEmpty";

import type { Notification } from "@/Types/types";

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

export function NotificationsList({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return <NotificationsEmpty />;
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
