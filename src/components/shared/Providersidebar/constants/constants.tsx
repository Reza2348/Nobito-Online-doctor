import type { ReactNode } from "react";
import { FaPhone, FaUserFriends, FaVideo, FaCommentDots } from "react-icons/fa";
import {
  generateSlotsForCalendarDay,
  getLocalCalendarDay,
} from "@/lib/appointmentSlots";
import type { ConsultType, Slot, SlotType } from "@/Types/types";

export const consultTypes: {
  id: ConsultType;
  icon: ReactNode;
  label: string;
}[] = [
  { id: "phone", icon: <FaPhone size={15} />, label: "تلفنی" },
  { id: "inPerson", icon: <FaUserFriends size={15} />, label: "حضوری" },
  { id: "video", icon: <FaVideo size={15} />, label: "آنلاین" },
  { id: "text", icon: <FaCommentDots size={15} />, label: "متنی" },
];

/**
 * زمان‌ها بر اساس وقت تهران ساخته می‌شوند و همان تعریف در سرور
 * (`/api/appointments`) برای اعتبارسنجی استفاده می‌شود.
 */
export function generateSlotsForDate(date: Date, type: SlotType): Slot[] {
  return generateSlotsForCalendarDay(getLocalCalendarDay(date), type);
}

export const defaultPriceByType: Record<SlotType, number> = {
  inPerson: 157000,
  video: 120000,
};
