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
        h-28
        w-28
        shrink-0
        overflow-hidden
        rounded-3xl
        border
        border-purple-100
        bg-linear-to-br
        from-purple-50
        to-fuchsia-50
        shadow-sm
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
          <MdPsychology size={52} />
        </div>
      )}

      <div
        className="
          absolute
          bottom-2
          right-2
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-white
          text-purple-600
          shadow-md
        "
        title="مشاور"
      >
        <MdVerified size={18} />
      </div>
    </div>
  );
}
