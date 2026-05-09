import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const Userexperience = () => {
  return (
    <div className="border-t mt-4 pt-8">
      <h2 className="text-4xl font-bold text-[#4a4a4a] text-right">
        تجربیات کاربران
      </h2>

      <p className="text-[#757575] mt-3 mb-3">
        در ادامه می‌توانید تجربه مراجعه‌ی کاربران دیگر به دکتر بهروز مقدادی را
        بخوانید.در صورتی که شما هم از بیماران دکتر بهروز مقدادی بوده‌اید
        می‌توانید نظر خود را ثبت کنید.
      </p>

      <div className="flex justify-end mt-10">
        <button
          type="button"
          className="flex items-center gap-2 bg-[#347469] hover:bg-[#2d645b] text-white px-6 py-3 rounded-xl transition-all"
        >
          ثبت بازخورد
          <FaArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
};

export default Userexperience;
