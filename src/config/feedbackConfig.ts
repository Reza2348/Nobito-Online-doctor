import type { FeedbackConfig, FeedbackType } from "@/Types/types";

export const feedbackConfig: Record<FeedbackType, FeedbackConfig> = {
  doctor: {
    title: "نظر درباره پزشک",

    positiveOptions: [
      "برخورد مناسب",
      "توضیحات کامل",
      "تشخیص مناسب",
      "رعایت نظم",
      "مهارت بالا",
    ],

    negativeOptions: [
      "انتظار طولانی",
      "برخورد نامناسب",
      "توضیحات ناکافی",
      "عدم رعایت نظم",
      "هزینه بالا",
    ],
  },

  consultant: {
    title: "نظر درباره مشاور",

    positiveOptions: [
      "برخورد مناسب",
      "مشاوره مفید",
      "توضیحات کامل",
      "گوش دادن مناسب",
      "تخصص بالا",
    ],

    negativeOptions: [
      "انتظار طولانی",
      "برخورد نامناسب",
      "توضیحات ناکافی",
      "مشاوره نامناسب",
      "هزینه بالا",
    ],
  },

  clinic: {
    title: "نظر درباره کلینیک",

    positiveOptions: [
      "محیط مناسب",
      "برخورد مناسب",
      "نظم خوب",
      "خدمات مناسب",
      "دسترسی آسان",
    ],

    negativeOptions: [
      "انتظار طولانی",
      "برخورد نامناسب",
      "محیط نامناسب",
      "نظم ضعیف",
      "هزینه بالا",
    ],
  },
};
