import type { ReactNode } from "react";

// =========================================================
// SERVICE
// =========================================================

export interface Service {
  name: string;
  description: string;
  icon: ReactNode;
  color: string;
}
