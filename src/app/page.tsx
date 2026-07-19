import React from "react";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import StatsBar from "@/components/StatsBar/StatsBar";
import Card from "@/components/Card/Card";
import Banner from "@/app/Banner/page";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import Nobitofeedback from "@/components/Nobitofeedback/Nobitofeedback";

const Page = () => {
  return (
    <div>
      <HeroBanner />
      <StatsBar />
      <Card />
      <Banner />
      <HeroSection />
      <Nobitofeedback />
    </div>
  );
};

export default Page;
