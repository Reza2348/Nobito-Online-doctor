"use client";

import React from "react";
import { FaUserMd, FaCalendarAlt, FaClock } from "react-icons/fa";

const appointments = [
  {
    id: 1,
    doctor: "دکتر عباس میراحمدی",
    specialty: "قلب و عروق",
    day: "شنبه تا چهارشنبه",
    time: "09:00 - 15:00",
  },
  {
    id: 2,
    doctor: "دکتر مهران مهام",
    specialty: "متخصص کلیه و مجاری ادراری",
    day: "یکشنبه تا پنجشنبه",
    time: "10:00 - 16:00",
  },
  {
    id: 3,
    doctor: "دکتر محمد ابراهیمی",
    specialty: "ارتوپدی",
    day: "شنبه و سه‌شنبه",
    time: "11:00 - 14:00",
  },
];

const AppointmentCard: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black mb-12">نوبت‌دهی پزشکان</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {appointments.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03]"
            >
              {/* آیکون دایره‌ای پزشک */}
              <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-4xl transition-colors duration-300 group-hover:bg-teal-100">
                <FaUserMd />
              </div>

              {/* نام و تخصص */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-emerald-600">
                {item.doctor}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {item.specialty}
              </p>

              {/* روز و ساعت */}
              <div className="text-sm text-gray-700 space-y-2 mb-6 text-right">
                <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                  <FaCalendarAlt className="text-teal-600 shrink-0" />
                  <span>{item.day}</span>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                  <FaClock className="text-teal-600 shrink-0" />
                  <span>{item.time}</span>
                </div>
              </div>

              {/* دکمه رزرو */}
              <button className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-2 rounded-xl duration-300 transform hover:scale-105">
                رزرو نوبت
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppointmentCard;
