"use client";

import { FiMapPin } from "react-icons/fi";

interface ClinicsAddressProps {
  address: string;
}

export default function ClinicsAddress({ address }: ClinicsAddressProps) {
  return (
    <div
      className="
  flex
  items-center
  gap-2
  rounded-2xl
  bg-gray-50
  px-3
  py-2.5
  text-sm
  text-gray-600
  "
    >
      <FiMapPin
        className="
  shrink-0
  text-teal-600
  "
        size={17}
      />

      <span
        className="
line-clamp-1
"
      >
        {address}
      </span>
    </div>
  );
}
