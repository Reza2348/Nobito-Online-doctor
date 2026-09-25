import {
  MdLocationOn,
  MdMedicalServices,
  MdPhone,
  MdVerified,
} from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

interface Props {
  doctor: AdminDoctor;
}

export default function DoctorHeader({ doctor }: Props) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      {/* Avatar */}
      <div
        className="
          relative shrink-0
          h-19.5 w-19.5
          overflow-hidden
          rounded-3xl
          bg-slate-100
          ring-1 ring-slate-200
          shadow-sm
          sm:h-22 sm:w-22
        "
      >
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={doctor.name || "پزشک"}
            className="
              h-full w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full w-full
              items-center justify-center
             bg-linear-to-br
              from-slate-100
              to-slate-200
              text-slate-400
            "
          >
            <MdMedicalServices size={34} />
          </div>
        )}

        <span
          className="
            absolute
            bottom-1.5 right-1.5
            h-3.5 w-3.5
            rounded-full
            border-[3px]
            border-white
            bg-emerald-500
            shadow-sm
          "
        />
      </div>

      {/* Information */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className="
              max-w-62.5
              truncate
              text-lg
              font-black
              tracking-tight
              text-slate-900
              sm:text-xl
            "
          >
            {doctor.name || "نام پزشک ثبت نشده"}
          </h3>

          <span
            className="
              inline-flex
              items-center gap-1
              rounded-full
              bg-emerald-50
              px-2.5 py-1
              text-[10px]
              font-extrabold
              text-emerald-700
            "
          >
            <MdVerified size={13} />
            تأیید شده
          </span>
        </div>

        <p
          className="
            mt-1.5
            text-sm
            font-semibold
            text-slate-500
          "
        >
          {doctor.specialty || "تخصص ثبت نشده"}
        </p>

        {/* Contact */}
        <div
          className="
            mt-3
            flex flex-wrap
            items-center
            gap-x-4
            gap-y-2
            text-xs
            text-slate-500
          "
        >
          <span className="inline-flex items-center gap-1.5">
            <MdPhone size={16} className="text-teal-500" />

            {doctor.phone || "شماره ثبت نشده"}
          </span>

          <span
            className="
              hidden
              h-1 w-1
              rounded-full
              bg-slate-300
              sm:block
            "
          />

          <span
            className="
              inline-flex
              min-w-0
              items-center
              gap-1.5
            "
          >
            <MdLocationOn size={16} className="shrink-0 text-rose-500" />

            <span className="max-w-75 truncate">
              {doctor.address || "آدرس ثبت نشده"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
