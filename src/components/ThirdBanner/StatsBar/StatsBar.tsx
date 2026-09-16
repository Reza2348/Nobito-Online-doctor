"use client";

import React from "react";
import {
  FiUsers,
  FiStar,
  FiCalendar,
  FiMapPin,
  FiShield,
} from "react-icons/fi";

const ACCENT = "#1F7168";
const BLOB = "#DCE9E6";

type StatItem = {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
};

const STATS: StatItem[] = [
  {
    id: "dentists",
    value: "+۲۵۰",
    label: "دندان‌پزشک متخصص",
    icon: <FiUsers />,
  },
  {
    id: "clinics",
    value: "+۸۰",
    label: "کلینیک دندان‌پزشکی",
    icon: <FiMapPin />,
  },
  {
    id: "appointments",
    value: "+۱۲K",
    label: "نوبت موفق",
    icon: <FiCalendar />,
  },
  {
    id: "rating",
    value: "۴.۹",
    label: "میانگین رضایت",
    icon: <FiStar />,
  },
  {
    id: "trust",
    value: "۹۸٪",
    label: "رضایت کاربران",
    icon: <FiShield />,
  },
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2v4M10 14v4M2 10h4M14 10h4"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-full"
      style={{ backgroundColor: BLOB }}
    >
      <Sparkle className="absolute -left-1 top-1 h-3 w-3" />
      <Sparkle className="absolute -right-1 bottom-2 h-3 w-3 rotate-45" />

      <div
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl"
        style={{ color: ACCENT }}
      >
        {children}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section dir="rtl" className="w-full bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid grid-cols-2 overflow-hidden rounded-[28px]
            border border-gray-100 bg-white
            shadow-[0_10px_40px_rgba(0,0,0,0.05)]
            sm:grid-cols-3
            lg:grid-cols-5
          "
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.id}
              className={`
                group relative flex min-h-43.75 flex-col
                items-center justify-center px-4 py-7 text-center
                transition-all duration-300
                hover:bg-[#F8FBFA]
                ${index !== STATS.length - 1 ? "border-b border-gray-100 lg:border-b-0 lg:border-l" : ""}
                ${index === 1 ? "sm:border-l" : ""}
                ${index === 3 ? "sm:border-l lg:border-l" : ""}
              `}
            >
              <StatIcon>{stat.icon}</StatIcon>

              <div
                className="
                  mt-4 text-2xl font-black tracking-tight
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                "
                style={{ color: ACCENT }}
              >
                {stat.value}
              </div>

              <div className="mt-1 text-xs font-medium text-gray-400 sm:text-sm">
                {stat.label}
              </div>

              <div
                className="
                  absolute bottom-0 left-1/2 h-0.5 w-0
                  -translate-x-1/2
                  transition-all duration-300
                  group-hover:w-12
                "
                style={{ backgroundColor: ACCENT }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
