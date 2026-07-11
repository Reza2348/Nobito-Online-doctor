"use client";

import React from "react";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";
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
  <div className="flex flex-col items-center gap-2 group cursor-pointer flex-1">
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
      className={`text-[10px] font-bold ${
        active ? "text-[#2a7d73]" : "text-gray-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const DoctorAppointments: React.FC = () => {
  const router = useRouter();
  const [loadingItem, setLoadingItem] = React.useState<number | null>(null);

  // بررسی وضعیت ورود کاربر
  const isUserLoggedIn = (): boolean => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token"); // اگر نام کلید توکن شما فرق دارد، اینجا تغییر دهید
    return !!token;
  };

  const handleClick = (item: number) => {
    if (loadingItem !== null) return;

    // پالیسی: اگر کاربر لاگین نکرده باشد، اجازه‌ی گرفتن نوبت داده نمی‌شود
    if (!isUserLoggedIn()) {
      toast.error(
        "برای گرفتن نوبت ابتدا باید وارد حساب کاربری خود شوید یا ثبت‌نام کنید ⚠️",
        { autoClose: 3000 },
      );

      // کمی صبر می‌کنیم تا کاربر پیام را ببیند، بعد به صفحه‌ی ورود هدایت می‌شود
      setTimeout(() => {
        router.push("/auth/signup"); // مسیر صفحه‌ی ورود/ثبت‌نام خودتان را اینجا قرار دهید
      }, 1800);

      return;
    }

    setLoadingItem(item);
    toast.success("نوبت شما با موفقیت ثبت شد ✅");

    setTimeout(() => {
      router.push("/Feedback/Feedback-doctor");
      setLoadingItem(null);
    }, 3000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        style={{ zIndex: 999999 }}
      />

      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-8">
        <h3 className="text-lg font-bold text-center text-gray-700 mb-6">
          ملاقات با پزشک
        </h3>

        <div className="flex justify-between gap-2 mb-8">
          <ConsultationType icon={<D.FaPhone size={18} />} label="تلفنی" />
          <ConsultationType
            icon={<D.IoPersonOutline size={22} />}
            label="حضوری"
            active
          />
          <ConsultationType
            icon={<D.MdOutlineScreenShare size={22} />}
            label="آنلاین"
          />
          <ConsultationType
            icon={<D.IoChatbubbleEllipsesOutline size={22} />}
            label="متنی"
          />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-gray-100 rounded-2xl p-4 bg-[#fbfbfb]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-gray-700 font-bold text-sm">
                    مشاوره حضوری
                    <D.IoPersonOutline size={16} className="text-gray-400" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1" dir="rtl">
                    نوبت خالی، دوشنبه ۳ آذر (۱۴:۳۰)
                  </p>
                </div>
                <span className="text-blue-500 text-[10px] font-bold cursor-pointer italic">
                  راهنما
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
                <button
                  type="button"
                  onClick={() => handleClick(item)}
                  disabled={loadingItem !== null}
                  className="bg-white border border-teal-500 text-teal-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-50"
                >
                  {loadingItem === item ? "در حال ثبت..." : "نوبت بگیرید"}
                </button>

                <div className="text-left">
                  <span className="text-lg font-black text-gray-800">
                    157,000
                  </span>
                  <span className="text-[10px] text-gray-400 mr-1">تومان</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;
