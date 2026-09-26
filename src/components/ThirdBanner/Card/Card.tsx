import React from "react";

import Beauty from "@/components/ThirdBanner/Beauty/Beauty";
import Discounts from "@/components/ThirdBanner/Discounts/Discounts";
import Banner from "@/components/ThirdBanner/Banner/Banner";

import SectionTitle from "@/components/shared/ProviderSectionTitle/ProviderSectionTitle";

import { FiSmile } from "react-icons/fi";

const Page = () => {
  return (
    <main className="space-y-20 py-8">
      {/* BEAUTY */}
      <section className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <SectionTitle
          icon={<FiSmile size={26} />}
          title="تخفیفات"
          highlight="کلینیک‌های زیبایی"
          description="بهترین پیشنهادهای خدمات زیبایی با تخفیف ویژه"
          action="همه تخفیف‌ها"
        />

        <Beauty />
      </section>

      {/* DISCOUNTS */}
      <section className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <SectionTitle
          icon={<FiSmile size={26} />}
          highlight="کلینیک‌های زیبایی"
          description="بهترین پیشنهادهای خدمات زیبایی با تخفیف ویژه"
          action="همه تخفیف‌ها"
        />

        <Discounts />
      </section>

      <section className="px-4 sm:px-6 lg:px-10">
        <Banner />
      </section>
    </main>
  );
};

export default Page;
