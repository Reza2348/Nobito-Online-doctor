"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/Types/types";

interface Props {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

const SidebarMenu = ({ items, onItemClick }: Props) => {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = !!item.href && pathname === item.href;

        const content = (
          <>
            <Icon className="text-lg" />
            <span>{item.title}</span>
          </>
        );

        const className = `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
          ${
            isActive
              ? "bg-[#f0faf9] text-[#2d7d74] font-bold"
              : "text-gray-500 hover:bg-gray-50"
          }`;

        if (!item.href) {
          return (
            <li
              key={item.id}
              onClick={() => onItemClick(item)}
              className={className}
            >
              {content}
            </li>
          );
        }

        return (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={() => onItemClick(item)}
              className={className}
            >
              {content}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
