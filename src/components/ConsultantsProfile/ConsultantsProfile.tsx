"use client";

import type { Consultant } from "@/Types/types";
import { ConsultantHeader } from "@/components/ConsultantsProfile/ConsultantHeader/ConsultantHeader";
import { ConsultantBio } from "@/components/ConsultantsProfile/ConsultantBio/ConsultantBio";
import { ConsultantLocation } from "@/components/ConsultantsProfile/ConsultantLocation/ConsultantLocation";
import { ConsultantSidebar } from "@/components/ConsultantsProfile/ConsultantSidebar/ConsultantSidebar";

interface ConsultantsProfileProps {
  consultant: Consultant;
}

export const ConsultantsProfile: React.FC<ConsultantsProfileProps> = ({
  consultant,
}) => {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <ConsultantHeader consultant={consultant} />
          <ConsultantBio consultant={consultant} />
          <ConsultantLocation consultant={consultant} />
        </div>
        <div className="lg:col-span-4">
          <ConsultantSidebar />
        </div>
      </div>
    </div>
  );
};
