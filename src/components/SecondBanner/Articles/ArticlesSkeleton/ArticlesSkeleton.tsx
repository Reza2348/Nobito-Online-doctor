export default function ArticlesSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-52 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}
