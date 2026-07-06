import { supabase } from "@/lib/supabaseClient";
import { PopularArticle } from "@/Types/types";

export async function fetchPopularArticles() {
  const { data, error } = await supabase
    .from("popular_articles")
    .select("id,title,excerpt,photo_url,reading_time,display_order,published")
    .eq("published", true)
    .order("display_order", { ascending: true })
    .limit(5);

  if (error) throw error;

  return (data as PopularArticle[]) ?? [];
}
