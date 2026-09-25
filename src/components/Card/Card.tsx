import React from "react";

import DoctorList from "@/components/DoctorList/DoctorList";
import ConsultantsList from "@/components/ConsultantsList/ConsultantsList";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import Clinics from "@/components/Clinics/Clinics";

import SectionTitle from "@/components/shared/ProviderSectionTitle/ProviderSectionTitle";

import { FiUsers, FiMessageCircle, FiHome } from "react-icons/fi";

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
