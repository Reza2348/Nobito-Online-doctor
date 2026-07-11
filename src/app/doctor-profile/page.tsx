"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Doctor } from "@/Types/types";
import { useDoctor } from "@/context/DoctorContext/DoctorContext";

import DoctorHeader from "@/components/DoctorProfile/DoctorHeader/DoctorHeader";
import DoctorBio from "@/components/DoctorProfile/DoctorBio/DoctorBio";
import DoctorLocation from "@/components/DoctorProfile/DoctorLocation/DoctorLocation";
import DoctorAppointments from "@/components/DoctorProfile/DoctorAppointments/DoctorAppointments";
import Userexperience from "@/components/DoctorProfile/Userexperience/Userexperience";
import Survey from "@/components/DoctorProfile/Survey/Survey";
import Comments from "@/components/Comments/Comments";
import Warning from "@/app/Warning/Warning";

const DoctorProfile: React.FC = () => {
  const { doctorId } = useDoctor();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", doctorId)
        .single();

      if (data) setDoctor(data);

      setLoading(false);
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen gap-4 px-4">
        <span className="text-gray-500 font-bold text-lg whitespace-nowrap">
          در حال بارگذاری پروفایل دکتر...
        </span>
        <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        پزشکی انتخاب نشده است.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 dir-rtl text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          <DoctorHeader doctor={doctor} />

          {/* 📱 MOBILE ONLY SECTION */}
          <div className="flex flex-col gap-5 lg:hidden w-full">
            <DoctorAppointments />
          </div>

          <div className="lg:hidden">
            <Warning />
          </div>

          {/* 📱 MOBILE SPECIAL ORDER (optional) */}
          <div className="lg:hidden space-y-6">
            <DoctorBio doctor={doctor} />
            <DoctorLocation doctor={doctor} />
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
            <DoctorBio doctor={doctor} />
            <DoctorLocation doctor={doctor} />
            <Userexperience />
            <Survey />
            <Comments />
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="hidden lg:block">
              <DoctorAppointments />
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

export default DoctorProfile;
