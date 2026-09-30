import { Prescription } from "@/Types/types";

export const prescriptions: Prescription[] = [
  {
    id: "1",
    prescriptionNumber: "1024",

    patientId: "patient-001",
    patientName: "علی رضایی",

    doctorId: "doctor-001",
    doctorName: "دکتر محمد احمدی",
    doctorSpecialty: "متخصص داخلی",

    appointmentId: "appointment-1001",

    diagnosis: "عفونت تنفسی فوقانی",

    medications: [
      {
        id: "med-001",
        name: "آموکسی‌سیلین",
        dosage: "500 میلی‌گرم",
        frequency: "هر 8 ساعت",
        duration: "7 روز",
        instructions: "بعد از غذا مصرف شود.",
      },
      {
        id: "med-002",
        name: "استامینوفن",
        dosage: "500 میلی‌گرم",
        frequency: "در صورت نیاز، هر 6 ساعت",
        duration: "5 روز",
        instructions: "در صورت تب یا درد مصرف شود.",
      },
      {
        id: "med-003",
        name: "شربت دیفن‌هیدرامین",
        dosage: "10 میلی‌لیتر",
        frequency: "شب‌ها",
        duration: "5 روز",
        instructions: "قبل از خواب مصرف شود.",
      },
    ],

    instructions:
      "مایعات کافی مصرف کنید و در طول دوره درمان استراحت کافی داشته باشید. در صورت تشدید علائم یا بروز تنگی نفس، سریعاً به پزشک مراجعه کنید.",

    nextVisit: "2026-10-07",

    status: "active",

    createdAt: "2026-09-30T10:30:00",
    updatedAt: "2026-09-30T10:30:00",
  },

  {
    id: "2",
    prescriptionNumber: "1023",

    patientId: "patient-001",
    patientName: "علی رضایی",

    doctorId: "doctor-002",
    doctorName: "دکتر سارا محمدی",
    doctorSpecialty: "متخصص قلب و عروق",

    appointmentId: "appointment-1000",

    diagnosis: "فشار خون بالا",

    medications: [
      {
        id: "med-004",
        name: "لوزارتان",
        dosage: "50 میلی‌گرم",
        frequency: "روزانه یک عدد",
        duration: "30 روز",
        instructions: "صبح‌ها بعد از صبحانه مصرف شود.",
      },
    ],

    instructions: "فشار خون خود را به صورت روزانه اندازه‌گیری و ثبت کنید.",

    nextVisit: "2026-10-30",

    status: "completed",

    createdAt: "2026-09-01T09:00:00",
    updatedAt: "2026-09-01T09:00:00",
  },
];
