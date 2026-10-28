"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import { createClient } from "@supabase/supabase-js";
import type { Campaign } from "@/Types/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface CampaignContextType {
  campaignId: number | null;
  setCampaignId: (id: number) => void;
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  getCampaignById: (id: string | number) => Campaign | undefined;
  refreshCampaigns: () => Promise<void>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined,
);

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaignId, setCampaignIdState] = useState<number | null>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // انتخاب کمپین فقط در حافظه React
  const setCampaignId = useCallback((id: number) => {
    if (!Number.isSafeInteger(id) || id <= 0) {
      return;
    }

    setCampaignIdState(id);
  }, []);

  // دریافت کمپین‌ها از Supabase
  const refreshCampaigns = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      if (!supabase) {
        throw new Error(
          "متغیرهای اتصال Supabase در فایل .env.local تنظیم نشده‌اند.",
        );
      }

      const { data, error: supabaseError } = await supabase
        .from("Campaign")
        .select("*")
        .order("id", { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      const normalizedCampaigns: Campaign[] = (data ?? []).map((item) => ({
        ...item,
        id: Number(item.id),
        raised: Number(item.raised) || 0,
        goal: Number(item.goal) || 0,
        donors: Number(item.donors) || 0,
        active: Boolean(item.active),
      })) as Campaign[];

      setCampaigns(normalizedCampaigns);

      // اگر کمپین انتخاب‌شده دیگر وجود نداشته باشد، انتخاب را پاک کن
      setCampaignIdState((currentId) => {
        if (currentId === null) {
          return null;
        }

        const exists = normalizedCampaigns.some(
          (campaign) => campaign.id === currentId,
        );

        return exists ? currentId : null;
      });
    } catch (err: unknown) {
      console.error("Supabase Campaign error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "دریافت اطلاعات کمپین‌ها ناموفق بود.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCampaigns();
  }, [refreshCampaigns]);

  // دریافت کمپین با شناسه
  const getCampaignById = useCallback(
    (id: string | number): Campaign | undefined => {
      const numericId = Number(id);

      if (!Number.isSafeInteger(numericId) || numericId <= 0) {
        return undefined;
      }

      return campaigns.find((campaign) => Number(campaign.id) === numericId);
    },
    [campaigns],
  );

  return (
    <CampaignContext.Provider
      value={{
        campaignId,
        setCampaignId,
        campaigns,
        loading,
        error,
        getCampaignById,
        refreshCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);

  if (context === undefined) {
    throw new Error("useCampaign باید داخل CampaignProvider استفاده شود.");
  }

  return context;
};
