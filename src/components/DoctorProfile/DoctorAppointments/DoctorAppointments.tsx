"use client";

import * as D from "@/Imports/DoctorListImports/DoctorListImports";

const DoctorAppointments: React.FC = () => (
  <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border border-gray-100 sticky top-8">
    <h3 className="text-xl font-bold mb-6 text-center text-gray-700">
      ملاقات با پزشک
    </h3>

    {/* انتخاب نوع مشاوره */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        { icon: <D.FaPhoneAlt size={16} />, label: "تلفنی" },
        { icon: <D.IoPersonOutline size={22} />, label: "حضوری", active: true },
        { icon: <D.MdOutlineScreenShare size={22} />, label: "آنلاین" },
        { icon: <D.IoChatbubbleEllipsesOutline size={22} />, label: "متنی" },
      ].map((item, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center justify-center py-4 rounded-2xl cursor-pointer transition-all w-full ${
            item.active
              ? "bg-[#2a7d73] text-white shadow-lg shadow-teal-100"
              : "bg-gray-50 text-gray-400 hover:border-gray-200"
          }`}
        >
          {item.icon}
          <span className="text-[11px] mt-2 font-medium">{item.label}</span>
        </div>
      ))}
    </div>

    {/* نوبت‌ها */}
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="mb-4 p-5 rounded-3xl border border-gray-100 bg-[#fbfbfb] w-full"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
            <D.IoPersonOutline size={20} className="text-gray-400" />
            مشاوره حضوری
          </div>
          <span className="text-[#00a6ff] text-xs font-bold cursor-pointer italic">
            راهنما
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-500 text-[11px] mb-6">
          <D.FaRegCalendarCheck size={14} />
          <span>نوبت خالی ، دوشنبه ۳ آذر (۱۴:۳۰)</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-dashed border-gray-200 gap-2">
          <button className="flex items-center gap-2 text-[#2a7d73] border border-[#2a7d73] px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-[#2a7d73] hover:text-white transition-all">
            <D.FaChevronLeft size={10} />
            نوبت بگیرید
          </button>
          <div className="text-left">
            <span className="text-xl font-black text-gray-800">157,000</span>
            <span className="text-[10px] text-gray-400 mr-1">تومان</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default DoctorAppointments;
