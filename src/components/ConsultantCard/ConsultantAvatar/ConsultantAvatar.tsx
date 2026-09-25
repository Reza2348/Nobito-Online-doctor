import { MdPsychology, MdVerified } from "react-icons/md";

interface ConsultantAvatarProps {
  photoUrl?: string | null;
  name?: string | null;
}

export default function ConsultantAvatar({
  photoUrl,
  name,
}: ConsultantAvatarProps) {
  return (
    <div
      className="
        relative
        h-20
        w-20
        shrink-0
        overflow-hidden
        rounded-3xl
        border
        border-purple-100
        bg-linear-to-br
        from-purple-50
        to-fuchsia-50
        shadow-sm
        sm:h-24
        sm:w-24
        xl:h-28
        xl:w-28
      "
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name || "مشاور"}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            text-purple-300
          "
        >
          <MdPsychology size={36} className="sm:hidden" />
          <MdPsychology size={44} className="hidden sm:block xl:hidden" />
          <MdPsychology size={52} className="hidden xl:block" />
        </div>
      )}

      <div
        className="
          absolute
          bottom-1.5
          right-1.5
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-white
          text-purple-600
          shadow-md
          sm:bottom-2
          sm:right-2
          sm:h-7
          sm:w-7
        "
        title="مشاور"
      >
        <MdVerified size={14} className="sm:hidden" />
        <MdVerified size={18} className="hidden sm:block" />
      </div>
    </div>
  );
}
