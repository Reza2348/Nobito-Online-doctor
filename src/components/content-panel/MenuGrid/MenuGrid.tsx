"use client";

import MenuCard from "@/components/content-panel/MenuCard/MenuCard";
import { menuItems } from "@/components/content-panel/data";

export default function MenuGrid() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {menuItems.map((item) => (
        <MenuCard
          key={item.title}
          title={item.title}
          description={item.description}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </section>
  );
}
