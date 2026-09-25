import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import type { FeaturedCampaignProps } from "@/Types/types";
import {
  formatPrice,
  getCampaignProgress,
} from "@/components/Charity/utils/charity.utils";

const FeaturedCampaign = ({ campaign }: FeaturedCampaignProps) => {
  const progress = getCampaignProgress(campaign.raised, campaign.goal);

  return (
    <article className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/60">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-100">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          {/* Badge */}
          <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
            <FiHeart className="fill-white" />
            کمپین ویژه
          </div>

          {/* Overlay content */}
          <div className="absolute bottom-7 left-7 right-7 text-white">
            <p className="mb-2 text-sm font-medium text-emerald-300">
              کمپین فعال
            </p>

            <h3 className="text-3xl font-black">{campaign.title}</h3>

            <p className="mt-3 max-w-lg leading-7 text-white/80">
              {campaign.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10 lg:p-12">
          {/* Campaign target */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FiHeart size={23} className="fill-emerald-100" />
            </div>

            <div>
              <p className="text-xs text-slate-400">هدف کمپین</p>

              <p className="font-black text-slate-900">
                کمک به درمان بیماران نیازمند
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-8 flex items-end justify-between">
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
              {Math.round(progress)}٪
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>پیشرفت کمپین</span>

            <span>هدف: {formatPrice(campaign.goal)} تومان</span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <FiUsers size={18} className="text-emerald-600" />

              <p className="mt-2 font-black text-slate-900">
                {formatPrice(campaign.donors)}
              </p>

              <p className="text-xs text-slate-400">حامی</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <FiActivity size={18} className="text-cyan-600" />

              <p className="mt-2 font-black text-slate-900">
                {campaign.category}
              </p>

              <p className="text-xs text-slate-400">حوزه درمان</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <FiShield size={18} className="text-indigo-600" />

              <p className="mt-2 font-black text-slate-900">امن</p>

              <p className="text-xs text-slate-400">پرداخت</p>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <FiHeart size={20} className="fill-white" />
            حمایت از این کمپین
            <FiArrowLeft
              size={19}
              className="transition-transform group-hover:-translate-x-1"
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
