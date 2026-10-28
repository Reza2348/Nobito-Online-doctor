"use client";

import type { Campaign } from "@/Types/types";
import { LuHeartHandshake } from "react-icons/lu";

interface CampaignProfileProps {
  campaign: Campaign;
}

export default function CampaignProfile({ campaign }: CampaignProfileProps) {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("fa-IR").format(Number(value) || 0);

  const raised = Number(campaign.raised) || 0;
  const goal = Number(campaign.goal) || 0;
  const donors = Number(campaign.donors) || 0;

  const progress =
    goal > 0 ? Math.min(Math.max((raised / goal) * 100, 0), 100) : 0;

  const remaining = Math.max(goal - raised, 0);

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm">
        {campaign.image && (
          <img
            src={campaign.image}
            alt={campaign.title || "تصویر کمپین"}
            className="h-64 w-full object-cover sm:h-96"
          />
        )}

        <div className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="mb-3 text-sm font-bold text-teal-700">
              {campaign.category}
            </p>

            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
              {campaign.title}
            </h1>
          </div>

          <p className="whitespace-pre-line leading-8 text-slate-600">
            {campaign.description || "توضیحی برای این کمپین ثبت نشده است."}
          </p>

          <section aria-label="وضعیت مالی کمپین" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-slate-600">مبلغ جمع‌آوری‌شده</span>

              <strong className="text-lg font-bold text-teal-700">
                {formatPrice(raised)} تومان
              </strong>
            </div>

            <div
              className="h-3 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label="درصد پیشرفت کمپین"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-wrap justify-between gap-2 text-sm text-slate-500">
              <span>هدف: {formatPrice(goal)} تومان</span>
              <span>{formatPrice(Math.round(progress))}٪ تکمیل شده</span>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="mb-2 text-sm text-slate-500">تعداد حامیان</p>
              <strong className="text-xl text-slate-900">
                {formatPrice(donors)}
              </strong>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="mb-2 text-sm text-slate-500">
                مبلغ باقی‌مانده تا هدف
              </p>
              <strong className="text-xl text-slate-900">
                {formatPrice(remaining)} تومان
              </strong>
            </div>

            <button
              className="inline-flex items-center justify-center gap-2
    rounded-xl bg-linear-to-l from-green-700 to-emerald-500
    px-5 py-2.5 text-sm font-semibold text-white
    shadow-md shadow-green-700/20
    transition-all duration-300
    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-700/30
    active:translate-y-0 active:scale-95
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              <LuHeartHandshake className="h-5 w-5" />
              حمایت تومانی
            </button>
          </section>
        </div>
      </article>
    </main>
  );
}
