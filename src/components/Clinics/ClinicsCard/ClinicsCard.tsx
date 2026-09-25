"use client";

import { useRouter } from "next/navigation";

import { useClinics } from "@/context/ClinicsContext/ClinicsContext";
import ClinicsFields from "@/components/Clinics/ClinicsFields/ClinicsFields";
import ClinicsAddress from "@/components/Clinics/ClinicsAddress/ClinicsAddress";
import { Clinic } from "@/Types/types";

import ClinicsImageSection from "./ClinicsImageSection/ClinicsImageSection";
import ClinicsBadges from "./ClinicsBadges/ClinicsBadges";
import ClinicsCardButton from "./ClinicsCardButton/ClinicsCardButton";

interface ClinicsCardProps {
  clinic: Clinic;
}

export default function ClinicsCard({ clinic }: ClinicsCardProps) {
  const router = useRouter();

  const { setSelectedClinic } = useClinics();

  const handleClick = () => {
    setSelectedClinic(clinic);

    router.push("/clinics-profile");
  };

  return (
    <div
      onClick={handleClick}
      className="
      group
      flex
      h-full
      min-h-155
      flex-col
      overflow-hidden
      cursor-pointer
      rounded-3xl
      border
      border-gray-100
      bg-white
      shadow-[0_8px_30px_rgba(0,0,0,.06)]
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-teal-200
      hover:shadow-[0_20px_50px_rgba(0,0,0,.12)]
      "
    >
      <ClinicsImageSection
        name={clinic.name}
        photoUrl={clinic.photo_url}
        rating={clinic.rating}
      />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-5 py-5">
        {/* NAME */}
        <h3 className="min-h-7.5 line-clamp-1 text-lg font-extrabold text-gray-900">
          {clinic.name}
        </h3>

        {/* Specialty */}
        <p className="mt-2 min-h-5.5 line-clamp-1 text-sm text-gray-500">
          {clinic.specialty}
        </p>

        <ClinicsBadges
          rating={clinic.rating}
          satisfiedPercent={clinic.satisfied_percent}
          patientsSatisfied={clinic.patients_satisfied}
        />

        {/* Fields */}
        <div className="mt-5 min-h-15 overflow-hidden">
          <ClinicsFields fields={clinic.fields} />
        </div>

        {/* Address */}
        <div className="mt-5 mb-6 min-h-13.75">
          <ClinicsAddress address={clinic.address} />
        </div>

        <ClinicsCardButton />
      </div>
    </div>
  );
}
