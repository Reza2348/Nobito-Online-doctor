"use client";

import React from "react";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaUserMd,
  FaFileMedical,
} from "react-icons/fa";

const MedicalCharter: React.FC = () => {
  return (
    <section dir="rtl" className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            میثاق‌نامه اخلاق حرفه‌ای
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-8">
            ما متعهد به ارائه خدمات سلامت با بالاترین استانداردهای اخلاقی، علمی
            و انسانی هستیم. این میثاق‌نامه نشان‌دهنده تعهد ما به بیماران و جامعه
            پزشکی است.
          </p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item 1 */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-teal-600 text-2xl" />
              <h3 className="font-bold text-lg text-gray-900">
                حفظ محرمانگی اطلاعات
              </h3>
            </div>
            <p className="text-gray-600 leading-7">
              تمامی اطلاعات بیماران با بالاترین سطح امنیت و محرمانگی نگهداری شده
              و از دسترسی‌های غیرمجاز محافظت می‌شود.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <FaHeartbeat className="text-teal-600 text-2xl" />
              <h3 className="font-bold text-lg text-gray-900">
                اولویت سلامت بیمار
              </h3>
            </div>
            <p className="text-gray-600 leading-7">
              سلامت و رفاه بیماران همواره در اولویت تصمیمات ما قرار دارد و تمامی
              خدمات با رعایت اصول علمی و انسانی ارائه می‌شود.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <FaUserMd className="text-teal-600 text-2xl" />
              <h3 className="font-bold text-lg text-gray-900">
                صداقت و شفافیت
              </h3>
            </div>
            <p className="text-gray-600 leading-7">
              اطلاعات خدمات، هزینه‌ها و فرآیندهای درمانی به صورت شفاف در اختیار
              کاربران قرار می‌گیرد تا امکان تصمیم‌گیری آگاهانه فراهم شود.
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-4">
              <FaFileMedical className="text-teal-600 text-2xl" />
              <h3 className="font-bold text-lg text-gray-900">
                پایبندی به استانداردهای علمی
              </h3>
            </div>
            <p className="text-gray-600 leading-7">
              تمامی پزشکان عضو سامانه دارای مجوزهای معتبر بوده و خدمات مطابق با
              آخرین دستورالعمل‌های علمی ارائه می‌شود.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalCharter;
