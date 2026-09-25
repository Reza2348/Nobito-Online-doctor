import type * as H from "@/Imports/HeaderImports/HeaderImports";

export const APPOINTMENT_LINK: H.NavLink = {
  href: "/",
  label: "نوبت‌دهی مطب",
};

export const DEFAULT_NAV_LINKS: H.NavLink[] = [
  { href: "/Onlineconsultation", label: "مشاوره آنلاین" },
  { href: "/HealthMagazine", label: "مجله سلامت" },
  { href: "/Charity", label: "نیکوکاری" },
  { href: "/Notifications", label: "اعلان‌ها" },
];

export const SERVICE_LINKS = [
  { href: "/Services/dentistry", label: "دندان‌پزشکی" },
  { href: "/Services/beauty", label: "زیبایی" },
  { href: "/Services/treatment", label: "درمانی" },
] as const;

export const FOOTER_LINKS = [
  { href: "/aboutus", label: "درباره ما" },
  { href: "/Contactus", label: "تماس با ما" },
  { href: "/FAQ", label: "سوال‌های متداول" },
] as const;

export const baseItemClasses = `
  flex min-h-12 w-full items-center
  rounded-xl px-3 py-3
  text-right text-sm font-medium
  text-[#757575]
  transition-colors duration-200
  hover:bg-emerald-50 hover:text-emerald-700
  active:bg-emerald-100
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-emerald-500
  motion-reduce:transition-none
`;
