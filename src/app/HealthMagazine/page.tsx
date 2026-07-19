import React from "react";
import SecondBanner from "@/components/SecondBanner/SecondBanner";
import StatsBar from "@/components/SecondBanner/StatsBar/StatsBar";
import Card from "@/components/SecondBanner/Card/Card";

const Page = () => {
  return (
    <div className="flex flex-col">
      <SecondBanner />
      <StatsBar />
      <Card />
    </div>
  );
};

export default Page;
