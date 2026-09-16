import { CiStar } from "react-icons/ci";
import { FaRegThumbsUp } from "react-icons/fa";

import type { FeedbackItem } from "@/Types/types";

type Props = {
  item: FeedbackItem;
  active: boolean;
};

export default function FeedbackCard({ item, active }: Props) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 w-full md:w-80 transition-all duration-300 ${
        active ? "border border-gray-200 scale-100" : "opacity-70 scale-95"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-9 h-9 rounded-full object-cover"
          />

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{item.name}</p>

            <p className="text-xs text-gray-400">تاریخ: {item.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <CiStar size={18} />
          <span className="text-gray-700">{item.rating}</span>
        </div>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.text}</p>

      <button
        type="button"
        className="flex items-center justify-start gap-1 text-[#1F7168] text-xs font-medium hover:opacity-80 ml-auto"
      >
        <FaRegThumbsUp size={14} />
        پیشنهاد میکنم
      </button>
    </div>
  );
}
