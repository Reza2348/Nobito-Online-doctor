// components/providers/AppProviders.tsx
"use client";

import { DoctorProvider } from "@/context/DoctorContext/DoctorContext";
import { ClinicsProvider } from "@/context/ClinicsContext/ClinicsContext"; // اصلاح شد
import { ConsultantProvider } from "@/context/ConsultantsContext/ConsultantsContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DoctorProvider>
      <ClinicsProvider>
        <ConsultantProvider>{children}</ConsultantProvider>
      </ClinicsProvider>
    </DoctorProvider>
  );
}
