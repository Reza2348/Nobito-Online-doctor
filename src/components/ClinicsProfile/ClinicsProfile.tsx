"use client";

import React from "react";
import type { Clinic } from "@/Types/types";

import { ClinicHeader } from "@/components/ClinicsProfile/ClinicsHeader/ClinicsHeader";
import { ClinicBio } from "@/components/ClinicsProfile/ClinicsBio/ClinicsBio";
import ClinicsLocation from "@/components/ClinicsProfile/ClinicsLocation/ClinicsLocation";
import ClinicSidebar from "@/components/ClinicsProfile/ClinicsSidebar/ClinicsSidebar";

import Warning from "@/app/Warning/Warning";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";

interface ClinicProfileProps {
  clinic: Clinic;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 dir-rtl text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 space-y-6">
          <ClinicHeader clinic={clinic} />

          {/* 📱 MOBILE ONLY */}
          <div className="flex flex-col gap-5 lg:hidden w-full">
            <ClinicSidebar />
            <Warning />
            <ClinicBio clinic={clinic} />
            <ClinicsLocation clinic={clinic} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>

          {/* 💻 DESKTOP */}
          <div className="hidden lg:block space-y-6">
            <ClinicBio clinic={clinic} />
            <ClinicsLocation clinic={clinic} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>
        </div>

        {/* RIGHT SIDEBAR (DESKTOP ONLY) */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <ClinicSidebar />
            </div>

            <div className="hidden lg:block">
              <Warning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
