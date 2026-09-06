"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { FaPhone, FaUserFriends, FaVideo, FaCommentDots } from "react-icons/fa";
import { FiCheck, FiPhoneCall, FiMessageCircle } from "react-icons/fi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { supabase } from "@/lib/supabaseClient";
import type { ProviderTheme } from "../Theme/Theme";

type SlotType = "inPerson" | "video";

interface Slot {
  id: string;
  day: string;
  time: string;
}

interface ProviderSidebarProps {
  id: number | string;
  theme: ProviderTheme;
  /** office/secretary phone number shown on the "تلفنی" tab */
  secretaryPhone?: string;
  /** where the "متنی" tab's chat button sends the user */
  chatHref?: string;
  /** available slots per consultation type — in-person and online have separate schedules */
  slotsByType?: Record<SlotType, Slot[]>;
  /** price (تومان) per consultation type — in-person and online are usually priced differently */
  priceByType?: Record<SlotType, number>;
}

type ConsultType = "phone" | "inPerson" | "video" | "text";

const consultTypes: {
  id: ConsultType;
  icon: React.ReactNode;
  label: string;
}[] = [
  { id: "phone", icon: <FaPhone size={15} />, label: "تلفنی" },
  { id: "inPerson", icon: <FaUserFriends size={15} />, label: "حضوری" },
  { id: "video", icon: <FaVideo size={15} />, label: "آنلاین" },
  { id: "text", icon: <FaCommentDots size={15} />, label: "متنی" },
];

const defaultSlotsByType: Record<SlotType, Slot[]> = {
  inPerson: [
    { id: "ip1", day: "دوشنبه ۳ آذر", time: "۱۴:۳۰" },
    { id: "ip2", day: "دوشنبه ۳ آذر", time: "۱۶:۰۰" },
    { id: "ip3", day: "چهارشنبه ۵ آذر", time: "۱۱:۰۰" },
  ],
  video: [
    { id: "v1", day: "یکشنبه ۲ آذر", time: "۰۹:۳۰" },
    { id: "v2", day: "سه‌شنبه ۴ آذر", time: "۱۹:۰۰" },
    { id: "v3", day: "پنجشنبه ۶ آذر", time: "۱۳:۱۵" },
  ],
};

const defaultPriceByType: Record<SlotType, number> = {
  inPerson: 157000,
  video: 120000,
};

const formatToman = (value: number) => value.toLocaleString("fa-IR");

