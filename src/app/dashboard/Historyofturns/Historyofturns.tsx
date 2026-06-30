import React, { useState } from "react";
import { FaPhoneAlt, FaVideo, FaUserMd } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { appointments } from "./Appointmentsdata";
import { AppointmentIconType } from "@/Types/types";

const tabs = ["جاری", "انجام شده", "لغو شده"];

const iconMap: Record<AppointmentIconType, React.ReactNode> = {
  phone: <FaPhoneAlt className="w-3.5 h-3.5" />,
  video: <FaVideo className="w-3.5 h-3.5" />,
  doctor: <FaUserMd className="w-3.5 h-3.5" />,
};

const Historyofturns = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      dir="rtl"
      className="w-full min-h-screen bg-[#F8F8F8] px-4 md:px-12 py-6 md:py-12 font-[Tahoma]"
    >
      <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        {/* هدر */}
        <div className="flex flex-col gap-3 px-4 md:px-8 pt-4 md:pt-6 border-b border-[#E4E4E4]">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            تاریخچه نوبت ها
          </h2>

          {/* تب‌ها */}
          <div className="flex items-center justify-start gap-5 md:gap-6">
            {tabs.map((t, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-sm md:text-base transition-all pb-3 md:pb-4 ${
                  activeTab === index
                    ? "text-[#1F7168] font-bold border-b-2 border-[#1F7168]"
                    : "text-[#919191]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* لیست نوبت‌ها */}
        <div className="px-4 md:px-8">
          {appointments.map((item) => (
            <div
              key={item.id}
              className="py-4 md:py-5 border-b border-[#E4E4E4] last:border-0"
            >
              {/* ردیف بالا: برچسب نوع نوبت + اطلاعات پزشک */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.doctorName}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0"
                  />
                  <div className="text-right">
                    <h3 className="text-[#414141] font-bold text-sm md:text-base">
                      {item.doctorName}
                    </h3>
                    <p className="text-[#919191] text-xs md:text-sm mt-0.5">
                      {item.specialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[#1F7168] text-xs md:text-sm">
                  {iconMap[item.iconType]}
                  {item.type}
                </div>
              </div>

              {/* نظر پزشک */}
              <p className="text-[#414141] text-xs md:text-sm mt-3 leading-6">
                <span className="font-bold">نظر پزشک : </span>
                {item.note}
              </p>

              {/* فوتر: تاریخ + جزئیات بیشتر */}
              <div className="flex justify-between items-center mt-3">
                <span className="text-[#919191] text-[11px] md:text-xs">
                  {item.date}
                </span>

                <button className="flex items-center gap-1 text-[#0683C9] text-xs md:text-sm">
                  <FaChevronDown className="w-3 h-3" />
                  جزئیات بیشتر
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Historyofturns;
