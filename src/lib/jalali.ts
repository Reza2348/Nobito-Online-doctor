import dayjs, { type Dayjs } from "dayjs";
import jalaliday from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalaliday);
dayjs.locale("fa");

type DateInput = Dayjs | Date | string | number;

const PERSIAN_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(
    /[0-9]/g,
    (digit) => PERSIAN_DIGITS[Number(digit)],
  );
}

export function toJalali(date?: DateInput) {
  return dayjs(date).calendar("jalali");
}

export function formatJalaliDayLabel(date: DateInput): string {
  return toPersianDigits(toJalali(date).format("dddd D MMMM"));
}

export function formatJalaliDate(date: DateInput): string {
  return toPersianDigits(toJalali(date).format("YYYY/MM/DD"));
}

export function formatTime(date: DateInput): string {
  return toPersianDigits(dayjs(date).format("HH:mm"));
}