const ProviderSidebar: React.FC<ProviderSidebarProps> = ({
  id,
  theme,
  secretaryPhone = "۰۲۱-۸۳۹۳۷۸۴۸",
  chatHref,
  slotsByType = defaultSlotsByType,
  priceByType = defaultPriceByType,
}) => {
  const router = useRouter();

  const [type, setType] = React.useState<ConsultType>("inPerson");
  const [slotId, setSlotId] = React.useState(slotsByType.inPerson[0]?.id);
  const [submitting, setSubmitting] = React.useState(false);

  const needsSlot = type === "inPerson" || type === "video";
  const currentSlots = needsSlot ? slotsByType[type] : [];

  // Reset the selected slot whenever the schedule being shown changes
  // (switching between in-person / online has a different list & price).
  React.useEffect(() => {
    if (needsSlot) {
      setSlotId(currentSlots[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const feedbackUrl = `${theme.feedbackPath}?${theme.idParamName}=${encodeURIComponent(
    String(id),
  )}`;

  const resolvedChatHref =
    chatHref ?? `/Chat?${theme.idParamName}=${encodeURIComponent(String(id))}`;

  const handleBook = async () => {
    if (submitting) return;

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("ابتدا وارد حساب کاربری شوید");
        setTimeout(() => {
          router.push(
            `/auth/signup?redirect=${encodeURIComponent(feedbackUrl)}`,
          );
        }, 1200);
        return;
      }

      setSubmitting(true);
      toast.success("نوبت شما با موفقیت ثبت شد ✅");

      setTimeout(() => {
        router.push(feedbackUrl);
        setSubmitting(false);
      }, 1200);
    } catch (err) {
      console.error("AUTH CHECK ERROR:", err);
      toast.error("خطا در بررسی وضعیت ورود کاربر");
      setSubmitting(false);
    }
  };

  const activeIndex = consultTypes.findIndex((t) => t.id === type);
  const selectedSlot =
    currentSlots.find((s) => s.id === slotId) ?? currentSlots[0];
  const currentPrice = needsSlot ? priceByType[type as SlotType] : null;

  return (
    <aside
      dir="rtl"
      className="w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      {/* Header */}
      <div className="border-b border-slate-50 px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">
          {theme.sidebarTitle}
        </h2>
        <p className="mt-1 text-[12px] text-slate-400">
          {theme.sidebarSubtitle}
        </p>
      </div>

      {/* Consultation type — sliding segmented control */}
      <div className="px-5 pt-5 sm:px-6">
        <div className="relative grid grid-cols-4 rounded-2xl bg-slate-50 p-1">
          <div
            className="absolute inset-y-1 rounded-xl bg-white shadow-[0_1px_6px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out"
            style={{
              width: `calc(25% - 4px)`,
              transform: `translateX(${activeIndex * -100}%)`,
              right: "4px",
            }}
          />
          {consultTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`relative z-10 flex flex-col items-center gap-1.5 rounded-xl py-2.5 text-[10px] font-bold transition-colors ${
                type === t.id ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content — changes based on the selected consultation type */}
      <div className="px-5 pt-5 sm:px-6">
        {type === "phone" && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[11px] font-bold text-slate-400">
              شماره تماس منشی مطب
            </p>

            <a
              href={`tel:${secretaryPhone}`}
              dir="ltr"
              className="mt-3 flex items-center justify-between rounded-xl border border-sky-100 bg-white px-4 py-3 transition-colors hover:border-sky-300"
            >
              <span className="text-base font-black tracking-wider text-slate-800">
                {secretaryPhone}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                <FiPhoneCall size={16} />
              </span>
            </a>

            <p className="mt-3 text-[11px] leading-6 text-slate-400">
              برای هماهنگی نوبت تلفنی با منشی مطب تماس بگیرید.
            </p>
          </div>
        )}

        {type === "text" && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <FiMessageCircle size={20} />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">
              گفتگوی متنی با پزشک
            </p>
            <p className="mt-1 text-[11px] leading-6 text-slate-400">
              سوال خود را مستقیم برای پزشک بنویسید و پاسخ را در چت دریافت کنید.
            </p>

            <button
              type="button"
              onClick={() => router.push(resolvedChatHref)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-sky-700"
            >
              <FiMessageCircle size={15} />
              شروع گفتگو
            </button>
          </div>
        )}

        {needsSlot && (
          <>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-400">
                زمان‌های خالی · {type === "inPerson" ? "حضوری" : "آنلاین"}
              </p>
              <p className="text-[11px] font-bold text-sky-600">
                {currentPrice !== null
                  ? `${formatToman(currentPrice)} تومان`
                  : ""}
              </p>
            </div>

            <div className="space-y-2">
              {currentSlots.map((s) => {
                const active = s.id === slotId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSlotId(s.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-right transition-all ${
                      active
                        ? "border-sky-500 bg-sky-50/60"
                        : "border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        active
                          ? "border-sky-500 bg-sky-500 text-white"
                          : "border-slate-200 text-transparent"
                      }`}
                    >
                      <FiCheck size={12} strokeWidth={3} />
                    </span>

                    <span className="flex flex-1 items-baseline justify-between pr-3">
                      <span className="text-xs font-bold text-slate-700">
                        {s.day}
                      </span>
                      <span
                        dir="ltr"
                        className={`text-sm font-black tabular-nums ${
                          active ? "text-sky-700" : "text-slate-800"
                        }`}
                      >
                        {s.time}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer — only meaningful when a slot-based booking is happening */}
      {needsSlot && selectedSlot && currentPrice !== null && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-50 bg-slate-50/60 px-5 py-5 sm:px-6">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black tracking-tight text-slate-900">
                {formatToman(currentPrice)}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                تومان
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-400">
              {selectedSlot.day} · {selectedSlot.time}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBook}
            disabled={submitting}
            className={`inline-flex min-w-32 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-3 text-sm font-bold transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-sky-100 disabled:cursor-not-allowed disabled:opacity-60 ${theme.classes.bookButtonBorder}`}
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" />
            ) : (
              "رزرو نوبت"
            )}
          </button>
        </div>
      )}

      {/* Phone / text tabs get their own bottom padding since there's no footer bar */}
      {!needsSlot && <div className="pb-5 sm:pb-6" />}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </aside>
  );
};

export default ProviderSidebar;
