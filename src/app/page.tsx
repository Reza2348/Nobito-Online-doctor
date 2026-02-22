"use client"; // این صفحه نیاز به Client Component ندارد ولی گذاشتن آن ایراد ندارد
import React from "react";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import StatsBar from "@/components/StatsBar/StatsBar";
import Card from "@/components/Card/page";

const Page = () => {
  return (
    <div>
      <HeroBanner />
      <StatsBar />
      <Card />
    </div>
  );
};

export default Page;
