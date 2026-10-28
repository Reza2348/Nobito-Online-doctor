export const formatPrice = (value: number): string => {
  if (!Number.isFinite(value)) return "۰";

  return new Intl.NumberFormat("fa-IR").format(value);
};

export const getCampaignProgress = (raised: number, goal: number): number => {
  if (!Number.isFinite(raised) || !Number.isFinite(goal) || goal <= 0) {
    return 0;
  }

  return Math.min(Math.max((raised / goal) * 100, 0), 100);
};
