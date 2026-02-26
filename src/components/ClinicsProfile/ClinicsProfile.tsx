"use client";

import React from "react";
import type { Clinic } from "@/Types/types";
import { ClinicHeader } from "@/components/ClinicsProfile/ClinicsHeader/ClinicsHeader";
import { ClinicBio } from "@/components/ClinicsProfile/ClinicsBio/ClinicsBio";
import ClinicsLocation from "@/components/ClinicsProfile/ClinicsLocation/ClinicsLocation";
import ClinicSidebar from "@/components/ClinicsProfile/ClinicsSidebar/ClinicsSidebar";

interface ClinicProfileProps {
  clinic: Clinic;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <ClinicHeader clinic={clinic} />
          <ClinicBio clinic={clinic} />
          <ClinicsLocation clinic={clinic} />
        </div>
        <div className="lg:col-span-4">
          <ClinicSidebar />
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
