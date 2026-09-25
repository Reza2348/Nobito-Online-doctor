import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  photoUrl: string | null;
}

const DoctorPhoto: React.FC<Props> = ({ name, photoUrl }) => {
  return (
    <div className="flex justify-center pt-6 pb-3">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={250}
          height={152}
          className="w-62.5 h-38] rounded-md object-cover ring-4 ring-teal-50"
        />
      ) : (
        <div className="w-62.5 h-38 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm ring-4 ring-teal-50">
          بدون عکس
        </div>
      )}
    </div>
  );
};

export default DoctorPhoto;
