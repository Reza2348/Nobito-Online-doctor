"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdPeople,
  MdMedicalServices,
  MdPsychology,
  MdLocalHospital,
  MdCalendarMonth,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";
import { IconType } from "react-icons";

interface DashboardCard {
  title: string;
  value: number;
  icon: IconType;
  href: string;
  color: string;
  glow: string;
  trend?: number; // درصد تغییر نسبت به دیروز؛ اختیاری
  updatedAt?: string; // ISO date string از سرور
}

const RAW_CARDS: Omit<DashboardCard, "trend" | "updatedAt">[] = [
  {
    title: "کاربران",
    value: 120,
    icon: MdPeople,
    href: "/admin/users",
    color: "from-teal-500 to-emerald-400",
    glow: "shadow-emerald-500/25",
  },
  {
    title: "پزشکان",
    value: 35,
    icon: MdMedicalServices,
    href: "/admin/doctors",
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/25",
  },
  {
    title: "مشاوران",
    value: 20,
    icon: MdPsychology,
    href: "/admin/consultants",
    color: "from-purple-500 to-indigo-400",
    glow: "shadow-purple-500/25",
  },
  {
    title: "کلینیک‌ها",
    value: 15,
    icon: MdLocalHospital,
    href: "/admin/clinics",
    color: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/25",
  },
  {
    title: "نوبت‌ها",
    value: 250,
    icon: MdCalendarMonth,
    href: "/admin/appointments",
    color: "from-pink-500 to-rose-400",
    glow: "shadow-pink-500/25",
  },
];

// شبیه‌سازی داده‌ی سرور — در پروژه‌ی واقعی این از API می‌آید
function useDashboardCards() {
  const [cards, setCards] = useState<DashboardCard[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) return;
      setCards(
        RAW_CARDS.map((c) => ({
          ...c,
          trend: Math.round((Math.random() * 20 - 6) * 10) / 10,
          updatedAt: new Date().toISOString(),
        })),
      );
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return cards;
}

function formatRelativeTime(iso?: string) {
  if (!iso) return "نامشخص";
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "همین الان";
  if (diffMin < 60) return `${diffMin} دقیقه پیش`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH} ساعت پیش`;
  return "بروزرسانی امروز";
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf: number;
    const duration = 700;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <>{display.toLocaleString("fa-IR")}</>;
}

function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6">
      <div className="mb-5 h-14 w-14 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-9 w-20 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

export default function DashboardHome() {
  const cards = useDashboardCards();

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <p className="mt-2 text-gray-500">خلاصه وضعیت سیستم مدیریت سلامت</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards === null
          ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((card) => {
              const Icon = card.icon;
              const isPositive = (card.trend ?? 0) >= 0;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="
                    group relative overflow-hidden rounded-3xl border
                    border-gray-100 bg-white p-6 shadow-sm transition-all
                    duration-300 hover:-translate-y-1 hover:shadow-xl
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-teal-500
                  "
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`
                        flex h-14 w-14 items-center justify-center
                        rounded-2xl bg-gradient-to-br ${card.color}
                        text-white shadow-lg ${card.glow}
                        transition group-hover:scale-110
                      `}
                    >
                      <Icon size={30} />
                    </div>

                    {card.trend !== undefined && (
                      <span
                        className={`
                          flex items-center gap-0.5 rounded-full px-2 py-1
                          text-xs font-bold
                          ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }
                        `}
                      >
                        {isPositive ? (
                          <MdArrowUpward size={13} />
                        ) : (
                          <MdArrowDownward size={13} />
                        )}
                        {Math.abs(card.trend)}٪
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-sm text-gray-500">{card.title}</h3>

                  <p className="mt-3 text-4xl font-bold text-gray-800">
                    <CountUp value={card.value} />
                  </p>

                  <span
                    className="
                      mt-4 inline-block rounded-full bg-teal-50 px-3 py-1
                      text-xs text-teal-600
                    "
                  >
                    {formatRelativeTime(card.updatedAt)}
                  </span>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
