"use client";

import React from "react";
import { useRouter } from "next/navigation";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";
import { useDoctor } from "@/context/DoctorContext/DoctorContext";

interface Props {
  doctor: D.Doctor;
}

const DoctorCard: React.FC<Props> = ({ doctor }) => {
  const router = useRouter();
  const { setDoctorId } = useDoctor(); // گرفتن setter از context

  const handleClick = () => {
    setDoctorId(doctor.id); // ذخیره ID در context
    router.push("/doctor-profile"); // هدایت به صفحه با URL ثابت
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:max-w-75 lg:max-w-87.5] mx-auto cursor-pointer"
    >
      <D.DoctorPhoto name={doctor.name} photoUrl={doctor.photo_url} />

      <div className="flex flex-col px-5 pb-5 flex-1">
        <div className="flex items-center gap-1 w-full mb-2">
          <h3 className="font-bold text-lg text-gray-900 ml-auto text-right">
            {doctor.name}
          </h3>
          <D.DoctorRating rating={doctor.rating} />
        </div>

        <p className="text-gray-400 text-sm text-right mb-3">
          {doctor.specialty}
        </p>

        <p className="text-right font-bold text-base text-teal-700 mb-4">
          <span>({doctor.satisfied_percent ?? "۹۷%"})</span>{" "}
          <span>
            {doctor.patients_satisfied.toLocaleString("fa-IR")} بیمار راضی
          </span>
        </p>

        <D.DoctorFields fields={doctor.fields} />

        <hr className="border-gray-100 mb-4" />

        <D.DoctorAddress address={doctor.address} />
      </div>
    </div>
  );
};

export default DoctorCard;
