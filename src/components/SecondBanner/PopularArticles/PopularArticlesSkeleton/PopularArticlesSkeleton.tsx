const SKELETON_ITEMS = Array.from({ length: 5 });

export default function PopularArticlesSkeleton() {
  return (
    <div className="space-y-3">
      {SKELETON_ITEMS.map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}
