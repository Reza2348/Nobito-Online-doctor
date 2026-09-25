"use client";

const SKELETON_ITEMS = [
  "popular-article-1",
  "popular-article-2",
  "popular-article-3",
  "popular-article-4",
  "popular-article-5",
];

export default function PopularArticlesSkeleton() {
  return (
    <div className="space-y-3">
      {SKELETON_ITEMS.map((itemId) => (
        <div
          key={itemId}
          className="h-24 animate-pulse rounded-xl bg-gray-100"
        />
      ))}
    </div>
  );
}
