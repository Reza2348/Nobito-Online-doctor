"use client";

import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMessageCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import ConsultationFeatures from "@/components/Consultation/ConsultationFeatures/ConsultationFeatures";
import ConsultationHeader from "@/components/Consultation/ConsultationHeader/ConsultationHeader";
import ConsultationTypes from "@/components/Consultation/ConsultationTypes/ConsultationTypes";
import DoctorVisual from "@/components/Consultation/DoctorVisual/DoctorVisual";

import type { OnlineConsultationProps } from "@/Types/types";

const OnlineConsultation = ({
  doctorsOnline = 38,
  responseTime = "کمتر از ۱۰ دقیقه",
}: OnlineConsultationProps) => {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#f5fbff] py-20 sm:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute right-1/2 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <ConsultationHeader doctorsOnline={doctorsOnline} />

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[36px] border border-white bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Content */}
            <div className="p-7 sm:p-10 lg:p-14">
              {/* Status */}
              <div className="mb-7 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                <FiCheckCircle size={17} />
                سرویس مشاوره آنلاین فعال است
              </div>

              <h3 className="max-w-xl text-3xl font-black leading-[1.35] text-slate-900 sm:text-4xl">
                با پزشک مناسب،
                <span className="text-cyan-600"> همین امروز صحبت کنید</span>
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
                تخصص موردنظر خود را انتخاب کنید، پزشک مناسب را پیدا کنید و در
                چند دقیقه مشاوره خود را شروع کنید.
              </p>

              {/* Consultation Types */}
              <ConsultationTypes />

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-7 py-4 font-bold text-white shadow-xl shadow-cyan-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-700"
                >
                  <FiMessageCircle size={20} />
                  شروع مشاوره آنلاین
                  <FiArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50"
                >
                  <FiUsers size={19} />
                  مشاهده پزشکان
                </button>
              </div>

              {/* Trust */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <FiShield size={15} className="text-emerald-500" />
                  ارتباط کاملاً امن
                </span>

                <span className="flex items-center gap-2">
                  <FiClock size={15} className="text-cyan-500" />
                  پاسخ {responseTime}
                </span>

                <span className="flex items-center gap-2">
                  <FiCheckCircle size={15} className="text-emerald-500" />
                  پزشکان تأیید شده
                </span>
              </div>
            </div>

            {/* Visual */}
            <DoctorVisual responseTime={responseTime} />
          </div>
        </div>

        {/* Features */}
        <ConsultationFeatures />
      </div>
    </section>
  );
};

export default OnlineConsultation;
