import { FiArrowLeft, FiCheckCircle, FiHeart, FiUsers } from "react-icons/fi";

import type { CampaignCardProps } from "@/Types/types";
import {
  formatPrice,
  getCampaignProgress,
} from "@/components/Charity/utils/charity.utils";

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const progress = getCampaignProgress(campaign.raised, campaign.goal);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent" />

        {/* Category */}
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">
          {campaign.category}
        </span>

        {/* Active */}
        {campaign.active && (
          <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            فعال
          </span>
        )}

        {/* Favorite */}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-500 backdrop-blur transition hover:text-rose-500"
        >
          <FiHeart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-black text-slate-900">{campaign.title}</h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <strong className="text-lg font-black text-slate-900">
                {formatPrice(campaign.raised)}
              </strong>

              <span className="mr-1 text-xs text-slate-400">تومان</span>
            </div>

            <span className="font-black text-emerald-600">
              {Math.round(progress)}٪
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>جمع‌آوری شده</span>
            <span>هدف {formatPrice(campaign.goal)}</span>
          </div>
        </div>

        {/* Donors */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
              <FiUsers size={16} />
            </span>
            {formatPrice(campaign.donors)} حامی
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <FiCheckCircle size={14} />
            تأیید شده
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          <FiHeart size={17} />
          حمایت از کمپین
          <FiArrowLeft
            size={17}
            className="transition-transform group-hover/button:-translate-x-1"
          />
        </button>
      </div>
    </article>
  );
};

export default CampaignCard;
