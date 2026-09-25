import { FiCheckCircle } from "react-icons/fi";

import ClinicsPhoto from "@/components/Clinics/ClinicsPhoto/ClinicsPhoto";
import ClinicsRating from "@/components/Clinics/ClinicsRating/ClinicsRating";

interface Props {
  name: string;
  photoUrl: string | null;
  rating: number | null;
}

export default function ClinicsImageSection({ name, photoUrl, rating }: Props) {
  return (
    <div className="relative h-64 shrink-0 overflow-hidden">
      <div className="transition-transform duration-700 group-hover:scale-105">
        <ClinicsPhoto name={name} photoUrl={photoUrl} />
      </div>

      <div
        className="
          absolute
          inset-0
         bg-linear-to-t
          from-black/30
          via-transparent
          to-transparent
          "
      />

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
      <div
        className="
          absolute
          bottom-4
          left-4
          rounded-full
          bg-white/95
          px-3
          py-1.5
          shadow
          "
      >
        <ClinicsRating rating={rating ?? undefined} />
      </div>
    </div>
  );
}
