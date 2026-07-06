"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { FiArrowLeft, FiClock, FiEye } from "react-icons/fi";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  views: number;
  published: boolean;
  created_at: string;
};

const PAGE_SIZE = 5;

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (from: number, to: number) => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      return [];
    }

    return (data as Article[]) ?? [];
  };

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles(0, PAGE_SIZE - 1);

      setArticles(data);
      setHasMore(data.length === PAGE_SIZE);
      setLoading(false);
    };

    loadArticles();
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);

    const data = await fetchArticles(
      articles.length,
      articles.length + PAGE_SIZE - 1,
    );

    setArticles((prev) => [...prev, ...data]);
    setHasMore(data.length === PAGE_SIZE);

    setLoadingMore(false);
  };

  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-52 w-full animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-5">
        {articles.map((article) => (
          <article
            key={article.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
          >
            <div className="flex flex-col-reverse gap-4 sm:flex-row-reverse">
              {/* تصویر */}

              {/* عنوان و متن */}
              <div className="flex-1">
                <h2 className="mb-2 px-1 text-lg font-bold text-gray-800 sm:text-xl">
                  {article.title}
                </h2>

                <p className="line-clamp-3 px-1 text-sm leading-7 text-gray-500 sm:leading-8">
                  {article.excerpt}
                </p>
              </div>
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg  sm:h-36 sm:w-56">
                {article.photo_url && article.photo_url.trim() !== "" ? (
                  <img
                    src={article.photo_url}
                    alt={article.title}
                    className="w-2xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs">
                    تصویر موجود نیست
                  </div>
                )}
              </div>
            </div>

            {/* پایین کارت */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <FiClock className="text-[#1F7168]" size={15} />
                  {article.reading_time} دقیقه
                </span>
                <span className="flex items-center gap-1.5">
                  <FiEye className="text-[#1F7168]" size={15} />
                  {article.views}
                </span>
              </div>

              <button className="flex items-center gap-2 rounded-md border border-[#1F7168] px-4 py-1.5 text-sm text-[#1F7168] transition hover:bg-[#1F7168] hover:text-white">
                <FiArrowLeft />
                ادامه مطلب
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
