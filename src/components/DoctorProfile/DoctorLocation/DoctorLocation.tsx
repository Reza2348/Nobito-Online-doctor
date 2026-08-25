"use client";

import React from "react";
import { Doctor } from "@/Types/types";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiNavigation } from "react-icons/fi";

interface Props {
  doctor: Doctor;
}

const DoctorLocation: React.FC<Props> = ({ doctor }) => (
  <div
    className="
    mt-10
    border-t
    border-gray-100
    pt-10
    "
  >
    <div
      dir="rtl"
      className="
      overflow-hidden
      rounded-4xl
      border
      border-gray-100
      bg-white
      p-6
      sm:p-8
      shadow-[0_12px_35px_rgba(0,0,0,.05)]
      "
    >
      {/* TITLE */}

      <div
        className="
        mb-7
        flex
        items-center
        gap-3
        "
      >
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-emerald-50
          text-emerald-600
          "
        >
          <FaMapMarkerAlt size={22} />
        </div>

        <div>
          <h2
            className="
            text-xl
            font-black
            text-gray-900
            "
          >
            موقعیت مکانی مطب
          </h2>

          <p
            className="
            mt-1
            text-xs
            text-gray-400
            "
          >
            آدرس و راه‌های ارتباط با پزشک
          </p>
        </div>
      </div>

      <div
        className="
        grid
        grid-cols-1
        gap-6
        lg:grid-cols-2
        "
      >
        {/* MAP */}

        <div
          className="
          group
          relative
          flex
          h-60
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-gray-100
          bg-gradient-to-br
          from-emerald-50
          to-teal-100
          "
        >
          <div
            className="
            absolute
            inset-0
            opacity-30
            "
          >
            <div
              className="
              absolute
              left-10
              top-10
              h-20
              w-20
              rounded-full
              bg-white
              blur-2xl
              "
            />
          </div>

          <div
            className="
            relative
            flex
            flex-col
            items-center
            "
          >
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-white
              text-emerald-500
              shadow-xl
              transition-transform
              duration-500
              group-hover:-translate-y-2
              "
            >
              <FaMapMarkerAlt size={32} />
            </div>

            <div
              className="
              mt-2
              h-2
              w-8
              rounded-full
              bg-black/10
              blur-sm
              "
            />
          </div>

          <button
            className="
            absolute
            bottom-5
            left-5
            right-5
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-white/90
            py-3
            text-xs
            font-bold
            text-gray-700
            shadow
            backdrop-blur
            transition-all
            hover:bg-emerald-600
            hover:text-white
            "
          >
            <FiNavigation />
            مشاهده روی نقشه
          </button>
        </div>

        {/* INFO */}

        <div
          className="
          flex
          flex-col
          gap-5
          "
        >
          {/* ADDRESS */}

          <div
            className="
            flex
            gap-4
            rounded-3xl
            border
            border-gray-100
            bg-gray-50/50
            p-5
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
              "
            >
              <FaMapMarkerAlt />
            </div>

            <div>
              <h3
                className="
                text-sm
                font-black
                text-gray-800
                "
              >
                آدرس مطب
              </h3>

              <p
                className="
                mt-2
                text-xs
                leading-7
                text-gray-500
                "
              >
                {doctor.address}
              </p>
            </div>
          </div>

          {/* PHONE */}

          <div
            className="
            flex
            gap-4
            rounded-3xl
            border
            border-gray-100
            bg-gray-50/50
            p-5
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
              bg-teal-50
              text-teal-600
              "
            >
              <FaPhone />
            </div>

            <div>
              <h3
                className="
                text-sm
                font-black
                text-gray-800
                "
              >
                شماره تماس
              </h3>

              <p
                dir="ltr"
                className="
                mt-2
                text-sm
                font-bold
                tracking-wider
                text-gray-500
                "
              >
                ۰۲۱-۸۳۹۳۷۸۴۸
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorLocation;
