import type { ProviderTheme } from "@/components/shared/Theme/Theme";

export type SlotType = "inPerson" | "video";

export type ConsultType = "phone" | "inPerson" | "video" | "text";

export interface Slot {
  id: string;
  date: Date;
}

export interface ProviderSidebarProps {
  id: number | string;
  theme: ProviderTheme;
  secretaryPhone?: string;
  chatHref?: string;
  priceByType?: Record<SlotType, number>;
}
