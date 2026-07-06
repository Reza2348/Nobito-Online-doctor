"use client";

import { useEffect, useState } from "react";
import {
  fetchArticles,
  PAGE_SIZE,
} from "@/components/SecondBanner/Articles/articleservice";
import { Article } from "@/Types/types";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchArticles(0, PAGE_SIZE - 1);

      setArticles(data);
      setHasMore(data.length === PAGE_SIZE);
      setLoading(false);
    }

    load();
  }, []);

  async function loadMore() {
    setLoadingMore(true);

    const data = await fetchArticles(
      articles.length,
      articles.length + PAGE_SIZE - 1,
    );

    setArticles((prev) => [...prev, ...data]);
    setHasMore(data.length === PAGE_SIZE);
    setLoadingMore(false);
  }

  return {
    articles,
    loading,
    loadingMore,
    hasMore,
    loadMore,
  };
}
