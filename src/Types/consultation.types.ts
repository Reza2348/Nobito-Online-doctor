import type { ReactNode } from "react";

// =========================================================
// CONSULTATION
// =========================================================

export interface ConsultationTypeItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface OnlineConsultationProps {
  doctorsOnline?: number;
  responseTime?: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface ConsultationTypeItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}
