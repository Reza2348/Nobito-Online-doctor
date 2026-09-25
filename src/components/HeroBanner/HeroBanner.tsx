"use client";
import { FC, useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { FaQuoteRight } from "react-icons/fa";

const HeroBanner: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Cpath d='M26 10h8v12h12v8H34v12h-8V30H14v-8h12z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center w-full max-w-3xl">
        <div>
          <span className="flex text-amber-400 text-4xl">
            <FaQuoteRight />
          </span>
          <p className="text-white text-md sm:text-xl md:text-4xl font-bold leading-loose mb-4">
            تلاش ما دسترسی{" "}
            <span className="bg-[#FFE4BC] text-teal-800 px-2 sm:px-3 py-0.5 rounded-md">
              سریعتر و آسان
            </span>{" "}
            <span className="flex text-center justify-center">
              {" "}
              شما به خدمات پزشکی است
            </span>
          </p>
          <p className="text-white/85 text-sm sm:text-sm sm:text-[13px]">
            کافیست خدمات درمانی موردنظر خود را جستجو کنید
          </p>
          <p className="text-white/70 text-xs sm:text-sm mb-8">
            (دریافت نوبت، مشاوره پزشکی، خدمات پزشکی در منزل)
          </p>
          <span className="flex  items-end justify-end mb-2  text-amber-400 text-4xl">
            <FaQuoteRight />
          </span>
        </div>

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
