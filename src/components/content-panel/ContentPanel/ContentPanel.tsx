"use client";

import ContentHeader from "@/components/content-panel/ContentHeader/ContentHeader";
import MenuGrid from "@/components/content-panel/MenuGrid/MenuGrid";
import StatsGrid from "@/components/content-panel/StatsGrid/StatsGrid";

export default function ContentPanel() {
  return (
    <main className="w-full space-y-6">
      {/* Header */}
      <ContentHeader />

      {/* Statistics */}
      <StatsGrid />

      {/* Menu */}
      <MenuGrid />
    </main>
  );
}
