import { supabase } from "@/lib/supabaseClient";
import { Article } from "@/Types/types";

export const PAGE_SIZE = 5;

export async function fetchArticles(from: number, to: number) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return (data as Article[]) ?? [];
}
