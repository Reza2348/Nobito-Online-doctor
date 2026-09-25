import { MedicalRecord } from "@/Types/types";

export const medicalRecordList: MedicalRecord[] = [
  {
    id: 1,
    type: "test",
    title: "آزمایش خون کامل (CBC)",
    doctorName: "بهرام میرزایی",
    specialty: "متخصص مغز و اعصاب",
    date: "دوشنبه ۱۲ بهمن | ۱۴۰۲/۱۱/۱۲",
    description:
      "نتایج آزمایش خون در محدوده‌ی طبیعی گزارش شده است. جهت بررسی بیشتر در ویزیت بعدی همراه داشته باشید.",
  },
  {
    id: 2,
    type: "prescription",
    title: "نسخه‌ی دارویی - دوره‌ی درمان دو هفته‌ای",
    doctorName: "سارا احمدی",
    specialty: "متخصص داخلی",
    date: "شنبه ۳ بهمن | ۱۴۰۲/۱۱/۰۳",
    description:
      "مصرف داروها طبق دستور پزشک و به مدت ۱۴ روز. در صورت بروز هرگونه عارضه با پزشک معالج تماس بگیرید.",
  },
  {
    id: 3,
    type: "diagnosis",
    title: "گزارش تشخیص - ویزیت حضوری",
    doctorName: "بهرام میرزایی",
    specialty: "متخصص مغز و اعصاب",
    date: "پنجشنبه ۲۰ دی | ۱۴۰۲/۱۰/۲۰",
    description:
      "بر اساس معاینه و بررسی سوابق، نیاز به پیگیری فوری وجود ندارد. ویزیت کنترلی بعدی طبق برنامه انجام شود.",
  },
];
