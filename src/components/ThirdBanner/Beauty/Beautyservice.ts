import { createClient } from "@/lib/supabaseServer";
import type { BeautyItem, DiscountItem } from "@/Types/types";

export async function getBeautyItems(): Promise<BeautyItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("beauty")
    .select("id, title, slug, photo_url, display_order, is_active")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Beauty fetch error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getDiscountItems(): Promise<DiscountItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("discounts")
    .select(
      "id, title, provider_name, specialty, image_url, original_price, discount_percent, final_price, city, address, slug, is_active",
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Discounts fetch error:", error.message);
    return [];
  }

  return data ?? [];
}
