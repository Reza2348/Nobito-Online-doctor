import React from "react";
import {
  FaHospital,
  FaClinicMedical,
  FaUserMd,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const centers = [
  {
    id: 1,
    name: "بیمارستان تخصصی سلامت",
    icon: <FaHospital />,
    address: "تهران، خیابان ولیعصر",
    phone: "021-12345678",
    description: "خدمات تخصصی قلب، مغز و اعصاب و جراحی‌های پیشرفته",
  },
  {
    id: 2,
    name: "کلینیک شبانه‌روزی مهر",
    icon: <FaClinicMedical />,
    address: "کرج، میدان آزادگان",
    phone: "026-87654321",
    description: "ویزیت عمومی، آزمایشگاه و خدمات اورژانسی",
  },
  {
    id: 3,
    name: "مرکز تخصصی پزشکان برتر",
    icon: <FaUserMd />,
    address: "اصفهان، خیابان چهارباغ",
    phone: "031-22334455",
    description: "نوبت‌دهی آنلاین و مشاوره تخصصی پزشکان",
  },
];

const TreatmentCenters = () => {
  return (
    <section className="bg-gray-50 py-16 px-4" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          مراکز درمانی
        </h2>

        <p className="text-gray-600 mb-12">
          لیست مراکز درمانی معتبر و قابل اعتماد
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {centers.map((center) => (
            <div
              key={center.id}
              className="group bg-white rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* آیکون مرکز */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 text-4xl mx-auto mb-4 transition-colors duration-300 group-hover:bg-teal-200">
                {center.icon}
              </div>

              {/* نام مرکز */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-emerald-600">
                {center.name}
              </h3>

              {/* توضیحات */}
              <p className="text-gray-500 text-sm mb-4 leading-snug">
                {center.description}
              </p>

              {/* آدرس و تلفن */}
              <div className="text-sm text-gray-600 space-y-2 mb-4 w-full">
                <div className="flex items-center gap-2  bg-gray-50 rounded-lg p-2">
                  <FaMapMarkerAlt className="text-teal-600 shrink-0" />
                  <span>{center.address}</span>
                </div>

                <div className="flex items-center gap-2  bg-gray-50 rounded-lg p-2">
                  <FaPhoneAlt className="text-teal-600 shrink-0" />
                  <span>{center.phone}</span>
                </div>
              </div>

              {/* دکمه مشاهده جزئیات */}
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl transition duration-300 transform hover:scale-105">
                مشاهده جزئیات
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentCenters;
