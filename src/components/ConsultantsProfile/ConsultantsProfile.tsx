"use client";

import type { Consultant } from "@/Types/types";
import ConsultantHeader from "@/components/ConsultantsProfile/ConsultantHeader/ConsultantHeader";
import ConsultantBio from "@/components/ConsultantsProfile/ConsultantBio/ConsultantBio";
import ConsultantLocation from "@/components/ConsultantsProfile/ConsultantLocation/ConsultantLocation";
import ConsultantSidebar from "@/components/ConsultantsProfile/ConsultantSidebar/ConsultantSidebar";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";
import Warning from "@/components/Warning/Warning";

interface ConsultantsProfileProps {
  consultant: Consultant;
}

export const ConsultantsProfile: React.FC<ConsultantsProfileProps> = ({
  consultant,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 dir-rtl text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          <ConsultantHeader consultant={consultant} />

          {/* 📱 MOBILE ONLY SECTION */}
          <div className="flex flex-col gap-5 lg:hidden w-full">
            <ConsultantSidebar consultantId={consultant.id} />
          </div>

          <div className="lg:hidden">
            <Warning />
          </div>

          {/* 📱 MOBILE SPECIAL ORDER (optional) */}
          <div className="lg:hidden space-y-6">
            <ConsultantBio consultant={consultant} />
            <ConsultantLocation consultant={consultant} />
          </div>

          <div className="lg:hidden space-y-6">
            <Userexperience />
          </div>

          <div className="lg:hidden space-y-6">
            <Survey />
          </div>

          <div className="lg:hidden space-y-6">
            <Comments />
          </div>

          {/* 💻 DESKTOP + TABLET */}
          <div className="hidden lg:block space-y-6">
            <ConsultantBio consultant={consultant} />
            <ConsultantLocation consultant={consultant} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <ConsultantSidebar consultantId={consultant.id} />
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
