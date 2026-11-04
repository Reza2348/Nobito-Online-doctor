"use client";

import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

import type { FeaturedCampaignProps } from "@/Types/types";
import {
  formatPrice,
  getCampaignProgress,
} from "@/components/Charity/utils/charity.utils";

const FeaturedCampaign = ({ campaign }: FeaturedCampaignProps) => {
  const router = useRouter();

  const progress = getCampaignProgress(campaign.raised, campaign.goal);

  const handleCampaignClick = () => {
    if (!campaign.active) return;

    const campaignId = Number(campaign.id);

    if (!Number.isInteger(campaignId) || campaignId <= 0) {
      console.error("شناسه کمپین معتبر نیست:", campaign.id);
      return;
    }

    try {
      sessionStorage.setItem("selectedCampaignId", String(campaignId));

      router.push("/Campaign-prfile");
    } catch (error) {
      console.error("ذخیره شناسه کمپین در sessionStorage ناموفق بود:", error);
    }
  };

  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm shadow-slate-200/60">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-100">
          {campaign.image ? (
            <img
              src={campaign.image}
              alt={campaign.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-500">
              تصویری ثبت نشده است
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          {/* Badge */}
          <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm">
            <FiHeart className="fill-white" />
            کمپین ویژه
          </div>

          {/* Overlay content */}
          <div className="absolute bottom-7 left-7 right-7 text-white">
            <p className="mb-2 text-sm font-medium text-emerald-300">
              {campaign.active ? "کمپین فعال" : "کمپین غیرفعال"}
            </p>

            <h2 className="text-3xl font-black">{campaign.title}</h2>

            <p className="mt-3 max-w-lg leading-7 text-white/80">
              {campaign.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10 lg:p-12">
          {/* Campaign target */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiHeart size={23} className="fill-emerald-100" />
            </div>

            <div>
              <p className="text-xs text-slate-400">هدف کمپین</p>

              <p className="font-black text-slate-900">{campaign.title}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">جمع‌آوری شده</p>

              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatPrice(campaign.raised)}

                <span className="mr-2 text-sm font-medium text-slate-400">
                  تومان
                </span>
              </p>
            </div>

            <span className="text-xl font-black text-emerald-600">
              {Math.round(safeProgress)}٪
            </span>
          </div>

          {/* Progress */}
          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="پیشرفت کمپین"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(safeProgress)}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${safeProgress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between gap-3 text-xs text-slate-400">
            <span>پیشرفت کمپین</span>

            <span>هدف: {formatPrice(campaign.goal)} تومان</span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <FiUsers size={18} className="text-emerald-600" />

              <p className="mt-2 font-black text-slate-900">
                {formatPrice(campaign.donors)}
              </p>

              <p className="text-xs text-slate-400">حامی</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <FiActivity size={18} className="text-cyan-600" />

              <p className="mt-2 font-black text-slate-900">
                {campaign.category}
              </p>

              <p className="text-xs text-slate-400">حوزه فعالیت</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <FiShield size={18} className="text-indigo-600" />

              <p className="mt-2 font-black text-slate-900">امن</p>

              <p className="text-xs text-slate-400">پرداخت</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleCampaignClick}
            type="button"
            disabled={!campaign.active}
            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 py-4 font-bold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <FiHeart size={20} className="fill-white" />

            {campaign.active ? "حمایت از این کمپین" : "این کمپین غیرفعال است"}

            <FiArrowLeft
              size={19}
              className="transition-transform"
            />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <FiCheckCircle className="text-emerald-500" />
            پرداخت امن و شفاف
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedCampaign;
