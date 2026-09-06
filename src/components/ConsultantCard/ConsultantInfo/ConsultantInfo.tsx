import { MdLocationOn, MdPsychology } from "react-icons/md";

interface ConsultantInfoProps {
  name?: string | null;
  specialty?: string | null;
  address?: string | null;
  fields: string[];
}

export default function ConsultantInfo({
  name,
  specialty,
  address,
  fields,
}: ConsultantInfoProps) {
  return (
    <div className="min-w-0 flex-1">
      {/* نام */}
      <div
        className="
          mb-3
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        <MdPsychology
          className="
            shrink-0
            text-purple-600
          "
          size={23}
        />

        <h3
          className="
            truncate
            text-xl
            font-extrabold
            text-slate-900
          "
        >
          {name || "نام مشاور ثبت نشده"}
        </h3>

        <span
          className="
            rounded-full
            bg-purple-50
            px-2.5
            py-1
            text-xs
            font-bold
            text-purple-700
          "
        >
          مشاور
        </span>
      </div>

      {/* تخصص */}
      <div
        className="
          mb-3
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
        "
      >
        <span
          className="
            font-bold
            text-slate-800
          "
        >
          تخصص:
        </span>

        <span>{specialty || "ثبت نشده"}</span>
      </div>

      {/* آدرس */}
      <div
        className="
          mb-4
          flex
          items-start
          gap-2
          text-sm
          text-slate-500
        "
      >
        <MdLocationOn
          className="
            mt-0.5
            shrink-0
            text-red-500
          "
          size={20}
        />

        <span
          className="
            leading-6
          "
        >
          {address || "آدرس ثبت نشده"}
        </span>
      </div>

      {/* زمینه‌های تخصصی */}
      <div>
        <div
          className="
            mb-2
            text-sm
            font-bold
            text-slate-700
          "
        >
          زمینه‌های تخصصی
        </div>

        {fields.length > 0 ? (
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {fields.map((field, index) => (
              <span
                key={`${field}-${index}`}
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-purple-100
                  bg-purple-50
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-purple-700
                  transition
                  hover:border-purple-200
                  hover:bg-purple-100
                "
              >
                {field}
              </span>
            ))}
          </div>
        ) : (
          <span
            className="
              text-sm
              text-slate-400
            "
          >
            ثبت نشده
          </span>
        )}
      </div>
    </div>
  );
}
