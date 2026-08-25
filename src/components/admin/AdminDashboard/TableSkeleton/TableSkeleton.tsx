"use client";

const SKELETON_ROWS = [
  "table-row-1",
  "table-row-2",
  "table-row-3",
  "table-row-4",
  "table-row-5",
  "table-row-6",
];

export default function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-48 rounded-xl bg-gray-200" />
          <div className="h-4 w-72 rounded-lg bg-gray-200" />
        </div>

        <div className="h-10 w-32 rounded-xl bg-gray-200" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 border-b border-gray-100 p-5">
          <div className="h-5 rounded-lg bg-gray-200" />
          <div className="h-5 rounded-lg bg-gray-200" />
          <div className="h-5 rounded-lg bg-gray-200" />
          <div className="h-5 rounded-lg bg-gray-200" />
        </div>

        {/* Rows */}
        {SKELETON_ROWS.map((rowId) => (
          <div
            key={rowId}
            className="grid grid-cols-4 gap-4 border-b border-gray-100 p-5 last:border-b-0"
          >
            <div className="h-5 rounded-lg bg-gray-100" />
            <div className="h-5 rounded-lg bg-gray-100" />
            <div className="h-5 rounded-lg bg-gray-100" />
            <div className="h-5 rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
