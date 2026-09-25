"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";
import { useDoctor } from "@/context/DoctorContext/DoctorContext";

interface Props {
  doctor: D.Doctor;
}

const DoctorCard: React.FC<Props> = ({ doctor }) => {
  const router = useRouter();
  const { setDoctorId } = useDoctor();

  const handleClick = () => {
    setDoctorId(doctor.id);
    router.push("/doctor-profile");
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

      <div className="relative h-64 shrink-0 overflow-hidden">
        <D.DoctorPhoto name={doctor.name} photoUrl={doctor.photo_url} />

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
          تایید شده
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
          <D.DoctorRating rating={doctor.rating} />
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
        {/* Name */}

        <h3
          className="
          min-h-7.5
          line-clamp-1
          text-lg
          font-extrabold
          text-gray-900
          "
        >
          {doctor.name}
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
          {doctor.specialty}
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
            ⭐ {doctor.rating}
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
            {doctor.satisfied_percent ?? "۹۷٪"} رضایت
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
            {doctor.patients_satisfied.toLocaleString("fa-IR")} بیمار
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
          <D.DoctorFields fields={doctor.fields} />
        </div>

        {/* Address */}

        <div
          className="
  mt-5
  mb-6
 min-h-13.75
  overflow-hidden
  text-sm
  "
        >
          <D.DoctorAddress address={doctor.address} />
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
          مشاهده پروفایل
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

export default DoctorCard;
