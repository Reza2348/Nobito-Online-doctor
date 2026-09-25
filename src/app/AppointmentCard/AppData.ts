import type { Appointment } from "@/Types/types";

export const appointments: Appointment[] = [
  {
    id: 1,
    doctor: "دکتر عباس میراحمدی",
    specialty: "قلب و عروق",
    day: "شنبه تا چهارشنبه",
    time: "09:00 - 15:00",
  },
  {
    id: 2,
    doctor: "دکتر مهران مهام",
    specialty: "متخصص کلیه و مجاری ادراری",
    day: "یکشنبه تا پنجشنبه",
    time: "10:00 - 16:00",
  },
  {
    id: 3,
    doctor: "دکتر محمد ابراهیمی",
    specialty: "ارتوپدی",
    day: "شنبه و سه‌شنبه",
    time: "11:00 - 14:00",
  },
];
