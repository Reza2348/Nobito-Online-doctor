"use client";

import { useMemo, useState } from "react";

import CampaignCard from "@/components/Charity/CampaignCard/CampaignCard";
import CampaignFilters from "@/components/Charity/CampaignFilters/CampaignFilters";
import CharityHeader from "@/components/Charity/CharityHeader/CharityHeader";
import EmptyCampaigns from "@/components/Charity/EmptyCampaigns/EmptyCampaigns";
import FeaturedCampaign from "@/components/Charity/FeaturedCampaign/FeaturedCampaign";

import { categories } from "@/components/Charity/data/charity.data";
import { useCampaign } from "@/context/CampaignContext/CampaignContext";
import type { Category } from "@/Types/types";

const AllCharityCampaigns = () => {
  const [category, setCategory] = useState<Category>("همه");

  const { campaigns, loading, error, refreshCampaigns } = useCampaign();

  const activeCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaign.active),
    [campaigns],
  );

  const featuredCampaign = activeCampaigns[0];

  const filteredCampaigns = useMemo(() => {
    if (category === "همه") {
      return campaigns;
    }

    return campaigns.filter((campaign) => campaign.category === category);
  }, [campaigns, category]);

  return (
    <section dir="rtl" className="min-h-screen bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <CharityHeader />

        {loading ? (
          <div className="py-16 text-center text-slate-600">
            در حال دریافت کمپین‌ها...
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="mb-4 text-red-600">
              دریافت اطلاعات کمپین‌ها ناموفق بود.
            </p>

            <button
              type="button"
              onClick={() => void refreshCampaigns()}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white"
            >
              تلاش مجدد
            </button>
          </div>
        ) : (
          <>
            {featuredCampaign && (
              <div className="mb-16">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <h2 className="text-xl font-black text-slate-900">
                    کمپین فعال
                  </h2>
                </div>

                <FeaturedCampaign campaign={featuredCampaign} />
              </div>
            )}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-600">
                  کمپین‌های دیگر
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  همه کمپین‌ها
                </h2>
              </div>

              <CampaignFilters
                category={category}
                categories={categories}
                onCategoryChange={setCategory}
              />
            </div>

            {filteredCampaigns.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <EmptyCampaigns />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllCharityCampaigns;
