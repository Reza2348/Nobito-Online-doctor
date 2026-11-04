import { MdBusiness, MdVerified } from "react-icons/md";

interface ClinicAvatarProps {
  photoUrl?: string | null;
  name?: string | null;
}

export default function ClinicAvatar({ photoUrl, name }: ClinicAvatarProps) {
  return (
    <div
      className="
        relative
        flex
        h-17
        w-17
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-surface
        shadow-sm
        transition-all
        duration-300
        group-hover:border-blue-200
        group-hover:shadow-sm
      "
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name || "تصویر کلینیک"}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
           
          "
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <MdBusiness size={32} className="text-blue-500" />
      )}

      <span
        title="کلینیک فعال"
        className="
          absolute
          bottom-1
          left-1
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          border-2
          border-white
          bg-emerald-500
          shadow-sm
        "
      >
        <MdVerified size={12} className="text-white" />
      </span>
    </div>
  );
}
