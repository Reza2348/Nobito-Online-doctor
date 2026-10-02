import Image from "next/image";

import { FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface ClinicsImageSectionProps {
  image?: string | null;
  alt?: string;
  rating?: number;
}

export default function ClinicsImageSection({
  image,
  alt = "Clinic",
  rating,
}: ClinicsImageSectionProps) {
  const imageSrc =
    image && image.trim().length > 0 ? image : "/images/clinic-placeholder.jpg";

  return (
    <div className="relative h-56 w-full shrink-0 overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt || "Clinic"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

      {/* Verified */}
      <div
        className="
          absolute
          right-4
          top-4
          flex
          items-center
          gap-1
          rounded-full
          bg-white/90
          px-3
          py-1.5
          text-xs
          font-bold
          text-emerald-600
          shadow
          backdrop-blur
        "
      >
        <FiCheckCircle size={14} />
        کلینیک معتبر
      </div>

      {/* Rating */}
      {typeof rating === "number" && rating > 0 && (
        <div
          className="
            absolute
            bottom-4
            left-4
            flex
            items-center
            gap-1
            rounded-full
            bg-white/95
            px-3
            py-1.5
            text-sm
            font-bold
            text-gray-800
            shadow
          "
        >
          <FaStar className="text-yellow-500" />
          {rating}
        </div>
      )}
    </div>
  );
}
