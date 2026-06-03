"use client";
import React from "react";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import StatsBar from "@/components/StatsBar/StatsBar";
import Card from "@/components/Card/page";
import Banner from "@/app/Banner/page";

const Page = () => {
  return (
    <div>
      <HeroBanner />
      <StatsBar />
      <Card />
      <Banner />
    </div>
  );
};

export default Page;
