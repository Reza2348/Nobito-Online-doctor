"use client";

import React from "react";
import { FaUserNurse, FaPhoneAlt, FaClock } from "react-icons/fa";

const volunteers = [
  {
    id: 1,
    name: "دکتر سارا رضایی",
    specialty: "روانشناسی کودک",
    status: "آماده ارائه خدمات",
    phone: "021-5551234",
  },
  {
    id: 2,
    name: "دکتر امیر کریمی",
    specialty: "فیزیوتراپی",
    status: "آنلاین",
    phone: "021-5555678",
  },
  {
    id: 3,
    name: "دکتر لیلا حسینی",
    specialty: "روانشناسی بزرگسال",
    status: "آماده ارائه خدمات",
    phone: "021-5559876",
  },
];

const VolunteerTherapist: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-black mb-4">
          درمانگران داوطلب
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto leading-7">
          تیمی از درمانگران داوطلب آماده ارائه خدمات تخصصی پزشکی و روانشناسی.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {volunteers.map((vol) => (
          <div
            key={vol.id}
            className="group bg-white rounded-3xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:scale-[1.03]"
          >
            {/* آیکون دایره‌ای درمانگر */}
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-5xl mb-4 transition-colors duration-300 group-hover:bg-emerald-100">
              <FaUserNurse />
            </div>

            {/* نام و تخصص */}
            <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
              {vol.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{vol.specialty}</p>
            <p className="text-sm text-teal-600 mb-4 font-medium">
              {vol.status}
            </p>

            {/* تلفن و زمان */}
            <div className="flex flex-col gap-2 w-full text-sm text-gray-700 mb-6">
              <div className="flex items-center gap-2 justify-center bg-blue-50 rounded-lg p-2">
                <FaPhoneAlt className="text-teal-600" />
                <span>{vol.phone}</span>
              </div>
            </div>

            {/* دکمه تماس */}
            <button className="w-full bg-emerald-600 text-white py-2 rounded-xl font-semibold shadow hover:bg-emerald-700 transition transform hover:scale-105">
              تماس با درمانگر
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VolunteerTherapist;
