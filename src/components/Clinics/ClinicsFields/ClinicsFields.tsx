"use client";

import React from "react";

interface ClinicsFieldsProps {
  fields: string[];
}

const ClinicsFields: React.FC<ClinicsFieldsProps> = ({ fields }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div
      className="
      flex
      min-h-15
      flex-wrap
      items-center
      justify-center
      gap-2
      "
    >
      {fields.map((field) => (
        <span
          key={field}
          className="
          rounded-full
          bg-teal-50
          px-3
          py-1.5
          text-xs
          font-semibold
          text-teal-700
          transition
          hover:bg-teal-600
          hover:text-white
          "
        >
          {field}
        </span>
      ))}
    </div>
  );
};

export default ClinicsFields;
