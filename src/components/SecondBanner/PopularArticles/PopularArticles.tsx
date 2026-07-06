"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { FiClock } from "react-icons/fi";

type PopularArticle = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  views: number;
};

const SKELETON_ITEMS = Array.from({ length: 5 });

export default function PopularArticles() {
  const [articles, setArticles] = useState<PopularArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPopularArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id,title,excerpt,photo_url,reading_time,views")
        .eq("published", true)
        .order("views", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Supabase Error:", error.message);
      } else {
        setArticles(data ?? []);
      }

      setLoading(false);
    };

    getPopularArticles();
  }, []);

  return (
    <aside className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-5 w-1 rounded-full bg-[#1F7168]" />
        <h2 className="text-lg font-bold text-gray-700">پربازدیدترین‌ها</h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {SKELETON_ITEMS.map((_, i) => (
            <div
              key={i}
              className="h-24 w-full animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article, index) =>
            index === 0 ? (
              <div
                key={article.id}
                className="rounded-xl bg-[#1F7168] p-4 text-white shadow"
              >
                <h3 className="mb-2 line-clamp-2 text-base font-bold leading-7">
                  {article.title}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm leading-6 text-white/90">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-1 text-xs">
                  <FiClock size={13} />
                  <span>{article.reading_time} دقیقه مطالعه</span>
                </div>
              </div>
            ) : (
              <div
                key={article.id}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md"
              >
                {/* متن */}
                <div className="min-w-0 flex-1 text-right">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-700">
                    {article.title}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                    {article.excerpt}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                    <FiClock size={12} />
                    <span>{article.reading_time} دقیقه</span>
                  </div>
                </div>

                {/* تصویر */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {article.photo_url ? (
                    <img
                      src={article.photo_url}
                      alt={article.title}
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                      بدون تصویر
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </aside>
  );
}
