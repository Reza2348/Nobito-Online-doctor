import { MdBusiness } from "react-icons/md";

interface Props {
  name?: string | null;
  specialty?: string | null;
  photoUrl?: string | null;
}

export default function ClinicPreview({ name, specialty, photoUrl }: Props) {
  return (
    <div
      className="
        mt-5
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
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          bg-white
          shadow-sm
        "
      >
        {photoUrl ? (
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <MdBusiness size={23} className="text-blue-500" />
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-slate-800">
          {name || "کلینیک بدون نام"}
        </p>

        {specialty && (
          <p className="mt-0.5 truncate text-[11px] text-slate-400">
            {specialty}
          </p>
        )}
      </div>
    </div>
  );
}
