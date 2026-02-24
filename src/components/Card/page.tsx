import React from "react";
import DoctorList from "@/components/DoctorList/page";
import ConsultantsList from "@/components/ConsultantsList/page";

const Page = () => {
  return (
    <div className="my-4">
      {/* بخش عنوان و خط */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 w-full">
          {/* متن اصلی */}
          <p className="text-[#757575] text-xl sm:text-2xl font-bold shrink-0">
            محبوبترین <span className="text-green-700">پزشکان</span> این ماه
          </p>

          {/* خط کوتاه */}
          <div className="flex-1 border-b border-gray-300"></div>

          {/* متن کنار خط */}
          <span className="text-green-700 text-sm cursor-pointer hover:underline shrink-0">
            مشاهده همه
          </span>
        </div>
      </div>

      {/* DoctorList زیر متن */}
      <DoctorList />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 w-full">
          {/* متن اصلی */}
          <p className="text-[#757575] text-xl sm:text-2xl font-bold shrink-0">
            <span className="text-green-700">مشاورین</span> دردسترس
          </p>

          {/* خط کوتاه */}
          <div className="flex-1 border-b border-gray-300"></div>

          {/* متن کنار خط */}
          <span className="text-green-700 text-sm cursor-pointer hover:underline shrink-0">
            مشاهده همه
          </span>
        </div>

        {/* لیست کارت‌ها */}
        <ConsultantsList />
      </div>
    </div>
  );
};

export default Page;
