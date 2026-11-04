"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiMessageCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import ConsultationFeatures from "@/components/Consultation/ConsultationFeatures/ConsultationFeatures";
import ConsultationHeader from "@/components/Consultation/ConsultationHeader/ConsultationHeader";
import ConsultationTypes from "@/components/Consultation/ConsultationTypes/ConsultationTypes";
import DoctorVisual from "@/components/Consultation/DoctorVisual/DoctorVisual";


const OnlineConsultation = () => {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-surface py-20 sm:py-24"
    >
      {/* Background */}



      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <ConsultationHeader />

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-xl border border-line bg-white">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Content */}
            <div className="p-7 sm:p-10 lg:p-14">

              <h3 className="max-w-xl text-3xl font-black leading-[1.35] text-slate-900 sm:text-4xl">
                با پزشک مناسب،
                <span className="text-brand"> همین امروز صحبت کنید</span>
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
                تخصص موردنظر خود را انتخاب کنید، پزشک مناسب را پیدا کنید و در
                چند دقیقه مشاوره خود را شروع کنید.
              </p>

              {/* Consultation Types */}
              <ConsultationTypes />

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/AppointmentCard" className="group flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-bold text-white shadow-sm shadow-brand/20 transition-all duration-300 hover:bg-brand-strong">
                  <FiMessageCircle size={20} />
                  شروع مشاوره آنلاین
                  <FiArrowLeft
                    size={18}
                    className="transition-transform"
                  />
                </Link>

                <Link href="/AppointmentCard" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:border-brand-soft hover:bg-brand-soft">
                  <FiUsers size={19} />
                  مشاهده پزشکان
                </Link>
              </div>

              {/* Trust */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <FiShield size={15} className="text-emerald-500" />
                  ارتباط کاملاً امن
                </span>

                <span className="flex items-center gap-2">
                  <FiCheckCircle size={15} className="text-emerald-500" />
                  پزشکان تأیید شده
                </span>
              </div>
            </div>

            {/* Visual */}
            <DoctorVisual />
          </div>
        </div>

        {/* Features */}
        <ConsultationFeatures />
      </div>
    </section>
  );
};

export default OnlineConsultation;
