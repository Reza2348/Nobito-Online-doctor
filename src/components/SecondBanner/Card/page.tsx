import React from "react";
import Articles from "@/components/SecondBanner/Articles/Articles";
import PopularArticles from "@/components/SecondBanner/PopularArticles/PopularArticles";

const Page = () => {
  return (
    <div className="my-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p className="shrink-0 text-xl font-bold text-[#757575] sm:text-2xl">
            جدیدترین <span className="text-green-700">مقالات</span>
          </p>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* ستون اصلی: لیست مقالات */}
          <Articles />

          {/* ستون کناری: پربازدیدترین ها */}
          <PopularArticles />
        </div>
      </div>
    </div>
  );
};

export default Page;
