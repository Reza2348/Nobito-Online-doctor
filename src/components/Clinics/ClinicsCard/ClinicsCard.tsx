"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

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
      {/* IMAGE */}

      <div
        className="
        relative
        h-64
        shrink-0
        overflow-hidden
        "
      >
        <div
          className="
          transition-transform
          duration-700
          group-hover:scale-105
          "
        >
          <ClinicsPhoto name={clinic.name} photoUrl={clinic.photo_url} />
        </div>

        <div
          className="
          absolute
          inset-0
         bg-linear-to-t
          from-black/30
          via-transparent
          to-transparent
          "
        />

        {/* Verified */}

        <div
          className="
          absolute
          right-4
          top-4
          flex
          items-center
          gap-1
          rounded-full
          bg-white/90
          px-3
          py-1.5
          text-xs
          font-bold
          text-emerald-600
          shadow
          backdrop-blur
          "
        >
          <FiCheckCircle size={14} />
          کلینیک معتبر
        </div>

        {/* Rating */}

        <div
          className="
          absolute
          bottom-4
          left-4
          rounded-full
          bg-white/95
          px-3
          py-1.5
          shadow
          "
        >
          <ClinicsRating rating={clinic.rating} />
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
        flex
        flex-1
        flex-col
        px-5
        py-5
        "
      >
        {/* NAME */}

        <h3
          className="
          min-h-7.5
          line-clamp-1
          text-lg
          font-extrabold
          text-gray-900
          "
        >
          {clinic.name}
        </h3>

        {/* Specialty */}

        <p
          className="
          mt-2
         min-h-5.5
          line-clamp-1
          text-sm
          text-gray-500
          "
        >
          {clinic.specialty}
        </p>

        {/* BADGES */}

        <div
          className="
          mt-5
          flex
          min-h-8.5
           items-center
          flex-wrap
          gap-2
          "
        >
          <span
            className="
            rounded-full
            bg-yellow-50
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-700
            "
          >
            ⭐ {clinic.rating}
          </span>

          <span
            className="
            rounded-full
            bg-emerald-50
            px-3
            py-1
            text-xs
            font-bold
            text-emerald-700
            "
          >
            {clinic.satisfied_percent ?? "۹۷٪"} رضایت
          </span>

          <span
            className="
            rounded-full
            bg-sky-50
            px-3
            py-1
            text-xs
            font-bold
            text-sky-700
            "
          >
            {clinic.patients_satisfied?.toLocaleString("fa-IR") ?? "1000+"}
            مراجعه
          </span>
        </div>

        {/* Fields */}

        <div
          className="
          mt-5
          min-h-15
          overflow-hidden
          "
        >
          <ClinicsFields fields={clinic.fields} />
        </div>

        {/* Address */}

        <div
          className="
          mt-5
          mb-6
          min-h-13.75
          "
        >
          <ClinicsAddress address={clinic.address} />
        </div>

        {/* BUTTON */}

        <button
          className="
          mt-auto
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-linear-to-r
          from-teal-600
          to-emerald-500
          py-3
          font-bold
          text-white
          transition-all
          duration-300
          hover:shadow-lg
          "
        >
          مشاهده کلینیک
          <FiArrowLeft
            className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
            "
          />
        </button>
      </div>
    </div>
  );
};

export default ClinicsCard;
