"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ConsultTypeTabs from "@/components/shared/Providersidebar/ConsultTypeTabs/ConsultTypeTabs";
import PhoneTab from "@/components/shared/Providersidebar/PhoneTab/PhoneTab";
import TextTab from "@/components/shared/Providersidebar/TextTab/TextTab";
import DayPickerButton from "@/components/shared/Providersidebar/DayPickerButton/DayPickerButton";
import SlotList from "@/components/shared/Providersidebar/SlotList/SlotList";
import BookingFooter from "@/components/shared/Providersidebar/BookingFooter/BookingFooter";
import { useProviderBooking } from "@/hooks/useProviderBooking";

import type { ProviderSidebarProps, SlotType } from "@/Types/types";

export default function ProviderSidebar({
  id,
  theme,
  secretaryPhone = "۰۲۱-۸۳۹۳۷۸۴۸",
  chatHref,
  priceByType,
}: ProviderSidebarProps) {
  const {
    type,
    setType,
    selectedDate,
    setSelectedDate,
    slotId,
    setSlotId,
    submitting,
    needsSlot,
    currentSlots,
    currentPrice,
    selectedSlot,
    resolvedChatHref,
    handleBook,
  } = useProviderBooking({
    id,
    chatHref,
    priceByType,
    idParamName: theme.idParamName,
    feedbackPath: theme.feedbackPath,
  });

  return (
    <aside
      dir="rtl"
      className="w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    >
      <div className="border-b border-slate-50 px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">
          {theme.sidebarTitle}
        </h2>
        <p className="mt-1 text-[12px] text-slate-400">
          {theme.sidebarSubtitle}
        </p>
      </div>

      <ConsultTypeTabs activeType={type} onChange={setType} />

      <div className="px-5 pt-5 sm:px-6">
        {type === "phone" && <PhoneTab secretaryPhone={secretaryPhone} />}

        {type === "text" && <TextTab chatHref={resolvedChatHref} />}

        {needsSlot && (
          <div className="space-y-4">
            <DayPickerButton
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />

            {currentPrice !== null && (
              <SlotList
                type={type as SlotType}
                slots={currentSlots}
                selectedSlotId={slotId}
                price={currentPrice}
                onSelect={setSlotId}
              />
            )}
          </div>
        )}
      </div>

      {needsSlot && selectedSlot && currentPrice !== null ? (
        <BookingFooter
          price={currentPrice}
          selectedSlot={selectedSlot}
          submitting={submitting}
          bookButtonBorderClass={theme.classes.bookButtonBorder}
          onBook={handleBook}
        />
      ) : (
        <div className="pb-5 sm:pb-6" />
      )}

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
}
