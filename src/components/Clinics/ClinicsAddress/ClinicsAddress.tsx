"use client";

import { FiMapPin } from "react-icons/fi";

interface ClinicsAddressProps {
  address: string;
}

export default function ClinicsAddress({ address }: ClinicsAddressProps) {
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <FiMapPin className="shrink-0" size={16} />
      <span className="truncate">نشانی : {address}</span>
    </div>
  );
}
