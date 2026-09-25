// =========================================================
// CAMPAIGN
// =========================================================

export type Category = "همه" | "کودکان" | "درمان" | "دارو" | "جراحی";

export type CampaignCategory = Exclude<Category, "همه">;

export interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: CampaignCategory;
  active: boolean;
}

export interface CampaignCardProps {
  campaign: Campaign;
}

export interface FeaturedCampaignProps {
  campaign: Campaign;
}
