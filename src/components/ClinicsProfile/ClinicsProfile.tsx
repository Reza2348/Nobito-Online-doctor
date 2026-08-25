"use client";

import React from "react";
import type { Clinic } from "@/Types/types";

import ClinicHeader from "@/components/ClinicsProfile/ClinicsHeader/ClinicsHeader";
import ClinicBio from "@/components/ClinicsProfile/ClinicsBio/ClinicsBio";
import ClinicsLocation from "@/components/ClinicsProfile/ClinicsLocation/ClinicsLocation";
import ClinicsSidebar from "@/components/ClinicsProfile/ClinicsSidebar/ClinicsSidebar";

import Warning from "@/components/Warning/Warning";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";

interface ClinicProfileProps {
  clinic: Clinic;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic }) => {
  return (
    <div dir="rtl" className="mx-auto max-w-7xl p-4 text-right md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-8">
          <ClinicHeader clinic={clinic} />

          {/* MOBILE */}
          <div className="flex w-full flex-col gap-5 lg:hidden">
            <ClinicsSidebar clinicId={clinic.id} />

            <Warning />

            <ClinicBio clinic={clinic} />

            <ClinicsLocation clinic={clinic} />

            <Userexperience />

            <Survey />

            <Comments />
          </div>

          {/* DESKTOP */}
          <div className="hidden space-y-6 lg:block">
            <ClinicBio clinic={clinic} />

            <ClinicsLocation clinic={clinic} />

            <Userexperience />

            <Survey />

            <Comments />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <ClinicsSidebar clinicId={clinic.id} />
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
