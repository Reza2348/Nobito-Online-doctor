// components/providers/AppProviders.tsx
"use client";

import { DoctorProvider } from "@/context/DoctorContext/DoctorContext";
import { ClinicsProvider } from "@/context/ClinicsContext/ClinicsContext"; // اصلاح شد
import { ConsultantProvider } from "@/context/ConsultantsContext/ConsultantsContext";
import { CampaignProvider } from "@/context/CampaignContext/CampaignContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorProvider>
      <ClinicsProvider>
        <ConsultantProvider>
          <CampaignProvider>{children}</CampaignProvider>
        </ConsultantProvider>
      </ClinicsProvider>
    </DoctorProvider>
  );
}
