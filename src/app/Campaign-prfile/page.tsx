"use client";

import { useEffect, useState } from "react";

import { useCampaign } from "@/context/CampaignContext/CampaignContext";

import CampaignProfile from "@/components/shared/Campaign/Campaign";

export default function CampaignProfilePage() {
  const { loading, error, refreshCampaigns, getCampaignById, setCampaignId } =
    useCampaign();

  const [campaignId, setLocalCampaignId] = useState<number | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  // خواندن شناسه انتخاب‌شده از sessionStorage
  useEffect(() => {
    const storedId = sessionStorage.getItem("selectedCampaignId");
    const parsedId = storedId === null ? NaN : Number(storedId);

    if (Number.isSafeInteger(parsedId) && parsedId > 0) {
      setLocalCampaignId(parsedId);
      setCampaignId(parsedId);
    } else {
      setLocalCampaignId(null);
    }

    setSessionReady(true);
  }, [setCampaignId]);

  // انتظار برای خواندن شناسه و دریافت کمپین‌ها
  if (!sessionReady || loading) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 sm:flex-row"
        role="status"
        aria-live="polite"
      >
        <span className="text-lg font-bold text-gray-500">
          در حال بارگذاری پروفایل کمپین...
        </span>

        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"
          aria-hidden="true"
        />
      </div>
    );
  }

  // خطای دریافت اطلاعات از Supabase
  if (error) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center"
        role="alert"
      >
        <p className="font-bold text-red-500">{error}</p>

        <button
          type="button"
          onClick={() => void refreshCampaigns()}
          className="rounded-lg bg-teal-600 px-5 py-3 font-bold text-white transition hover:bg-teal-700"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  // بررسی شناسه کمپین
  if (
    campaignId === null ||
    !Number.isSafeInteger(campaignId) ||
    campaignId <= 0
  ) {
    return (
      <div className="p-10 text-center font-bold text-gray-500">
        شناسه کمپین معتبر نیست یا کمپینی انتخاب نشده است.
      </div>
    );
  }

  // پیدا کردن کمپین در فهرست دریافت‌شده
  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-10 text-center">
        <p className="font-bold text-gray-500">کمپین موردنظر پیدا نشد.</p>

        <button
          type="button"
          onClick={() => void refreshCampaigns()}
          className="rounded-lg bg-teal-600 px-5 py-3 font-bold text-white transition hover:bg-teal-700"
        >
          بارگذاری مجدد کمپین‌ها
        </button>
      </div>
    );
  }

  return <CampaignProfile campaign={campaign} />;
}
