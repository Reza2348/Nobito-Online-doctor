"use client";
import { FC, useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";

const HeroBanner: FC = () => {
  const [mounted, setMounted] = useState(false); // برای حل مشکل hydration
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true); // بعد از mount، render شود
  }, []);

  if (!mounted) return null; // تا قبل از mount چیزی render نشود

  return (
    <div
      dir="rtl"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-14 sm:py-20"
      style={{
        background:
          "linear-gradient(135deg, #2d7a6a 0%, #1e5f52 40%, #3a8a72 70%, #2d7a6a 100%)",
        fontFamily: "'Vazirmatn', 'Tahoma', sans-serif",
      }}
    >
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M26 10h8v12h12v8H34v12h-8V30H14v-8h12z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-3xl">
        <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold leading-loose mb-4">
          تلاش ما دسترسی{" "}
          <span className="bg-yellow-300 text-teal-800 px-2 sm:px-3 py-0.5 rounded-md">
            سریع‌تر و آسان‌تر
          </span>{" "}
          شما به خدمات پزشکی است
        </h1>

        <p className="text-white/85 text-sm sm:text-base mb-2">
          کافیست خدمات درمانی موردنظر خود را جستجو کنید
        </p>
        <p className="text-white/70 text-xs sm:text-sm mb-8">
          (دریافت نوبت، مشاوره پزشکی، خدمات پزشکی در منزل)
        </p>

        {/* SearchBox */}
        <SearchBox
          search={search}
          setSearch={setSearch}
          city={city}
          setCity={setCity}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
