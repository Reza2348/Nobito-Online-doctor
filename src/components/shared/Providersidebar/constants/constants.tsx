import type { ReactNode } from "react";
import dayjs from "dayjs";
import { FaPhone, FaUserFriends, FaVideo, FaCommentDots } from "react-icons/fa";
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

const TIME_SLOTS_BY_TYPE: Record<SlotType, { hour: number; minute: number }[]> =
  {
    inPerson: [
      { hour: 10, minute: 0 },
      { hour: 11, minute: 30 },
      { hour: 14, minute: 30 },
      { hour: 16, minute: 0 },
    ],

    video: [
      { hour: 9, minute: 30 },
      { hour: 13, minute: 15 },
      { hour: 17, minute: 0 },
      { hour: 19, minute: 0 },
    ],
  };

export function generateSlotsForDate(date: Date, type: SlotType): Slot[] {
  const dayKey = dayjs(date).format("YYYYMMDD");

  return TIME_SLOTS_BY_TYPE[type].map(({ hour, minute }, index) => ({
    id: `${type}-${dayKey}-${index}`,
    date: dayjs(date)
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0)
      .toDate(),
  }));
}

export const defaultPriceByType: Record<SlotType, number> = {
  inPerson: 157000,
  video: 120000,
};
