"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import type { Consultant } from "@/Types/types";
import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";

import ConsultantPhoto from "../ConsultantPhoto/ConsultantPhoto";
import ConsultantRating from "../ConsultantRating/ConsultantRating";
import ConsultantFields from "../ConsultantFields/ConsultantFields";
import ConsultantStatus from "../ConsultantStatus/ConsultantStatus";

interface ConsultantCardProps {
  consultant: Consultant;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({
  consultant,
}) => {
  const router = useRouter();
  const { setConsultantId } = useConsultant();

  const handleClick = () => {
    setConsultantId(consultant.id);
    router.push("/Consultants-Profile");
  };

  return (
    <div
      className="
      group
      flex
      h-full
      min-h-125
      flex-col
      items-center
      rounded-3xl
      border
      border-gray-100
      bg-white
      p-6
      text-center
      shadow-[0_8px_30px_rgba(0,0,0,.06)]
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-teal-200
      hover:shadow-[0_20px_50px_rgba(0,0,0,.12)]
      "
    >
      {/* PHOTO */}

      <ConsultantPhoto name={consultant.name} photoUrl={consultant.photo_url} />

      {/* NAME */}

      <h2
        className="
        mt-5
        text-xl
        font-extrabold
        text-gray-900
        "
      >
        {consultant.name}
      </h2>

      {/* SPECIALTY */}

      <p
        className="
        mt-2
        text-sm
        text-gray-500
        "
      >
        {consultant.specialty}
      </p>

      {/* RATING */}

      <ConsultantRating rating={consultant.rating} />

      {/* FIELDS */}

      {consultant.fields && <ConsultantFields fields={consultant.fields} />}

      {/* STATUS */}

      <ConsultantStatus />

      {/* BUTTON */}

      <button
        onClick={handleClick}
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
        دریافت نوبت
        <FiArrowLeft
          className="
          transition-transform
          duration-300
          group-hover:-translate-x-1
          "
        />
      </button>
    </div>
  );
};
