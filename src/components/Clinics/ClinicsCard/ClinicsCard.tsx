"use client";

import { useRouter } from "next/navigation";

import { useClinics } from "@/context/ClinicsContext/ClinicsContext";
import ClinicsFields from "@/components/Clinics/ClinicsFields/ClinicsFields";
import ClinicsAddress from "@/components/Clinics/ClinicsAddress/ClinicsAddress";

import { Clinic } from "@/Types/types";

import ClinicsImageSection from "./ClinicsImageSection/ClinicsImageSection";
import ClinicsBadges from "./ClinicsBadges/ClinicsBadges";
import ClinicsCardButton from "./ClinicsCardButton/ClinicsBadges";

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
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      className="
        group
        flex
        h-full
        min-h-[620px]
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-teal-200
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
      "
    >
      {/* IMAGE */}
      <ClinicsImageSection image={clinic.photo_url} alt={clinic.name} />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-5 py-5">
        {/* NAME */}
        <h3 className="min-h-[30px] line-clamp-1 text-lg font-extrabold text-gray-900">
          {clinic.name}
        </h3>

        {/* SPECIALTY */}
        <p className="mt-2 min-h-[22px] line-clamp-1 text-sm text-gray-500">
          {clinic.specialty}
        </p>

        {/* BADGES */}
        <div className="mt-3">
          <ClinicsBadges rating={clinic.rating} />
        </div>

        {/* FIELDS */}
        <div className="mt-5 min-h-[60px] overflow-hidden">
          <ClinicsFields fields={clinic.fields} />
        </div>

        {/* ADDRESS */}
        <div className="mt-5 mb-6 min-h-[55px]">
          <ClinicsAddress address={clinic.address} />
        </div>

        {/* BUTTON */}
        <div
          className="mt-auto"
          onClick={(event) => {
            event.stopPropagation();
            handleClick();
          }}
        >
          <ClinicsCardButton href="/clinics-profile" />
        </div>
      </div>
    </div>
  );
}
