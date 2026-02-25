import { FooterSection } from "@/Imports/FooterImports/FooterImports";

export const FOOTER_NAV: FooterSection[] = [
  {
    title: "نوبیتو",
    links: [
      { name: "سوالات متداول", href: "/FAQ" },
      { name: "تماس با ما", href: "/Contactus" },
      { name: "میثاق‌نامه", href: "/MedicalCharter" },
      { name: "درباره ما", href: "/aboutus" },
    ],
  },
  {
    title: "خدمات",
    links: [
      { name: "خدمات پزشکی در منزل", href: "/ServiceHome" },
      { name: "مشاوره غیرحضوری", href: "/Offlineconsultation" },
      { name: "مراکز درمانی", href: "/TreatmentCenters" },
      { name: "نوبت‌دهی", href: "/AppointmentCard" },
    ],
  },
  {
    title: "نیکوکاری",
    links: [
      { name: "درمانگر داوطلب", href: "/VolunteerTherapist" },
      { name: "بیشتر بدانید", href: "/LearnMoreCards" },
      { name: "کمک مالی", href: "/DonationsCards" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { name: "شبکه‌های اجتماعی", href: "/componets/Socialnetwork" },
      { name: "واحد انفورماتیک", href: "/ITDepartment" },
      { name: "حریم شخصی", href: "/PrivacyPolicy" },
    ],
  },
];
