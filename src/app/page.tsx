"use client";
import React from "react";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import StatsBar from "@/components/StatsBar/StatsBar";
import Card from "@/components/Card/page";
import Banner from "@/app/Banner/page";
import { HeroSection } from "@/components/HeroSection/HeroSection";

const Page = () => {
  return (
    <div>
      <HeroBanner />
      <StatsBar />
      <Card />
      <Banner />
      <HeroSection />
    </div>
  );
};

export default Page;
