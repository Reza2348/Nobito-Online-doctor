"use client";

import { FiMessageCircle } from "react-icons/fi";

const ConsultantStatus = () => {
  return (
    <div
      className="
      my-6
      flex
      items-center
      justify-center
      gap-2
      rounded-xl
      bg-emerald-50
      px-4
      py-3
      text-sm
      font-semibold
      text-emerald-700
      "
    >
      <FiMessageCircle />

      <span>آماده مشاوره آنلاین</span>
    </div>
  );
};

export default ConsultantStatus;
