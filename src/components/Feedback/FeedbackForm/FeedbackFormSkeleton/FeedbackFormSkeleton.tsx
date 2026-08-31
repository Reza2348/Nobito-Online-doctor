export default function FeedbackFormSkeleton() {
  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 animate-pulse rounded-2xl bg-slate-100" />

        <div className="space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

          <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />

          <div className="h-3 w-52 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
