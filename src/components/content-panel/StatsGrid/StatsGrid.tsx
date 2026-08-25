"use client";

import StatCard from "@/components/content-panel/StatCard/StatCard";
import { stats } from "@/components/content-panel/data";

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </section>
  );
}
