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
        {/* Hero Images */}
        <div
          className="
            grid
            h-70
            w-full
            grid-cols-3
            overflow-hidden
            sm:h-80
            md:h-95
          "
        >
          <div className="relative h-full min-w-0 overflow-hidden">
            <Image
              src="/Hedear.png"
              alt=""
              fill
              priority
              sizes="33vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative h-full min-w-0 overflow-hidden">
            <Image
              src="/Hedear (1).png"
              alt=""
              fill
              sizes="33vw"
              className="object-cover object-center"
            />
          </div>

          <div className="relative h-full min-w-0 overflow-hidden">
            <Image
              src="/Hedear (2).png"
              alt=""
              fill
              sizes="33vw"
              className="object-cover object-center"
            />
          </div>
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
