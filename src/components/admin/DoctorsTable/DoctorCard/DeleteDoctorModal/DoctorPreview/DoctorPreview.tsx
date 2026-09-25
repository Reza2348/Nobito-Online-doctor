import { MdArrowBackIosNew, MdMedicalServices } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

interface Props {
  doctor: AdminDoctor;
}

export default function DoctorPreview({ doctor }: Props) {
  return (
    <div className="px-6 pt-5">
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-100
          bg-slate-50
          p-3
        "
      >
        <div
          className="
            h-12
            w-12
            shrink-0
            overflow-hidden
            rounded-xl
            bg-white
            ring-1
            ring-slate-200
          "
        >
          {doctor.photo_url ? (
            <img
              src={doctor.photo_url}
              alt={doctor.name || "پزشک"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <MdMedicalServices size={22} />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-800">
            {doctor.name || "پزشک انتخاب‌شده"}
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-400">
            {doctor.specialty || "تخصص ثبت نشده"}
          </p>
        </div>

        <MdArrowBackIosNew
          size={15}
          className="mr-auto rotate-180 text-slate-300"
        />
      </div>
    </div>
  );
}
