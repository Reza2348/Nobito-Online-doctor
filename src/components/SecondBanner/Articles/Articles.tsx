"use client";

import { useArticles } from "@/hooks/useArticles";
import ArticlesList from "@/components/SecondBanner/Articles/ArticlesList/ArticlesList";
import ArticlesSkeleton from "@/components/SecondBanner/Articles/ArticlesSkeleton/ArticlesSkeleton";

export default function Articles() {
  const { articles, loading } = useArticles();

  if (loading) {
    return <ArticlesSkeleton />;
  }

  return (
    <>
      <ArticlesList articles={articles} />
    </>
  );
}
