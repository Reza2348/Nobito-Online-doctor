import React from "react";

interface Props {
  name: string;
  photoUrl: string | null;
}

const DoctorPhoto: React.FC<Props> = ({ name, photoUrl }) => {
  return (
    <div className="flex justify-center pt-6 pb-3">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-62.5 h-38 rounded-md object-cover ring-4 ring-teal-50"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm ring-4 ring-teal-50">
          بدون عکس
        </div>
      )}
    </div>
  );
};

export default DoctorPhoto;
