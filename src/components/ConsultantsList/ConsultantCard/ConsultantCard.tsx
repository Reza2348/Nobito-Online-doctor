// components/ConsultantCard.tsx
"use client";

import { useRouter } from "next/navigation";
import type { Consultant } from "@/Types/types";
import { useConsultant } from "@/context/ConsultantsContext";

interface ConsultantCardProps {
  consultant: Consultant;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({
  consultant,
}) => {
  const { setConsultantId } = useConsultant();
  const router = useRouter();

  const handleClick = () => {
    setConsultantId(consultant.id); // ست کردن ID همان کارت
    router.push("/Consultants-Profile");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md border p-6 text-center relative hover:shadow-lg transition mt-[31px] mx-2 mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-center -mt-14 mb-3">
        <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
          <img
            src={consultant.photo_url ?? "/placeholder.jpg"}
            alt={consultant.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        <h2 className="text-lg font-bold">{consultant.name}</h2>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm text-gray-600 font-medium">
            {consultant.rating}
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-3">{consultant.specialty}</p>

      {consultant.fields && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {consultant.fields.map((field, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
            >
              {field}
            </span>
          ))}
        </div>
      )}

      <button className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
        دریافت نوبت
      </button>
    </div>
  );
};
