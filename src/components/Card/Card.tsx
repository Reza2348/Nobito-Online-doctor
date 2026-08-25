import React from "react";

import DoctorList from "@/components/DoctorList/DoctorList";
import ConsultantsList from "@/components/ConsultantsList/ConsultantsList";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import Clinics from "@/components/Clinics/Clinics";

import { FiUsers, FiMessageCircle, FiHome, FiArrowLeft } from "react-icons/fi";

interface SectionTitleProps {
  icon: React.ReactNode;
  title: string;
  highlight: string;
  description: string;
  action?: string;
}

const SectionTitle = ({
  icon,
  title,
  highlight,
  description,
  action = "مشاهده همه",
}: SectionTitleProps) => {
  return (
    <div
      className="
      mb-8
      flex
      items-center
      gap-4
      "
    >
      {/* Icon */}

      <div
        className="
        flex
        h-14
        w-14
        shrink-0
        items-center
        justify-center
        rounded-3xl
        bg-linear-to-br
        from-emerald-50
        to-teal-100
        text-emerald-600
        shadow-sm
        "
      >
        {icon}
      </div>

      {/* Title */}

      <div className="flex-1 text-right">
        <h2 className="text-2xl font-black text-gray-900">
          {title} <span className="text-emerald-600">{highlight}</span>
        </h2>

        <p className="mt-1 text-sm text-gray-400">{description}</p>

        <div
          className="
          mt-3
          h-0.75
          w-full
          rounded-full
         bg-linear-to-l
          from-emerald-500
          via-emerald-200
          to-transparent
          "
        />
      </div>

      {/* Action */}

      <button
        className="
        group
        hidden
        items-center
        gap-2
        rounded-full
        bg-emerald-50
        px-5
        py-2.5
        text-sm
        font-bold
        text-emerald-700
        transition-all
        duration-300
        hover:bg-emerald-600
        hover:text-white
        sm:flex
        "
      >
        {action}

        <FiArrowLeft
          className="
          transition-transform
          duration-300
          group-hover:-translate-x-1
          "
        />
      </button>
    </div>
  );
};

const Page = () => {
  return (
    <main
      className="
      space-y-20
      py-8
      "
    >
      <section className="px-4 sm:px-6 lg:px-10">
        <SectionTitle
          icon={<FiUsers size={26} />}
          title="برترین"
          highlight="پزشکان"
          description="پزشکان محبوب با بیشترین میزان رضایت کاربران"
          action="همه پزشکان"
        />

        <DoctorList />
      </section>

      <section className="px-4 sm:px-6 lg:px-10">
        <SectionTitle
          icon={<FiMessageCircle size={26} />}
          title="مشاورین"
          highlight="آنلاین"
          description="گفتگو با مشاوران مجرب به صورت آنلاین"
          action="همه مشاورین"
        />

        <ConsultantsList />
      </section>

      <section className="px-4 sm:px-6 lg:px-10">
        <ServicesSection />
      </section>

      <section className="px-4 sm:px-6 lg:px-10">
        <SectionTitle
          icon={<FiHome size={26} />}
          title="بهترین"
          highlight="مراکز درمانی"
          description="کلینیک‌های معتبر با امکانات کامل درمانی"
          action="همه کلینیک‌ها"
        />

        <Clinics />
      </section>
    </main>
  );
};

export default Page;
