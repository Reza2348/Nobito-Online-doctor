"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Doctor } from "@/Types/types";
import { useDoctor } from "@/context/DoctorContext";

import DoctorHeader from "@/components/DoctorProfile/DoctorHeader/DoctorHeader";
import DoctorBio from "@/components/DoctorProfile/DoctorBio/DoctorBio";
import DoctorLocation from "@/components/DoctorProfile/DoctorLocation/DoctorLocation";
import DoctorAppointments from "@/components/DoctorProfile/DoctorAppointments/DoctorAppointments";

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        {/* متن سمت راست */}
        <span className="text-gray-500 font-bold text-lg">
          در حال بارگذاری پروفایل...
        </span>

        {/* spinner سمت چپ */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    );

  if (!doctor)
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        پزشکی انتخاب نشده است.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-[#fdfdfd] dir-rtl text-right grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-6">
        <DoctorHeader doctor={doctor} />
        <DoctorBio doctor={doctor} />
        <DoctorLocation doctor={doctor} />
      </div>
      <div className="lg:col-span-4 space-y-6">
        <DoctorAppointments />
      </div>
    </div>
  );
};

export default DoctorProfile;
