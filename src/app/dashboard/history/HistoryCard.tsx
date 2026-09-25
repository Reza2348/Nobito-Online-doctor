"use client";

import Image from "next/image";
import { FaPhoneAlt, FaVideo, FaUserMd, FaChevronDown } from "react-icons/fa";

import { HistoryIconType, HistoryItem } from "@/Types/types";

interface HistoryCardProps {
  item: HistoryItem;
  isOpen: boolean;
  onToggle: () => void;
}

const iconMap: Record<HistoryIconType, React.ReactNode> = {
  phone: <FaPhoneAlt aria-hidden="true" className="h-3.5 w-3.5" />,

  video: <FaVideo aria-hidden="true" className="h-3.5 w-3.5" />,

  doctor: <FaUserMd aria-hidden="true" className="h-3.5 w-3.5" />,
};

const HistoryCard = ({ item, isOpen, onToggle }: HistoryCardProps) => {
  const detailsId = `history-details-${item.id}`;

  return (
    <article className="border-b border-[#E4E4E4] py-5 last:border-0 md:py-6">
      {/* Doctor information */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={item.avatar}
            alt={item.doctorName}
            width={56}
            height={56}
            sizes="(max-width: 768px) 48px, 56px"
            className="h-12 w-12 shrink-0 rounded-full object-cover md:h-14 md:w-14"
          />

          <div className="min-w-0 text-right">
            <h2 className="truncate text-sm font-bold text-[#414141] md:text-base">
              {item.doctorName}
            </h2>

            <p className="mt-1 truncate text-xs text-[#919191] md:text-sm">
              {item.specialty}
            </p>
          </div>
        </div>

        {/* Appointment type */}
        <div className="flex shrink-0 items-center gap-1.5 text-xs text-[#1F7168] md:text-sm">
          {iconMap[item.iconType]}

          <span>{item.type}</span>
        </div>
      </div>

      {/* Doctor note */}
      <p className="mt-4 text-xs leading-6 text-[#414141] md:text-sm">
        <span className="font-bold">نظر پزشک:</span> {item.note}
      </p>

      {/* Additional details */}
      <div
        id={detailsId}
        aria-hidden={!isOpen}
        className={`
          grid overflow-hidden
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="min-h-0">
          <div className="rounded-2xl bg-[#F7FAF9] p-4">
            <div className="space-y-3 text-xs leading-6 text-gray-600 md:text-sm">
              <p>
                <span className="font-bold text-gray-700">توضیحات:</span> برای
                این نوبت، اطلاعات تکمیلی در پرونده پزشکی ثبت شده است.
              </p>

              <p>
                <span className="font-bold text-gray-700">وضعیت:</span>{" "}
                {item.status === "current" && "نوبت جاری"}
                {item.status === "completed" && "نوبت انجام شده"}
                {item.status === "cancelled" && "نوبت لغو شده"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <time className="text-[11px] text-[#919191] md:text-xs">
          {item.date}
        </time>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          className="
            flex items-center gap-1
            text-xs text-[#0683C9]
            transition-colors
            hover:text-[#05699F]
            focus:outline-none
            focus:ring-2
            focus:ring-[#0683C9]/30
            md:text-sm
          "
        >
          <FaChevronDown
            aria-hidden="true"
            className={`
              h-3 w-3
              transition-transform
              duration-200
              ${isOpen ? "rotate-180" : ""}
            `}
          />

          <span>{isOpen ? "بستن جزئیات" : "جزئیات بیشتر"}</span>
        </button>
      </div>
    </article>
  );
};

export default HistoryCard;
