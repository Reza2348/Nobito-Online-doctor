import { MdLocationOn, MdPsychology, MdSettings } from "react-icons/md";

interface ClinicInfoProps {
  clinicId: string;
  name?: string | null;
  specialty?: string | null;
  address?: string | null;
  fields: string[];
  formatNumber: (value: unknown) => string;
}

export default function ClinicInfo({
  clinicId,
  name,
  specialty,
  address,
  fields,
  formatNumber,
}: ClinicInfoProps) {
  return (
    <div
      className="
        min-w-0
        flex-1
        pt-1
      "
    >
      {/* Name */}
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            inline-flex
            items-center
            gap-1
            rounded-full
            border
            border-fuchsia-100
            bg-fuchsia-50
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-fuchsia-600
          "
        >
          مشاور
        </span>

        <h3
          className="
            truncate
            text-[15px]
            font-extrabold
            tracking-tight
            text-slate-800
            transition-colors
            group-hover:text-blue-700
          "
        >
          {name || "نام کلینیک ثبت نشده"}
        </h3>

        <MdSettings size={16} className="shrink-0 text-slate-400" />
      </div>

      {/* Specialty */}
      {specialty ? (
        <div
          className="
            mt-2
            flex
            items-center
            gap-1.5
            text-xs
            text-slate-500
          "
        >
          <span className="font-medium">تخصص:</span>

          <span className="truncate font-medium">{specialty}</span>

          <MdPsychology size={16} className="text-blue-500" />
        </div>
      ) : (
        <span
          className="
            mt-2
            block
            text-[11px]
            text-slate-400
          "
        >
          تخصص ثبت نشده
        </span>
      )}

      {/* Address */}
      <div
        className="
          mt-2
          flex
          items-center
          gap-1.5
          text-xs
          text-slate-500
        "
      >
        <span className="truncate">{address || "آدرس ثبت نشده"}</span>

        <MdLocationOn size={16} className="text-rose-500" />
      </div>

      {/* Fields */}
      {fields.length > 0 && (
        <div className="mt-4">
          <span
            className="
              mb-2
              block
              text-[11px]
              font-bold
              text-slate-400
            "
          >
            زمینه‌های تخصصی
          </span>

          <div
            className="
              flex
              flex-wrap
              gap-1.5
            "
          >
            {fields.slice(0, 6).map((field, index) => (
              <span
                key={`${clinicId}-${field}-${index}`}
                className="
                    inline-flex
                    items-center
                    rounded-lg
                    border
                    border-blue-100
                    bg-blue-50
                    px-2.5
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-blue-700
                  "
              >
                {field}
              </span>
            ))}

            {fields.length > 6 && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-lg
                  bg-slate-100
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-bold
                  text-slate-500
                "
              >
                +{formatNumber(fields.length - 6)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
