"use client";

import { usePopularArticles } from "@/hooks/usePopularArticles";
import PopularArticlesHeader from "@/components/SecondBanner/PopularArticles/PopularArticlesHeader/PopularArticlesHeader";
import PopularArticlesSkeleton from "@/components/SecondBanner/PopularArticles/PopularArticlesSkeleton/PopularArticlesSkeleton";
import PopularArticleFeatured from "@/components/SecondBanner/PopularArticles/PopularArticleFeatured/PopularArticleFeatured";
import PopularArticleItem from "@/components/SecondBanner/PopularArticles/PopularArticleItem/PopularArticleItem";

export default function PopularArticles() {
  const { articles, loading } = usePopularArticles();

  return (
    <aside className="w-full">
      <PopularArticlesHeader />

      {loading ? (
        <PopularArticlesSkeleton />
      ) : (
        <div className="space-y-3">
          {articles.map((article, index) =>
            index === 0 ? (
              <PopularArticleFeatured key={article.id} article={article} />
            ) : (
              <PopularArticleItem key={article.id} article={article} />
            ),
          )}
        </div>
      )}
    </aside>
  );
}
