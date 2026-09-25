import type { IconType } from "react-icons";

// =========================================================
// MENU
// =========================================================

export interface MenuItem {
  id: number;
  title: string;
  icon: IconType;
  href?: string;
}

// =========================================================
// MENU CARD
// =========================================================

export interface MenuCardProps {
  title: string;
  description: string;
  icon: IconType;
  color: string;
}
