"use client";

import React, { useState } from "react";
import { FaBullhorn, FaBell, FaStethoscope } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

import {
  useMarkMessagesRead,
  useMessages,
  type MessageKind,
} from "@/hooks/useMyData";

type Tab = "all" | "notify" | "doctor";

const TABS: Tab[] = ["all", "notify", "doctor"];

// اعلان‌های عمومی و اطلاع‌رسانی هر دو زیر تب «اطلاع رسانی‌ها» می‌آیند
const TAB_KINDS: Record<Exclude<Tab, "all">, MessageKind[]> = {
  notify: ["announcement", "notify"],
  doctor: ["doctor"],
};

const KIND_ICON: Record<MessageKind, React.ReactNode> = {
  announcement: (
    <FaBullhorn className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#1F7168] text-white rounded-full" />
  ),
  notify: (
    <FaBell className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#FFB342] text-[#292D32] rounded-full" />
  ),
  doctor: (
    <FaStethoscope className="w-9 h-9 md:w-11 md:h-11 p-2 bg-[#0683C9] text-white rounded-full" />
  ),
};

export default function Message() {
  const [tab, setTab] = useState<Tab>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useMessages();
  const markRead = useMarkMessagesRead();

  const all = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;

  const messages =
    tab === "all" ? all : all.filter((m) => TAB_KINDS[tab].includes(m.kind));

  const handleToggle = (id: string, isRead: boolean) => {
    setOpenId((current) => (current === id ? null : id));

    // باز کردن پیام = خوانده شدن
    if (!isRead) {
      markRead.mutate(id);
    }
  };

  return (
    <div className="w-full min-h-screen  px-4 md:px-12 py-6 md:py-12 font-[Tahoma]">
      <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
        {/* هدر */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-8 py-4 md:py-6 border-b border-[#E4E4E4]">
          <h2 className="text-lg md:text-xl font-bold text-gray-700">
            پیغام‌ها
          </h2>

          <button
            type="button"
            onClick={() => markRead.mutate(undefined)}
            disabled={unreadCount === 0 || markRead.isPending}
            className="flex items-center gap-2 text-sm text-[#1F7168] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaBell className="w-4 h-4" />
            تغییر پیغام‌ها به خوانده شده
          </button>
        </div>

        {/* تب‌ها */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 px-4 md:px-8 py-4 border-b border-[#E4E4E4]">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm rounded-full border whitespace-nowrap transition-all ${
                tab === t
                  ? "text-[#1F7168] border-[#1F7168]"
                  : "text-[#919191] border-[#E4E4E4]"
              }`}
              onClick={() => setTab(t)}
            >
              {t === "all" && "همه پیام‌ها"}
              {t === "notify" && (
                <>
                  <FaBell className="w-3 h-3 md:w-4 md:h-4" /> اطلاع رسانی‌ها
                </>
              )}
              {t === "doctor" && (
                <>
                  <FaStethoscope className="w-3 h-3 md:w-4 md:h-4" /> دستور پزشک
                </>
              )}
            </button>
          ))}
        </div>

        {/* لیست پیام‌ها */}
        <div className="px-4 md:px-6">
          {isLoading && (
            <p className="py-10 text-center text-sm text-gray-400">
              در حال دریافت پیام‌ها...
            </p>
          )}

          {isError && (
            <div
              role="alert"
              className="my-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span>دریافت پیام‌ها انجام نشد.</span>
              <button
                type="button"
                onClick={() => refetch()}
                className="font-bold underline"
              >
                تلاش دوباره
              </button>
            </div>
          )}

          {!isLoading && !isError && messages.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">
              پیامی برای نمایش وجود ندارد.
            </p>
          )}

          {messages.map((msg) => {
            const isOpen = openId === msg.id;

            return (
              <div
                key={msg.id}
                className="flex items-start gap-3 md:gap-4 py-4 md:py-5 border-b border-[#E4E4E4] last:border-0"
              >
                {/* 🔵 نقطه نخوانده */}
                {!msg.isRead && (
                  <div
                    aria-label="خوانده نشده"
                    className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"
                  ></div>
                )}

                {/* آیکون */}
                <div className="shrink-0">{KIND_ICON[msg.kind]}</div>

                {/* محتوا */}
                <div className="flex-1">
                  <h3 className="text-[#414141] font-semibold text-sm md:text-base leading-6">
                    {msg.title}
                  </h3>

                  <p
                    className={`text-[#919191] text-xs md:text-sm mt-1 leading-5 ${
                      isOpen ? "" : "line-clamp-2"
                    }`}
                  >
                    {msg.body}
                  </p>

                  <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => handleToggle(msg.id, msg.isRead)}
                      aria-expanded={isOpen}
                      className="flex items-center gap-1 text-[#0683C9] text-xs md:text-sm"
                    >
                      {isOpen ? "بستن جزئیات" : "جزئیات بیشتر"}
                      <FaChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <span className="text-[#919191] text-[11px] md:text-xs">
                      {msg.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
