export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

export const getCampaignProgress = (raised: number, goal: number): number => {
  if (goal <= 0) return 0;

  return Math.min((raised / goal) * 100, 100);
};
