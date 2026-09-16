"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { supabase } from "@/lib/supabaseClient";

import {
  defaultPriceByType,
  generateSlotsForDate,
} from "@/components/shared/Providersidebar/constants/constants";

import type {
  ConsultType,
  ProviderSidebarProps,
  SlotType,
} from "@/Types/types";

type UseProviderBookingArgs = Pick<
  ProviderSidebarProps,
  "id" | "chatHref" | "priceByType"
> & {
  idParamName: string;
  feedbackPath: string;
};

export function useProviderBooking({
  id,
  chatHref,
  priceByType = defaultPriceByType,
  idParamName,
  feedbackPath,
}: UseProviderBookingArgs) {
  const router = useRouter();

  const [type, setType] = useState<ConsultType>("inPerson");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [slotId, setSlotId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  /**
   * فقط مشاوره‌های حضوری و آنلاین نیاز به انتخاب زمان دارند.
   */
  const needsSlot = type === "inPerson" || type === "video";

  /**
   * برای جلوگیری از cast غیرضروری، فقط زمانی SlotType ساخته می‌شود
   * که نوع مشاوره واقعاً یکی از انواع دارای slot باشد.
   */
  const slotType: SlotType | null = needsSlot ? (type as SlotType) : null;

  const currentSlots = useMemo(() => {
    if (!slotType) {
      return [];
    }

    return generateSlotsForDate(selectedDate, slotType);
  }, [selectedDate, slotType]);

  /**
   * وقتی تاریخ یا نوع مشاوره تغییر می‌کند،
   * اولین slot به صورت خودکار انتخاب می‌شود.
   *
   * این کار نباید مستقیماً داخل render انجام شود.
   */
  useEffect(() => {
    if (!needsSlot) {
      setSlotId(undefined);
      return;
    }

    setSlotId(currentSlots[0]?.id);
  }, [needsSlot, selectedDate, type, currentSlots]);

  const currentPrice =
    slotType && priceByType ? (priceByType[slotType] ?? null) : null;

  const selectedSlot =
    currentSlots.find((slot) => slot.id === slotId) ?? currentSlots[0];

  const feedbackUrl = `${feedbackPath}?${idParamName}=${encodeURIComponent(
    String(id),
  )}`;

  const resolvedChatHref =
    chatHref ?? `/Chat?${idParamName}=${encodeURIComponent(String(id))}`;

  const handleBook = useCallback(async () => {
    if (submitting) {
      return;
    }

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
      console.error("Booking auth check failed:", err);

      toast.error("خطا در بررسی وضعیت ورود کاربر");
      setSubmitting(false);
    }
  }, [feedbackUrl, router, submitting]);

  return {
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
  };
}
