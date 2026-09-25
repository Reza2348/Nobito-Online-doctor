import { MdMedicalServices } from "react-icons/md";

interface Props {
  fields: unknown[];
  doctorId: string;
}

export default function DoctorFields({ fields, doctorId }: Props) {
  return (
    <div
      className="
        mt-6
        border-t
        border-slate-100
        pt-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-start
        "
      >
        <div
          className="
            flex shrink-0
            items-center
            gap-2
            text-xs
            font-extrabold
            text-slate-700
          "
        >
          <span
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-xl
              bg-teal-50
              text-teal-600
            "
          >
            <MdMedicalServices size={16} />
          </span>
          زمینه فعالیت
        </div>

        {fields.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <span
                key={`${doctorId}-${String(field)}-${index}`}
                className="
                  rounded-xl
                  bg-slate-100
                  px-3 py-1.5
                  text-[11px]
                  font-bold
                  text-slate-600
                  transition
                  hover:bg-teal-50
                  hover:text-teal-700
                "
              >
                {String(field)}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-slate-400">زمینه فعالیت ثبت نشده</span>
        )}
      </div>
    </div>
  );
}
