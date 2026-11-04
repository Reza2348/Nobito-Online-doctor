"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  calendarDayKey,
  getLocalCalendarDay,
} from "@/lib/appointmentSlots";

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

const PROVIDER_TYPE_BY_ID_PARAM: Record<string, string> = {
  doctorId: "doctor",
  clinicId: "clinic",
  consultantId: "consultant",
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
  const [pickedSlotId, setSlotId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState<{ key: string; times: number[] }>({
    key: "",
    times: [],
  });
  const [now, setNow] = useState<number>(() => Date.now());
  const [refreshKey, setRefreshKey] = useState(0);

  // جلوگیری از ثبت دوباره در فاصلهٔ بین کلیک و رندر
  const submittingRef = useRef(false);

  const providerType = PROVIDER_TYPE_BY_ID_PARAM[idParamName] ?? "doctor";
  const providerId = String(id);

  /**
   * فقط مشاوره‌های حضوری و آنلاین نیاز به انتخاب زمان دارند.
   */
  const needsSlot = type === "inPerson" || type === "video";

  const slotType: SlotType | null = needsSlot ? (type as SlotType) : null;

  const dayKey = calendarDayKey(getLocalCalendarDay(selectedDate));

  /**
   * زمان‌های رزروشدهٔ همین روز را از سرور می‌گیرد.
   * با تغییر refreshKey (مثلاً بعد از ثبت یا خطای ۴۰۹) دوباره خوانده می‌شود.
   */
  useEffect(() => {
    if (!needsSlot) return;

    const controller = new AbortController();

    const query = new URLSearchParams({
      providerType,
      providerId,
      date: dayKey,
    });

    fetch(`/api/appointments?${query}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return;

        const data = (await response.json()) as { booked?: string[] };

        setBooked({
          key: `${providerType}:${providerId}:${dayKey}`,
          times: (data.booked ?? []).map((value) => new Date(value).getTime()),
        });
        setNow(Date.now());
      })
      .catch(() => {
        // قطع شبکه یا لغو درخواست؛ سرور هنگام ثبت دوباره بررسی می‌کند
      });

    return () => controller.abort();
  }, [needsSlot, providerType, providerId, dayKey, refreshKey]);

  const currentSlots = useMemo(() => {
    if (!slotType) {
      return [];
    }

    const bookedTimes =
      booked.key === `${providerType}:${providerId}:${dayKey}`
        ? booked.times
        : [];

    return generateSlotsForDate(selectedDate, slotType).filter(
      (slot) =>
        slot.date.getTime() > now && !bookedTimes.includes(slot.date.getTime()),
    );
  }, [slotType, selectedDate, booked, providerType, providerId, dayKey, now]);

  /**
   * اگر زمان انتخاب‌شده دیگر در لیست نباشد (روز یا نوع مشاوره عوض شده یا
   * رزرو شده)، اولین زمان آزاد انتخاب می‌شود؛ بدون effect و بدون زمانِ
   * «نمایش‌داده‌شده ولی انتخاب‌نشده».
   */
  const slotId = currentSlots.some((slot) => slot.id === pickedSlotId)
    ? pickedSlotId
    : currentSlots[0]?.id;

  const currentPrice =
    slotType && priceByType ? (priceByType[slotType] ?? null) : null;

  const selectedSlot = currentSlots.find((slot) => slot.id === slotId);

  const feedbackUrl = `${feedbackPath}?${idParamName}=${encodeURIComponent(
    providerId,
  )}`;

  const resolvedChatHref =
    chatHref ?? `/Chat?${idParamName}=${encodeURIComponent(providerId)}`;

  const handleBook = useCallback(async () => {
    if (submittingRef.current || !slotType || !selectedSlot) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerType,
          providerId,
          consultType: slotType,
          startsAt: selectedSlot.date.toISOString(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (response.status === 401) {
        toast.error("ابتدا وارد حساب کاربری شوید");

        router.push(`/auth/signup?redirect=${encodeURIComponent(feedbackUrl)}`);

        return;
      }

      if (response.status === 409) {
        toast.error(data?.message ?? "این زمان قبلاً رزرو شده است.");

        setRefreshKey((value) => value + 1);

        return;
      }

      if (!response.ok) {
        toast.error(data?.message ?? "ثبت نوبت ناموفق بود.");

        return;
      }

      toast.success("نوبت شما با موفقیت ثبت شد ✅");

      setRefreshKey((value) => value + 1);

      router.push(feedbackUrl);
    } catch (err) {
      console.error("Booking request failed:", err);

      toast.error("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }, [
    feedbackUrl,
    providerId,
    providerType,
    router,
    selectedSlot,
    slotType,
  ]);

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
