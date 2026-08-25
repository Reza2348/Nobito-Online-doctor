"use client";

import React from "react";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  doctor: D.Doctor;
}

const DoctorBio: React.FC<Props> = ({ doctor }) => {
  const specialty = doctor.specialty?.trim();

  const fields = Array.isArray(doctor.fields) ? doctor.fields : [];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.07)] sm:p-8">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-16
          h-36
          w-36
          rounded-full
          bg-emerald-50/60
          blur-3xl
        "
      />

      {/* Header */}
      <div
        className="
          relative
          mb-6
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
            text-emerald-600
            ring-1
            ring-emerald-100
          "
        >
          <D.FaStethoscope className="text-xl" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-extrabold
              tracking-tight
              text-gray-900
            "
          >
            تخصص و زمینه‌های فعالیت
          </h2>

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-gray-400
            "
          >
            معرفی تخصص و حوزه‌های فعالیت پزشک
          </p>
        </div>
      </div>

      {/* Specialty */}
      {specialty && (
        <div
          className="
            relative
            mt-7
            border-t
            border-gray-100
            pt-6
          "
        >
          <div className="mb-3 flex items-center gap-2">
            <D.FaStethoscope className="text-sm text-emerald-500" />

            <span className="text-sm font-bold text-gray-800">تخصص اصلی</span>
          </div>

          <div
            className="
              inline-flex
              items-center
              rounded-xl
              bg-emerald-50
              px-4
              py-2.5
              text-sm
              font-bold
              text-emerald-600
              ring-1
              ring-emerald-100
            "
          >
            {specialty}
          </div>
        </div>
      )}

      {/* Fields */}
      {fields.length > 0 && (
        <div
          className="
            relative
            mt-6
            border-t
            border-gray-100
            pt-6
          "
        >
          <div className="mb-3 text-sm font-bold text-gray-800">
            زمینه‌های فعالیت
          </div>

          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <span
                key={`${field}-${index}`}
                className="
                  rounded-xl
                  border
                  border-gray-100
                  bg-gray-50
                  px-3.5
                  py-2
                  text-xs
                  font-semibold
                  text-gray-600
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-emerald-100
                  hover:bg-emerald-50
                  hover:text-emerald-600
                "
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!specialty && fields.length === 0 && (
        <div
          className="
            relative
            mt-6
            border-t
            border-gray-100
            pt-6
          "
        >
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-gray-200
              bg-gray-50
              px-4
              py-5
              text-center
            "
          >
            <p className="text-xs font-medium text-gray-400">
              اطلاعات تخصصی پزشک هنوز ثبت نشده است.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorBio;
