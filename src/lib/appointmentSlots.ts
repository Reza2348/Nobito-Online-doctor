import type { Slot, SlotType } from "@/Types/types";

/**
 * زمان‌های نوبت‌دهی بر اساس وقت تهران تعریف می‌شوند.
 * ایران از ۱۴۰۱ ساعت تابستانی ندارد، پس آفست ثابت +03:30 است.
 * این فایل هم در کلاینت و هم در سرور استفاده می‌شود تا هر دو
 * دقیقاً یک تعریف از «زمان معتبر» داشته باشند.
 */
export const TEHRAN_OFFSET_MINUTES = 210;

const MINUTE_MS = 60_000;

export const TIME_SLOTS_BY_TYPE: Record<
  SlotType,
  { hour: number; minute: number }[]
> = {
  inPerson: [
    { hour: 10, minute: 0 },
    { hour: 11, minute: 30 },
    { hour: 14, minute: 30 },
    { hour: 16, minute: 0 },
  ],
  video: [
    { hour: 9, minute: 30 },
    { hour: 13, minute: 15 },
    { hour: 17, minute: 0 },
    { hour: 19, minute: 0 },
  ],
};

/** حداکثر فاصلهٔ مجاز برای رزرو (روز) */
export const MAX_BOOKING_DAYS_AHEAD = 90;

export type CalendarDay = { y: number; m: number; d: number };

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** کلید روز به شکل YYYY-MM-DD */
export function calendarDayKey({ y, m, d }: CalendarDay): string {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export function parseCalendarDayKey(value: string): CalendarDay | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return null;

  const y = Number(match[1]);
  const m = Number(match[2]) - 1;
  const d = Number(match[3]);

  const probe = new Date(Date.UTC(y, m, d));

  if (
    probe.getUTCFullYear() !== y ||
    probe.getUTCMonth() !== m ||
    probe.getUTCDate() !== d
  ) {
    return null;
  }

  return { y, m, d };
}

/** روز تقویمی یک لحظه در منطقهٔ زمانی تهران */
export function getTehranCalendarDay(date: Date): CalendarDay {
  const shifted = new Date(date.getTime() + TEHRAN_OFFSET_MINUTES * MINUTE_MS);

  return {
    y: shifted.getUTCFullYear(),
    m: shifted.getUTCMonth(),
    d: shifted.getUTCDate(),
  };
}

/** روز تقویمی محلی مرورگر (همان روزی که کاربر در تقویم انتخاب کرده) */
export function getLocalCalendarDay(date: Date): CalendarDay {
  return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
}

function tehranInstant(day: CalendarDay, hour: number, minute: number): Date {
  return new Date(
    Date.UTC(day.y, day.m, day.d, hour, minute) -
      TEHRAN_OFFSET_MINUTES * MINUTE_MS,
  );
}

/** بازهٔ [شروع، پایان) یک روز تهران به‌صورت لحظهٔ UTC */
export function getTehranDayRange(day: CalendarDay): { from: Date; to: Date } {
  const from = tehranInstant(day, 0, 0);

  return { from, to: new Date(from.getTime() + 24 * 60 * MINUTE_MS) };
}

export function generateSlotsForCalendarDay(
  day: CalendarDay,
  type: SlotType,
): Slot[] {
  const key = calendarDayKey(day).replaceAll("-", "");

  return TIME_SLOTS_BY_TYPE[type].map(({ hour, minute }, index) => ({
    id: `${type}-${key}-${index}`,
    date: tehranInstant(day, hour, minute),
  }));
}

/** آیا این لحظه دقیقاً یکی از زمان‌های تعریف‌شدهٔ این نوع مشاوره است؟ */
export function isValidSlotStart(type: SlotType, startsAt: Date): boolean {
  const day = getTehranCalendarDay(startsAt);

  return generateSlotsForCalendarDay(day, type).some(
    (slot) => slot.date.getTime() === startsAt.getTime(),
  );
}

/** ساعت به وقت تهران به شکل HH:mm (با ارقام انگلیسی) */
export function formatTehranTime(date: Date): string {
  const shifted = new Date(date.getTime() + TEHRAN_OFFSET_MINUTES * MINUTE_MS);

  return `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}`;
}
