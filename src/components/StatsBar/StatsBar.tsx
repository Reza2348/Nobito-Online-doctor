"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserMd,
  FaStethoscope,
  FaCalendarCheck,
  FaHospital,
} from "react-icons/fa";

type Stats = {
  doctors: number | null;
  consultants: number | null;
  clinics: number | null;
  appointments: number | null;
};

const ITEMS: { key: keyof Stats; label: string; icon: React.ReactNode }[] = [
  { key: "doctors", label: "پزشک ثبت‌شده", icon: <FaUserMd /> },
  { key: "consultants", label: "مشاور ثبت‌شده", icon: <FaStethoscope /> },
  { key: "appointments", label: "نوبت فعال", icon: <FaCalendarCheck /> },
  { key: "clinics", label: "کلینیک و مرکز درمانی", icon: <FaHospital /> },
];

async function fetchStats(): Promise<Stats> {
  const response = await fetch("/api/stats");

  if (!response.ok) {
    throw new Error("stats unavailable");
  }

  return response.json();
}

function formatCount(value: number | null | undefined): string {
  // هیچ‌وقت عدد ساختگی نشان داده نمی‌شود
  return typeof value === "number" ? value.toLocaleString("fa-IR") : "—";
}

export default function StatsSection() {
  const { data } = useQuery({
    queryKey: ["public-stats"],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const stats = ITEMS.map((item) => ({
    ...item,
    value: formatCount(data?.[item.key]),
  }));

  return (
    <section
      dir="rtl"
      className="relative bg-gray-50 overflow-hidden py-12 px-4"
      style={{ fontFamily: "inherit" }}
    >
      <div className="w-full h-3 bg-emerald-500 rounded-b-lg"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-sm"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl mb-4 transition group-hover:bg-emerald-200">
              {stat.icon}
            </div>

            <span className="text-2xl md:text-3xl font-bold text-gray-800">
              {stat.value}
            </span>

            <span className="text-gray-500 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-3 bg-emerald-500 rounded-t-lg mt-10"></div>
    </section>
  );
}
