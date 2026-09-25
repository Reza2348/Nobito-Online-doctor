import React from "react";
import ThirdBanner from "@/components/ThirdBanner/ThirdBanner";
import StatsBar from "@/components/ThirdBanner/StatsBar/StatsBar";
import Card from "@/components/ThirdBanner/Card/Card";

const Page = () => {
  return (
    <div className="flex flex-col">
      <ThirdBanner />
      <StatsBar />
      <Card />
    </div>
  );
};

export default Page;
