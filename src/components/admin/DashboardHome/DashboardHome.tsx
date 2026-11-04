"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdPeople,
  MdMedicalServices,
  MdPsychology,
  MdLocalHospital,
  MdCalendarMonth,
} from "react-icons/md";
import { IconType } from "react-icons";

interface DashboardCard {
  key: keyof AdminStats;
  title: string;
  icon: IconType;
  /** فقط صفحه‌هایی که واقعاً مسیر دارند لینک می‌شوند */
  href?: string;
  color: string;
  glow: string;
}

interface AdminStats {
  users: number | null;
  doctors: number | null;
  consultants: number | null;
  clinics: number | null;
  appointments: number | null;
  updatedAt: string;
}

const CARDS: DashboardCard[] = [
  {
    key: "users",
    title: "کاربران",
    icon: MdPeople,
    href: "/Admin/users",
    color: "from-teal-500 to-emerald-400",
    glow: "shadow-emerald-500/25",
  },
  {
    key: "doctors",
    title: "پزشکان",
    icon: MdMedicalServices,
    color: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/25",
  },
  {
    key: "consultants",
    title: "مشاوران",
    icon: MdPsychology,
    color: "from-purple-500 to-indigo-400",
    glow: "shadow-purple-500/25",
  },
  {
    key: "clinics",
    title: "کلینیک‌ها",
    icon: MdLocalHospital,
    color: "from-orange-500 to-amber-400",
    glow: "shadow-orange-500/25",
  },
  {
    key: "appointments",
    title: "نوبت‌های فعال",
    icon: MdCalendarMonth,
    color: "from-pink-500 to-rose-400",
    glow: "shadow-pink-500/25",
  },
];

type StatsState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; stats: AdminStats };

/** آمار واقعی از /api/admin/stats */
function useDashboardStats(): StatsState {
  const [state, setState] = useState<StatsState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/admin/stats", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("stats failed");

        setState({ status: "ready", stats: await response.json() });
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== "AbortError") {
          setState({ status: "error" });
        }
      });

    return () => controller.abort();
  }, []);

  return state;
}

function formatUpdatedAt(iso?: string) {
  if (!iso) return "نامشخص";

  return new Date(iso).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-5 h-14 w-14 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-9 w-20 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

export default function DashboardHome() {
  const state = useDashboardStats();

  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <p className="mt-2 text-gray-500">خلاصه وضعیت سیستم مدیریت سلامت</p>
      </div>

      {state.status === "error" && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          دریافت آمار ناموفق بود. صفحه را دوباره بارگذاری کنید.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {state.status === "loading"
          ? CARDS.map((card) => <CardSkeleton key={card.key} />)
          : CARDS.map((card) => {
              const Icon = card.icon;
              const value =
                state.status === "ready" ? state.stats[card.key] : null;

              const className = `
                group relative block overflow-hidden rounded-xl border
                border-gray-100 bg-white p-6 shadow-sm transition-all
                duration-300 hover:shadow-sm
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-teal-500
              `;

              const content = (
                <>
                  <div
                    className={`
                      flex h-14 w-14 items-center justify-center
                      rounded-xl bg-linear-to-br ${card.color}
                      text-white shadow-sm ${card.glow}
                      transition
                    `}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-5 text-sm text-gray-500">{card.title}</h3>

                  <p className="mt-3 text-4xl font-bold text-gray-800">
                    {typeof value === "number" ? <CountUp value={value} /> : "—"}
                  </p>

                  {state.status === "ready" && (
                    <span className="mt-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-600">
                      بروزرسانی {formatUpdatedAt(state.stats.updatedAt)}
                    </span>
                  )}
                </>
              );

              return card.href ? (
                <Link key={card.key} href={card.href} className={className}>
                  {content}
                </Link>
              ) : (
                <div key={card.key} className={className}>
                  {content}
                </div>
              );
            })}
      </div>
    </div>
  );
}
