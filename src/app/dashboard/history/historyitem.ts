import { HistoryItem } from "@/Types/types";

export const historyList: HistoryItem[] = [
  {
    id: 1,
    doctorName: "دکتر بهرام میرزایی",
    specialty: "متخصص مغز و اعصاب",
    avatar: "/doctor-1.jpg.jfif",
    iconType: "video",
    type: "ویزیت آنلاین",
    note: "نیاز به پیگیری و مراجعه مجدد در یک ماه آینده است.",
    date: "۱۴۰۲/۱۱/۱۲ - ساعت ۱۴:۳۰",
    status: "current",
  },

  {
    id: 2,
    doctorName: "دکتر نازنین کریمی",
    specialty: "متخصص پوست و مو",
    avatar: "/doctor-2.jpg.jfif",
    iconType: "video",
    type: "ویزیت آنلاین",
    note: "روند درمان مناسب است و ادامه مصرف داروها طبق دستور پزشک توصیه می‌شود.",
    date: "۱۴۰۲/۱۱/۱۵ - ساعت ۱۷:۰۰",
    status: "current",
  },

  {
    id: 3,
    doctorName: "دکتر محمد رضایی",
    specialty: "متخصص ارتوپدی",
    avatar: "/wepik (9).png",
    iconType: "doctor",
    type: "ویزیت حضوری",
    note: "برای بررسی دقیق‌تر، انجام تصویربرداری و مراجعه مجدد توصیه می‌شود.",
    date: "۱۴۰۲/۱۱/۱۸ - ساعت ۱۱:۳۰",
    status: "current",
  },

  {
    id: 4,
    doctorName: "دکتر سارا احمدی",
    specialty: "متخصص داخلی",
    avatar: "/doctor-3.jpg",
    iconType: "phone",
    type: "مشاوره تلفنی",
    note: "مصرف داروها طبق دستور پزشک ادامه پیدا کند.",
    date: "۱۴۰۲/۱۱/۰۳ - ساعت ۱۰:۰۰",
    status: "completed",
  },

  {
    id: 5,
    doctorName: "دکتر علی رضایی",
    specialty: "متخصص قلب",
    avatar: "/doctor-4.jpg",
    iconType: "doctor",
    type: "ویزیت حضوری",
    note: "این نوبت توسط بیمار لغو شده است.",
    date: "۱۴۰۲/۱۰/۲۰ - ساعت ۱۶:۰۰",
    status: "cancelled",
  },
];
