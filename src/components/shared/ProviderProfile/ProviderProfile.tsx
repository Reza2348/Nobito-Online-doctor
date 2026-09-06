"use client";

import React from "react";

import ProviderHeader from "@/components/shared/Providerheader/Providerheader";
import ProviderBio from "@/components/shared/Providerbio/Providerbio";
import ProviderLocation from "@/components/shared/Providerlocation/Providerlocation";
import ProviderSidebar from "@/components/shared/Providersidebar/Providersidebar";
import { providerThemes } from "@/components/shared/Theme/Theme";
import type { ProviderCommon, ProviderKind } from "@/Types/types";

import Warning from "@/components/Warning/Warning";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";

interface ProviderProfileProps {
  /** which entity this page is for — picks the right theme/copy/colors */
  kind: ProviderKind;
  /** already normalized via fromDoctor / fromClinic / fromConsultant */
  data: ProviderCommon;
}

/**
 * Single layout used by Doctor, Clinic and Consultant profile pages.
 * All three used to duplicate this grid + mobile/desktop split — this
 * is the one place it lives now. Entity-specific copy/colors come
 * entirely from `theme`, entity-specific data from `data`.
 */
const ProviderProfile: React.FC<ProviderProfileProps> = ({ kind, data }) => {
  const theme = providerThemes[kind];

  return (
    <div dir="rtl" className="mx-auto max-w-7xl p-4 text-right md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-8">
          <ProviderHeader data={data} theme={theme} />

          {/* MOBILE */}
          <div className="flex w-full flex-col gap-5 lg:hidden">
            <ProviderSidebar id={data.id} theme={theme} />
            <Warning />
            <ProviderBio data={data} theme={theme} />
            <ProviderLocation data={data} theme={theme} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>

          {/* DESKTOP */}
          <div className="hidden space-y-6 lg:block">
            <ProviderBio data={data} theme={theme} />
            <ProviderLocation data={data} theme={theme} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <ProviderSidebar id={data.id} theme={theme} />
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

export default ProviderProfile;
