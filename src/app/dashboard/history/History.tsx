"use client";

import { useMemo, useState } from "react";

import { historyList } from "./historyitem";
import HistoryCard from "./HistoryCard";
import HistoryEmpty from "./HistoryEmpty";

import { HistoryStatus } from "@/Types/types";

const tabs: {
  key: HistoryStatus;
  label: string;
}[] = [
  {
    key: "current",
    label: "جاری",
  },
  {
    key: "completed",
    label: "انجام شده",
  },
  {
    key: "cancelled",
    label: "لغو شده",
  },
];

const History = () => {
  const [activeTab, setActiveTab] = useState<HistoryStatus>("current");

  const [openId, setOpenId] = useState<number | null>(null);

  const filteredHistory = useMemo(() => {
    return historyList.filter((item) => item.status === activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: HistoryStatus) => {
    setActiveTab(tab);
    setOpenId(null);
  };

  const handleToggle = (id: number) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-[#F8FAFA] px-4 py-6 font-[Tahoma] md:px-12 md:py-12"
    >
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm md:rounded-[30px]">
        {/* Header */}
        <header className="border-b border-[#E4E4E4] px-4 pt-5 md:px-8 md:pt-7">
          <h1 className="text-lg font-bold text-gray-700 md:text-xl">
            تاریخچه نوبت‌ها
          </h1>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="وضعیت نوبت‌ها"
            className="mt-5 flex gap-6 overflow-x-auto"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab.key)}
                  className={`
                    relative
                    whitespace-nowrap
                    border-b-2
                    pb-3
                    text-sm
                    transition-colors
                    md:pb-4
                    md:text-base
                    ${
                      isActive
                        ? "border-[#1F7168] font-bold text-[#1F7168]"
                        : "border-transparent text-[#919191] hover:text-[#1F7168]"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* History list */}
        <div className="px-4 md:px-8">
          {filteredHistory.length === 0 ? (
            <HistoryEmpty />
          ) : (
            filteredHistory.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default History;
