"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useClinics } from "@/context/ClinicsContext/ClinicsContext";
import ClinicsPhoto from "@/components/Clinics/ClinicsPhoto/ClinicsPhoto";
import ClinicsRating from "@/components/Clinics/ClinicsRating/ClinicsRating";
import ClinicsFields from "@/components/Clinics/ClinicsFields/ClinicsFields";
import ClinicsAddress from "@/components/Clinics/ClinicsAddress/ClinicsAddress";
import { Clinic } from "@/Types/types";

interface ClinicsCardProps {
  clinic: Clinic;
}

const ClinicsCard: React.FC<ClinicsCardProps> = ({ clinic }) => {
  const { setSelectedClinic } = useClinics();
  const router = useRouter();

  const handleClick = () => {
    setSelectedClinic(clinic);
    router.push("/clinics-profile");
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:max-w-[75%] lg:max-w-[87.5%] mx-auto cursor-pointer"
    >
      <ClinicsPhoto name={clinic.name} photoUrl={clinic.photo_url} />

      <div className="flex flex-col px-5 pb-5 flex-1">
        <div className="flex items-center gap-1 w-full mb-2">
          <h3 className="font-bold text-lg text-gray-900 ml-auto text-right">
            {clinic.name}
          </h3>
          <ClinicsRating rating={clinic.rating} />
        </div>

        <p className="text-gray-400 text-sm text-right mb-3">
          {clinic.specialty}
        </p>

        <p className="text-right font-bold text-base text-teal-700 mb-4">
          <span>({clinic.satisfied_percent ?? "۹۷%"})</span>{" "}
          <span>
            {clinic.patients_satisfied.toLocaleString("fa-IR")} بیمار راضی
          </span>
        </p>

        <ClinicsFields fields={clinic.fields} />

        <hr className="border-gray-100 mb-4" />

        <ClinicsAddress address={clinic.address} />
      </div>
    </div>
  );
};

export default ClinicsCard;
