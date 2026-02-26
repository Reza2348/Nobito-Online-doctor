"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

interface ClinicsRatingProps {
  rating?: number; // امتیاز کلینیک
}

const ClinicsRating: React.FC<ClinicsRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold text-gray-700 text-sm">{rating ?? "۴/۵"}</span>
      <FaStar className="text-amber-400" size={18} />
    </div>
  );
};

export default ClinicsRating;
