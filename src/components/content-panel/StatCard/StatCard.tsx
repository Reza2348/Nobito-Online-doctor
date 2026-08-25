"use client";

import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: IconType;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-black text-gray-800">{value}</h2>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Icon className="text-2xl" />
        </div>
      </div>
    </div>
  );
}
