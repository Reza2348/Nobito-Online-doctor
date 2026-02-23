"use client";

import React from "react";

interface Props {
  fields?: string[];
}

const DoctorFields: React.FC<Props> = ({ fields }) => {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {fields.map((tag) => (
        <span
          key={tag}
          className="bg-[#f3f4f6] text-gray-500 px-5 py-2 rounded-full text-[11px] font-bold hover:bg-teal-50 hover:text-[#2a7d73] transition-colors cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default DoctorFields;
