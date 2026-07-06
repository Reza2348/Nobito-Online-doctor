"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import SearchBox from "@/components/SearchBox/SearchBox";

const HeroBanner: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section dir="rtl" className="relative w-full">
      {/* تصاویر */}
      <div className="grid grid-cols-3 h-80 md:h-95 overflow-hidden">
        <div className="relative">
          <Image
            src="/Hedear.png"
            alt="Doctor"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative">
          <Image
            src="/Hedear (1).png"
            alt="Nutrition"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative">
          <Image
            src="/Hedear (2).png"
            alt="Skin Care"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* SearchBox */}
      <div className="absolute bottom-8 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 translate-y-1/2 px-4">
        <div className="rounded-xl p-4 ">
          <SearchBox
            search={search}
            setSearch={setSearch}
            city={city}
            setCity={setCity}
          />
        </div>
      </div>

      {/* فاصله برای سکشن بعدی */}
      <div className="h-24 md:h-28"></div>
    </section>
  );
};

export default HeroBanner;
