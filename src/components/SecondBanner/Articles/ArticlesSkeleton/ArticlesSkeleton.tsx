"use client";

const SKELETON_ARTICLES = [
  "article-skeleton-1",
  "article-skeleton-2",
  "article-skeleton-3",
];

export default function ArticlesSkeleton() {
  return (
    <div className="space-y-5">
      {SKELETON_ARTICLES.map((articleId) => (
        <div
          key={articleId}
          className="h-52 animate-pulse rounded-xl bg-gray-100"
        />
      ))}
    </div>
  );
}
