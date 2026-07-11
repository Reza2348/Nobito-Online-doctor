"use client";

import Image from "next/image";

interface ClinicsPhotoProps {
  name: string;
  photoUrl: string | null;
}

export default function ClinicsPhoto({ name, photoUrl }: ClinicsPhotoProps) {
  return (
    <div className="flex justify-center pt-6 pb-3">
      {photoUrl ? (
        <div className="relative w-62.5 h-38">
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="250px"
            className="rounded-md object-cover ring-4 ring-teal-50"
          />
        </div>
      ) : (
        <div className="w-62.5 h-38 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm ring-4 ring-teal-50">
          بدون عکس
        </div>
      )}
    </div>
  );
}
