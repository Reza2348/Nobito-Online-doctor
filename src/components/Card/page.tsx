import React from "react";
import DoctorList from "@/components/DoctorList/page";

const Page = () => {
  return (
    <div className="my-4">
      {/* بخش عنوان و خط */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 w-full">
        {/* متن اصلی */}
        <p className="text-[#757575] text-xl sm:text-2xl font-bold flex-shrink-0">
          محبوبترین <span className="text-green-700">پزشکان</span> این ماه
        </p>

        {/* خط کوتاه */}
        <div className="flex-1 border-b border-gray-300"></div>

        {/* متن کنار خط */}
        <span className="text-green-700 text-sm cursor-pointer hover:underline flex-shrink-0">
          مشاهده همه
        </span>
      </div>

      {/* DoctorList زیر متن */}
      <DoctorList />
    </div>
  );
};

export default Page;
