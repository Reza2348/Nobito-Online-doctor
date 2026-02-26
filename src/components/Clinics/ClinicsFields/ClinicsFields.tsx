"use client";

import React from "react";

interface ClinicsFieldsProps {
  fields: string[];
}

const ClinicsFields: React.FC<ClinicsFieldsProps> = ({ fields }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {fields.map((field, idx) => (
        <span
          key={idx}
          className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full text-center"
        >
          {field}
        </span>
      ))}
    </div>
  );
};

export default ClinicsFields;
