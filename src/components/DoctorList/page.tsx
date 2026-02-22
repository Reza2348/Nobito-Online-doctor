"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

interface Doctor {
  id: number;
  name: string;
  photo_url: string | null;
  specialty: string;
  patients_satisfied: number;
  address: string;
  fields: string[];
  rating?: string;
  satisfied_percent?: string;
}

const fetchDoctors = async (): Promise<Doctor[]> => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("id", { ascending: true }); // 🔹 ترتیب بر اساس id

  if (error) throw new Error(error.message);
  return data as Doctor[];
};

const DoctorList: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Doctor[], Error>({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        در حال بارگذاری...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center py-16 text-red-400 font-sans">
        خطا در بارگذاری داده‌ها
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        هیچ دکتری یافت نشد
      </div>
    );

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    >
      {data.map((doctor) => (
        <div
          key={doctor.id}
          className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:max-w-[300px] lg:max-w-[350px] mx-auto"
        >
          {/* Photo */}
          <div className="flex justify-center pt-6 pb-3">
            {doctor.photo_url ? (
              <img
                src={doctor.photo_url}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-teal-50"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm ring-4 ring-teal-50">
                بدون عکس
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="flex flex-col px-5 pb-5 flex-1">
            {/* Name + Rating */}
            <div className="flex items-center gap-1 w-full mb-2">
              <h3 className="font-bold text-lg text-gray-900 ml-auto text-right">
                {doctor.name}
              </h3>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-700 text-sm">
                  {doctor.rating ?? "۴/۵"}
                </span>
                <FaStar className="text-amber-400" size={18} />
              </div>
            </div>

            {/* Specialty */}
            <p className="text-gray-400 text-sm text-right mb-3">
              {doctor.specialty}
            </p>

            {/* Satisfied patients */}
            <p className="text-right font-bold text-base text-teal-700 mb-4">
              <span>({doctor.satisfied_percent ?? "۹۷%"})</span>{" "}
              <span>
                {doctor.patients_satisfied.toLocaleString("fa-IR")} بیمار راضی
              </span>
            </p>

            {/* Fields / Services */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {doctor.fields.map((field: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full text-center"
                >
                  {field}
                </span>
              ))}
            </div>

            {/* Divider */}
            <hr className="border-gray-100 mb-4" />

            {/* Address */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <FiMapPin className="shrink-0" size={16} />
              <span className="truncate">نشانی : {doctor.address}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
