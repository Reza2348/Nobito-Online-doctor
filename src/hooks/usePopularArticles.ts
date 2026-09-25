"use client";

import { useEffect, useState } from "react";
import { fetchPopularArticles } from "@/components/SecondBanner/PopularArticles/popular-articlesservice";
import { PopularArticle } from "@/Types/types";

export function usePopularArticles() {
  const [articles, setArticles] = useState<PopularArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPopularArticles();
        setArticles(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    articles,
    loading,
  };
}
