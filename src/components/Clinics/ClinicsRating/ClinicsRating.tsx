"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

interface ClinicsRatingProps {
  rating?: number;
}

const ClinicsRating: React.FC<ClinicsRatingProps> = ({ rating }) => {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-yellow-50
      px-4
      py-2
      shadow-sm
      "
    >
      <FaStar
        className="
        text-yellow-400
        "
        size={16}
      />

      <span
        className="
        text-sm
        font-extrabold
        text-yellow-700
        "
      >
        {rating ?? 4.8}
      </span>

      <span
        className="
        text-xs
        font-medium
        text-yellow-600
        "
      >
        عالی
      </span>
    </div>
  );
};

export default ClinicsRating;
