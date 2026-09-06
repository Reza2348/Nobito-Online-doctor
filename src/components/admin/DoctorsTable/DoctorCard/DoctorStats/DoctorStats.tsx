import { MdGroups, MdStar, MdVerified } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

import {
  formatNumber,
  formatRating,
  safeNumber,
} from "@/components/admin/DoctorsTable/DoctorCard/utils/doctor-card.utils";

interface Props {
  doctor: AdminDoctor;
}

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  iconClassName: string;
  containerClassName: string;
  children?: React.ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClassName,
  containerClassName,
  children,
}: StatCardProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[22px]
        border
        p-5
        ${containerClassName}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-400">{title}</p>

          <p
            className="
              mt-1
              text-2xl
              font-black
              text-slate-900
            "
          >
            {value}
          </p>

          {description && (
            <p
              className="
                mt-1
                text-[10px]
                font-semibold
                text-slate-400
              "
            >
              {description}
            </p>
          )}
        </div>

        <div
          className={`
            flex h-12 w-12
            shrink-0
            items-center justify-center
            rounded-2xl
            ${iconClassName}
          `}
        >
          {icon}
        </div>
      </div>

      {children}
    </div>
  );
}

export default function DoctorStats({ doctor }: Props) {
  const rating = safeNumber(doctor.rating);

  const patientsSatisfied = safeNumber(doctor.patients_satisfied);

  return (
    <div
      className="
        mt-7
        grid
        grid-cols-1
        gap-3
        md:grid-cols-3
      "
    >
      {/* Rating */}
      <StatCard
        title="امتیاز پزشک"
        value={formatRating(rating)}
        icon={<MdStar size={25} />}
        iconClassName="bg-amber-100 text-amber-500"
        containerClassName="
          border-amber-100
          bg-gradient-to-br
          from-amber-50
          via-white
          to-white
        "
      >
        {rating !== null && (
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdStar
                key={star}
                size={15}
                className={star <= rating ? "text-amber-400" : "text-slate-200"}
              />
            ))}
          </div>
        )}
      </StatCard>

      {/* Patients */}
      <StatCard
        title="بیماران راضی"
        value={formatNumber(patientsSatisfied)}
        description="تعداد بیماران رضایت‌مند"
        icon={<MdGroups size={25} />}
        iconClassName="bg-blue-100 text-blue-600"
        containerClassName="
          border-blue-100
          bg-gradient-to-br
          from-blue-50
          via-white
          to-white
        "
      />

      {/* Satisfaction */}
      <StatCard
        title="میزان رضایت"
        value={
          patientsSatisfied !== null
            ? formatNumber(patientsSatisfied)
            : "ثبت نشده"
        }
        description="بیمار رضایت‌مند"
        icon={<MdVerified size={25} />}
        iconClassName="bg-teal-100 text-teal-600"
        containerClassName="
          border-teal-100
          bg-gradient-to-br
          from-teal-50
          via-white
          to-white
        "
      >
        {patientsSatisfied !== null && patientsSatisfied > 0 && (
          <div
            className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                bg-slate-200
              "
          >
            <div
              className="
                  h-full
                  w-full
                  rounded-full
                 bg-linear-to-l
                  from-teal-500
                  to-cyan-400
                "
            />
          </div>
        )}
      </StatCard>
    </div>
  );
}
