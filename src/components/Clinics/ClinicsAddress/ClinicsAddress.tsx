"use client";

import { FiMapPin } from "react-icons/fi";

interface ClinicsAddressProps {
  address: string;
}

export default function ClinicsAddress({ address }: ClinicsAddressProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <FiMapPin className="text-gray-600" />
      <span>{address}</span>
    </div>
  );
}
