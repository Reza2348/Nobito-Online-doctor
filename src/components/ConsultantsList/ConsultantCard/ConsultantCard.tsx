"use client";

import { useRouter } from "next/navigation";
import type { Consultant } from "@/Types/types";
import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";

interface ConsultantCardProps {
  consultant: Consultant;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({
  consultant,
}) => {
  const { setConsultantId } = useConsultant();
  const router = useRouter();

  const handleClick = () => {
    setConsultantId(consultant.id);
    router.push("/Consultants-Profile");
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md border p-6 text-center relative 
                 hover:shadow-lg transition mt-8 mx-2 mb-4 cursor-pointer flex flex-col items-center"
      onClick={handleClick}
    >
      {/* عکس دایره‌ای */}
      <div className="flex justify-center -mt-16 mb-4">
        <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 transition-transform hover:scale-105">
          <img
            src={consultant.photo_url ?? "/placeholder.jpg"}
            alt={consultant.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* نام و امتیاز */}
      <div className="flex flex-col items-center gap-1 mb-2">
        <h2 className="text-lg font-bold text-black">{consultant.name}</h2>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm text-gray-600 font-medium">
            {consultant.rating}
          </span>
        </div>
      </div>

      {/* تخصص */}
      <p className="text-gray-500 text-sm mb-3">{consultant.specialty}</p>

      {/* زمینه‌ها */}
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

      {/* دکمه دریافت نوبت */}
      <button
        className="w-full sm:w-5/6 md:w-3/4 lg:w-3/5 xl:w-1/2 
                   border border-black text-black 
                   hover:bg-black hover:text-white 
                   px-6 py-2 rounded-full 
                   cursor-pointer transition-all duration-300"
      >
        دریافت نوبت
      </button>
    </div>
  );
};
