"use client";

import React from "react";
import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  doctor: D.Doctor;
}

const DoctorBio: React.FC<Props> = ({ doctor }) => (
  <div className="bg-white rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 mt-6">
    <h2 className="text-xl font-black text-gray-800 mb-4">درباره پزشک</h2>
    <p className="text-gray-400 text-[13px] leading-7 text-justify font-medium">
      {doctor.bio ||
        `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.
این متن برای پر کردن جای محتوا استفاده می‌شود و می‌تواند جایگزین متن واقعی شود.
لورم ایپسوم نمونه‌ای از متن طولانی‌تر برای نمایش چند خط می‌باشد.`}
    </p>

    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6 text-[#2a7d73]">
        <D.FaStethoscope size={22} />
        <h3 className="font-black text-sm text-gray-800">
          تخصص پزشکی: <span className="text-[#2a7d73]">{doctor.specialty}</span>
        </h3>
      </div>

      {/* نمایش فیلدهای تخصصی پزشک با کامپوننت جدا */}
      <D.DoctorFields fields={doctor.fields || []} />
    </div>
  </div>
);

export default DoctorBio;
