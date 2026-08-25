"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { FaPhone, FaUserFriends, FaVideo, FaCommentDots } from "react-icons/fa";

import { FiClock, FiInfo, FiCheckCircle } from "react-icons/fi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { supabase } from "@/lib/supabaseClient";

interface ConsultantSidebarProps {
  consultantId: number | string;
}

interface ConsultationTypeProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const ConsultationType: React.FC<ConsultationTypeProps> = ({
  icon,
  label,
  active = false,
}) => {
  return (
    <div className="group flex flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
          active
            ? "bg-sky-600 text-white shadow-lg shadow-sky-200"
            : "bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500"
        }`}
      >
        {icon}
      </div>

      <span
        className={`text-[10px] font-bold transition-colors ${
          active ? "text-sky-600" : "text-slate-400 group-hover:text-sky-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

const ConsultantSidebar: React.FC<ConsultantSidebarProps> = ({
  consultantId,
}) => {
  const router = useRouter();

  const [loadingItem, setLoadingItem] = React.useState<number | null>(null);

  const handleClick = async (item: number) => {
    if (loadingItem !== null) return;

    try {
      // بررسی کاربر فعلی از Supabase
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log("CURRENT USER:", user);
      console.log("AUTH ERROR:", error);

      // کاربر وارد نشده
      if (error || !user) {
        toast.error("ابتدا وارد حساب کاربری شوید");

        const redirectUrl = `/Feedback/Feedback-consultant?consultantId=${encodeURIComponent(
          String(consultantId),
        )}`;

        setTimeout(() => {
          router.push(
            `/auth/signup?redirect=${encodeURIComponent(redirectUrl)}`,
          );
        }, 1200);

        return;
      }

      // کاربر وارد شده
      console.log("USER IS LOGGED IN:", user.id);

      setLoadingItem(item);

      // ------------------------------------
      // این قسمت فعلاً شبیه‌سازی رزرو است
      // ------------------------------------

      toast.success("نوبت شما با موفقیت ثبت شد ✅");

      const feedbackUrl = `/Feedback/Feedback-consultant?consultantId=${encodeURIComponent(
        String(consultantId),
      )}`;

      setTimeout(() => {
        router.push(feedbackUrl);
        setLoadingItem(null);
      }, 1200);
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);

      toast.error("خطا در بررسی وضعیت ورود کاربر");

      setLoadingItem(null);
    }
  };

  return (
    <aside
      dir="rtl"
      className="
        w-full rounded-3xl border border-slate-100
        bg-white p-5
        shadow-[0_12px_40px_rgba(15,23,42,0.06)]
        sm:p-6
      "
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-2xl bg-sky-50 text-sky-600
              ring-1 ring-sky-100
            "
          >
            <FaUserFriends size={18} />
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              رزرو وقت مشاوره
            </h2>

            <p className="mt-1 text-[11px] text-slate-400">
              نوع مشاوره خود را انتخاب کنید
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Types */}
      <div
        className="
          mb-7 grid grid-cols-4 gap-2
          rounded-3xl border border-slate-100
          bg-slate-50/70 p-3
        "
      >
        <ConsultationType icon={<FaPhone size={17} />} label="تلفنی" />

        <ConsultationType
          icon={<FaUserFriends size={17} />}
          label="حضوری"
          active
        />

        <ConsultationType icon={<FaVideo size={17} />} label="آنلاین" />

        <ConsultationType icon={<FaCommentDots size={17} />} label="متنی" />
      </div>

      {/* Appointments */}
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              group rounded-3xl border border-slate-100
              bg-white p-4
              transition-all duration-300
              hover:border-sky-100
              hover:bg-sky-50/20
              hover:shadow-md
            "
          >
            {/* Appointment Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0 text-right">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      flex h-8 w-8 shrink-0 items-center
                      justify-center rounded-xl
                      bg-sky-50 text-sky-600
                    "
                  >
                    <FiClock size={15} />
                  </span>

                  <div>
                    <p className="text-sm font-black text-slate-800">
                      مشاوره حضوری
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">نوبت خالی</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast.info("این نوبت برای مشاوره حضوری در نظر گرفته شده است.")
                }
                className="
                  inline-flex shrink-0 items-center gap-1
                  text-[10px] font-bold text-sky-500
                  transition-colors
                  hover:text-sky-700
                "
              >
                <FiInfo size={13} />
                راهنما
              </button>
            </div>

            {/* Date & Time */}
            <div
              className="
                mb-4 rounded-2xl border border-sky-100
                bg-sky-50/50 px-3 py-2.5 text-right
              "
            >
              <p className="text-[10px] text-slate-400">زمان پیشنهادی</p>

              <p className="mt-1 text-xs font-bold text-slate-700">
                دوشنبه ۳ آذر
                <span className="mx-1.5 text-slate-300">•</span>
                ساعت ۱۴:۳۰
              </p>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between gap-3">
              {/* Booking */}
              <button
                type="button"
                onClick={() => handleClick(item)}
                disabled={loadingItem !== null}
                className="
                  inline-flex min-w-27.5
                  items-center justify-center gap-2
                  rounded-2xl border border-sky-500
                  bg-white px-4 py-2.5
                  text-xs font-bold text-sky-600
                  transition-all duration-300
                  hover:bg-sky-600
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-sky-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loadingItem === item ? (
                  <>
                    <span
                      className="
                        h-3.5 w-3.5 animate-spin
                        rounded-full border-2
                        border-sky-200
                        border-t-sky-600
                      "
                    />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={14} />
                    نوبت بگیرید
                  </>
                )}
              </button>

              {/* Price */}
              <div className="text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black tracking-tight text-slate-900">
                    ۱۵۷,۰۰۰
                  </span>

                  <span className="text-[10px] font-medium text-slate-400">
                    تومان
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-slate-400">هزینه مشاوره</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </aside>
  );
};

export default ConsultantSidebar;
