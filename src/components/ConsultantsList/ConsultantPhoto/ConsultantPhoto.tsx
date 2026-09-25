"use client";

import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

interface Props {
  name: string;
  photoUrl?: string | null;
}

const ConsultantPhoto: React.FC<Props> = ({ name, photoUrl }) => {
  return (
    <div className="relative">
      <div
        className="
        relative
        h-32
        w-32
        overflow-hidden
        rounded-full
        border-4
        border-white
        bg-gray-100
        shadow-xl
        "
      >
        <Image
          src={photoUrl || "/placeholder.jpg"}
          alt={name}
          fill
          sizes="128px"
          className="
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
          "
        />
      </div>

      <div
        className="
        absolute
        bottom-2
        right-2
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        border-2
        border-white
        bg-emerald-500
        text-white
        shadow
        "
      >
        <FiCheckCircle size={15} />
      </div>
    </div>
  );
};

export default ConsultantPhoto;
