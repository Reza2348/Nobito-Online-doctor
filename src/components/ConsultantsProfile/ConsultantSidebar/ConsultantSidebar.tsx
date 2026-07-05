"use client";

import React from "react";
import { FaPhone, FaUserFriends, FaVideo, FaCommentDots } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ConsultationType = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
        active
          ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
          : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] font-bold ${active ? "text-teal-600" : "text-gray-400"}`}
    >
      {label}
    </span>
  </div>
);

export const ConsultantSidebar = () => {
  const router = useRouter();
  const [loadingItem, setLoadingItem] = React.useState<number | null>(null);

  const handleClick = (item: number): void => {
    if (loadingItem !== null) return;

    setLoadingItem(item);
    toast.success("نوبت شما با موفقیت ثبت شد ✅");

    setTimeout(() => {
      router.push("/Feedback/Feedback-Consultants");
      setLoadingItem(null);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-8">
      <ToastContainer position="top-center" rtl />
      <h2 className="text-lg font-bold text-center text-slate-800 mb-6">
        ملاقات با پزشک
      </h2>

      <div className="grid grid-cols-4 gap-2 mb-8">
        <ConsultationType icon={<FaPhone />} label="تلفنی" />
        <ConsultationType icon={<FaUserFriends />} label="حضوری" active />
        <ConsultationType icon={<FaVideo />} label="آنلاین" />
        <ConsultationType icon={<FaCommentDots />} label="متنی" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">مشاوره حضوری</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  نوبت خالی ، دوشنبه ۳ آذر (۱۴:۳۰)
                </p>
              </div>

              <span className="text-blue-500 text-xs font-bold cursor-pointer">
                راهنما
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleClick(item)}
                disabled={loadingItem !== null}
                className="bg-white border border-teal-500 text-teal-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-50"
              >
                {loadingItem === item ? "در حال ثبت..." : "نوبت بگیرید"}
              </button>
              <div className="text-right">
                <span className="text-lg font-black text-slate-800">
                  157,000
                </span>
                <span className="text-[10px] text-gray-400 mr-1">تومان</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
