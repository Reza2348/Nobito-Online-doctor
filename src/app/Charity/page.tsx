"use client";

import { useMemo, useState } from "react";

import CampaignCard from "@/components/Charity/CampaignCard/CampaignCard";
import CampaignFilters from "@/components/Charity/CampaignFilters/CampaignFilters";
import CharityHeader from "@/components/Charity/CharityHeader/CharityHeader";
import EmptyCampaigns from "@/components/Charity/EmptyCampaigns/EmptyCampaigns";
import FeaturedCampaign from "@/components/Charity/FeaturedCampaign/FeaturedCampaign";

import { campaigns, categories } from "@/components/Charity/data/charity.data";
import type { Category } from "@/Types/types";

const AllCharityCampaigns = () => {
  const [category, setCategory] = useState<Category>("همه");

  const featuredCampaign =
    campaigns.find((campaign) => campaign.active) ?? campaigns[0];

  const filteredCampaigns = useMemo(() => {
    if (category === "همه") {
      return campaigns;
    }

    return campaigns.filter((campaign) => campaign.category === category);
  }, [category]);

  return (
    <section dir="rtl" className="min-h-screen bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <CharityHeader />

        {/* Featured Campaign */}
        <div className="mb-16">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <h2 className="text-xl font-black text-slate-900">کمپین فعال</h2>
          </div>

          <FeaturedCampaign campaign={featuredCampaign} />
        </div>

        {/* Campaigns Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-600">کمپین‌های دیگر</p>

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

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <EmptyCampaigns />
        )}
      </div>
    </section>
  );
};

export default AllCharityCampaigns;
