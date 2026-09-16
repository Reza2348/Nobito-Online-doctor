"use client";

import { FC, useState } from "react";
import Image from "next/image";
import SearchBox from "@/components/SearchBox/SearchBox";

const HeroBanner: FC = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  return (
    <section
      dir="rtl"
      aria-label="جستجوی پزشک و خدمات درمانی"
      className="w-full"
    >
      {/* Hero */}
      <div className="relative w-full">
        {/* Hero Image - Mobile (کامل، بدون برش) */}
        <div
          className="
            relative
            w-full
            sm:hidden
          "
        >
          <Image
            src="/Banner 2.png"
            alt="تا ۵۰٪ تخفیف خدمات دندانپزشکی"
            width={720}
            height={960}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Hero Image - Desktop (یکدست، بدون تکه‌تکه شدن) */}
        <div
          className="
            relative
            hidden
            h-70
            w-full
            overflow-hidden
            sm:block
            sm:h-80
            md:h-95
          "
        >
          <Image
            src="/Banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Search Box */}
        <div
          className="
            relative
            z-20
            mx-auto
            w-full
            max-w-4xl
            px-4
            pt-4

            sm:absolute
            sm:bottom-0
            sm:left-1/2
            sm:-translate-x-1/2
            sm:translate-y-1/2
            sm:px-5
            sm:pt-0
          "
        >
          <SearchBox
            search={search}
            setSearch={setSearch}
            city={city}
            setCity={setCity}
          />
        </div>
      </div>

      {/* Space for SearchBox */}
      <div
        aria-hidden="true"
        className="
          h-4
          sm:h-24
          md:h-28
        "
      />
    </section>
  );
};

export default HeroBanner;
