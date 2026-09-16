export type DiscountItem = {
  id: number;
  title: string;
  provider_name: string;
  specialty: string | null;
  image_url: string;
  original_price: number;
  discount_percent: number;
  final_price: number;
  city: string;
  address: string;
  slug: string;
  is_active: boolean;
};
