"use client";

import React from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMessageCircle,
  FiPhoneCall,
  FiPlay,
  FiShield,
  FiStar,
  FiVideo,
  FiUsers,
} from "react-icons/fi";

interface ConsultationType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OnlineConsultationProps {
  doctorsOnline?: number;
  responseTime?: string;
}

const consultationTypes: ConsultationType[] = [
  {
    icon: <FiVideo size={22} />,
    title: "مشاوره تصویری",
    description: "ارتباط مستقیم و امن با پزشک",
  },
  {
    icon: <FiMessageCircle size={22} />,
    title: "مشاوره متنی",
    description: "ارسال پیام و دریافت پاسخ",
  },
  {
    icon: <FiPhoneCall size={22} />,
    title: "مشاوره تلفنی",
    description: "تماس با پزشک در زمان رزرو",
  },
];

const OnlineConsultation: React.FC<OnlineConsultationProps> = ({
  doctorsOnline = 38,
  responseTime = "کمتر از ۱۰ دقیقه",
}) => {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#f5fbff] py-20 sm:py-24"
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute right-1/2 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-100/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {doctorsOnline.toLocaleString("fa-IR")} پزشک آنلاین
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            هر زمان که به پزشک نیاز دارید،
            <span className="block text-cyan-600">ما اینجا هستیم</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            بدون نیاز به مراجعه حضوری، با پزشک متخصص موردنظر خود به‌صورت آنلاین
            مشورت کنید و پاسخ سؤالات پزشکی خود را دریافت کنید.
          </p>
        </div>

        {/* ================= MAIN CARD ================= */}

        <div className="relative overflow-hidden rounded-[36px] border border-white bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* ================= LEFT CONTENT ================= */}

            <div className="p-7 sm:p-10 lg:p-14">
              {/* Live Status */}

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

              {/* ================= CONSULTATION TYPES ================= */}

              <div className="mt-8 space-y-3">
                {consultationTypes.map((item) => (
                  <div
                    key={item.title}
                    className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:border-cyan-100 hover:bg-cyan-50/50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm transition group-hover:bg-cyan-600 group-hover:text-white">
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{item.title}</h4>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <FiArrowLeft
                      size={18}
                      className="text-slate-300 transition group-hover:-translate-x-1 group-hover:text-cyan-600"
                    />
                  </div>
                ))}
              </div>

              {/* ================= CTA ================= */}

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

              {/* ================= TRUST ================= */}

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

            {/* ================= RIGHT VISUAL ================= */}

            <div className="relative min-h-[520px] overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50">
              {/* Decorative circles */}

              <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-cyan-200/30 blur-2xl" />

              <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl" />

              {/* Doctor Image */}

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md">
                  <div className="overflow-hidden rounded-[32px] border-8 border-white shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85"
                      alt="پزشک برای مشاوره آنلاین"
                      className="h-[430px] w-full object-cover"
                    />
                  </div>

                  {/* Online Badge */}

                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-xl backdrop-blur">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                    آنلاین
                  </div>

                  {/* Doctor Card */}

                  <div className="absolute -bottom-6 right-5 left-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-2xl backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-cyan-100">
                        <img
                          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80"
                          alt="پروفایل پزشک"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-black text-slate-900">
                          دکتر امیر رضایی
                        </h4>

                        <p className="text-xs text-slate-500">متخصص داخلی</p>
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <FiStar
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />

                          <span className="text-sm font-black">4.9</span>
                        </div>

                        <p className="mt-1 text-[10px] text-slate-400">
                          ۳۸۲ نظر
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= FLOATING CARD ================= */}

              <div className="absolute left-5 top-16 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FiClock size={19} />
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400">زمان انتظار</p>

                    <p className="text-sm font-black text-slate-800">
                      {responseTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= VIDEO BUTTON ================= */}

              <button
                type="button"
                aria-label="شروع مشاوره تصویری"
                className="absolute bottom-24 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-600/30 transition hover:scale-105 hover:bg-cyan-700"
              >
                <FiPlay size={20} className="mr-0.5 fill-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM FEATURES ================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<FiUsers size={19} />}
            title="پزشکان متخصص"
            description="انتخاب از میان پزشکان تأیید شده"
          />

          <Feature
            icon={<FiClock size={19} />}
            title="پاسخ سریع"
            description="شروع مشاوره در کوتاه‌ترین زمان"
          />

          <Feature
            icon={<FiShield size={19} />}
            title="حریم خصوصی"
            description="محافظت از اطلاعات پزشکی شما"
          />

          <Feature
            icon={<FiCalendar size={19} />}
            title="رزرو آسان"
            description="انتخاب زمان مناسب برای شما"
          />
        </div>
      </div>
    </section>
  );
};

/* ==================================================
   Feature Component
================================================== */

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        {icon}
      </div>

      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>

        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </div>
  );
};

export default OnlineConsultation;
