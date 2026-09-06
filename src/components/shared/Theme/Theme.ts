import type { ProviderKind } from "@/Types/types";

/**
 * NOTE ON TAILWIND: classes below are always written out in FULL
 * (never composed like `bg-${color}-50`) because Tailwind's JIT
 * compiler only picks up class names it can find as literal strings
 * during a static scan. Composing them at runtime would get them
 * purged from the final CSS.
 */

export interface ProviderThemeClasses {
  avatarRing: string;
  specialtyText: string;
  ratingCardBg: string;
  starActive: string;
  starInactive: string;
  patientsCardBg: string;
  patientsIconText: string;
  satisfactionCardBg: string;
  satisfactionIconText: string;
  satisfactionText: string;
  licenseIcon: string;
  bioIconBox: string;
  specialtyBoxBg: string;
  specialtyBoxIcon: string;
  specialtyChip: string;
  fieldChipHover: string;
  mapGradient: string;
  mapMarkerText: string;
  mapButtonHover: string;
  addressIconBox: string;
  phoneIconBox: string;
  sidebarIconBox: string;
  bookButtonBorder: string;
}

export interface ProviderTheme {
  entityLabel: string;
  badgeLabel: string;
  chipLabel: string;
  specialtyFallback: string;
  bioTitle: string;
  bioSubtitle: string;
  locationTitle: string;
  locationSubtitle: string;
  addressTitle: string;
  phoneTitle: string;
  patientsLabel: string;
  showCity: boolean;
  cityFallback: string;
  licenseLabel: string;
  licenseFallback: string;
  sidebarTitle: string;
  sidebarSubtitle: string;
  idParamName: string;
  feedbackPath: string; // e.g. "/Feedback/Feedback-Doctor"
  classes: ProviderThemeClasses;
}

export const providerThemes: Record<ProviderKind, ProviderTheme> = {
  doctor: {
    entityLabel: "پزشک",
    badgeLabel: "پزشک تأیید شده",
    chipLabel: "پزشک تأیید شده",
    specialtyFallback: "پزشک متخصص",
    bioTitle: "تخصص و زمینه‌های فعالیت",
    bioSubtitle: "معرفی تخصص و حوزه‌های فعالیت پزشک",
    locationTitle: "موقعیت مکانی مطب",
    locationSubtitle: "آدرس و راه‌های ارتباط با پزشک",
    addressTitle: "آدرس مطب",
    phoneTitle: "شماره تماس",
    patientsLabel: "بیمار",
    showCity: true,
    cityFallback: "نامشخص",
    licenseLabel: "شماره نظام پزشکی",
    licenseFallback: "ثبت نشده",
    sidebarTitle: "رزرو وقت مشاوره",
    sidebarSubtitle: "نوع مشاوره خود را انتخاب کنید",
    idParamName: "doctorId",
    feedbackPath: "/Feedback/Feedback-Doctor",
    classes: {
      avatarRing: "ring-emerald-50",
      specialtyText: "text-emerald-600",
      ratingCardBg: "border-yellow-100 bg-yellow-50/70",
      starActive: "text-yellow-400",
      starInactive: "text-yellow-200",
      patientsCardBg: "border-gray-100 bg-gray-50/80",
      patientsIconText: "text-emerald-600",
      satisfactionCardBg: "border-emerald-100 bg-emerald-50/70",
      satisfactionIconText: "text-emerald-600",
      satisfactionText: "text-emerald-700",
      licenseIcon: "text-emerald-600",
      bioIconBox: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
      specialtyBoxBg: "bg-emerald-50",
      specialtyBoxIcon: "text-emerald-500",
      specialtyChip: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
      fieldChipHover:
        "hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600",
      mapGradient: "from-emerald-50 to-teal-100",
      mapMarkerText: "text-emerald-500",
      mapButtonHover: "hover:bg-emerald-600 hover:text-white",
      addressIconBox: "bg-emerald-50 text-emerald-600",
      phoneIconBox: "bg-teal-50 text-teal-600",
      sidebarIconBox: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
      bookButtonBorder: "border-sky-500 text-sky-600 hover:bg-sky-600",
    },
  },

  clinic: {
    entityLabel: "کلینیک",
    badgeLabel: "کلینیک تأیید شده",
    chipLabel: "مرکز تأیید شده",
    specialtyFallback: "مرکز تخصصی درمانی",
    bioTitle: "درباره کلینیک",
    bioSubtitle: "معرفی و زمینه‌های تخصصی کلینیک",
    locationTitle: "موقعیت مکانی کلینیک",
    locationSubtitle: "آدرس و راه‌های ارتباط با کلینیک",
    addressTitle: "آدرس کلینیک",
    phoneTitle: "شماره تماس کلینیک",
    patientsLabel: "بیمار",
    showCity: true,
    cityFallback: "تهران",
    licenseLabel: "شماره نظام پزشکی",
    licenseFallback: "۵۰۵۵۸",
    sidebarTitle: "ملاقات با پزشک",
    sidebarSubtitle: "نوع مشاوره خود را انتخاب کنید",
    idParamName: "clinicId",
    feedbackPath: "/Feedback/Feedback-clinics",
    classes: {
      avatarRing: "ring-sky-50",
      specialtyText: "text-sky-600",
      ratingCardBg: "border-amber-100 bg-amber-50/70",
      starActive: "text-amber-400",
      starInactive: "text-amber-200",
      patientsCardBg: "border-slate-100 bg-slate-50/80",
      patientsIconText: "text-sky-600",
      satisfactionCardBg: "border-cyan-100 bg-cyan-50/70",
      satisfactionIconText: "text-cyan-600",
      satisfactionText: "text-cyan-700",
      licenseIcon: "text-sky-600",
      bioIconBox: "bg-blue-50 text-blue-600",
      specialtyBoxBg: "bg-blue-50",
      specialtyBoxIcon: "text-blue-500",
      specialtyChip: "bg-blue-50 text-blue-600",
      fieldChipHover:
        "hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600",
      mapGradient: "from-sky-50 via-white to-cyan-100",
      mapMarkerText: "text-sky-600",
      mapButtonHover: "hover:border-sky-500 hover:bg-sky-600 hover:text-white",
      addressIconBox: "bg-sky-50 text-sky-600",
      phoneIconBox: "bg-cyan-50 text-cyan-600",
      sidebarIconBox: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
      bookButtonBorder: "border-sky-500 text-sky-600 hover:bg-sky-600",
    },
  },

  consultant: {
    entityLabel: "مشاور",
    badgeLabel: "مشاور تأیید شده",
    chipLabel: "مشاور تأیید شده",
    specialtyFallback: "مشاور تخصصی",
    bioTitle: "درباره مشاور",
    bioSubtitle: "معرفی و زمینه‌های تخصصی مشاور",
    locationTitle: "موقعیت مکانی مشاور",
    locationSubtitle: "آدرس و راه‌های ارتباط با مشاور",
    addressTitle: "آدرس محل مشاوره",
    phoneTitle: "شماره تماس مشاور",
    patientsLabel: "بیمار راضی",
    showCity: false,
    cityFallback: "",
    licenseLabel: "کد نظام پزشکی",
    licenseFallback: "۵۰۵۵۸",
    sidebarTitle: "رزرو وقت مشاوره",
    sidebarSubtitle: "نوع مشاوره خود را انتخاب کنید",
    idParamName: "consultantId",
    feedbackPath: "/Feedback/Feedback-consultant",
    classes: {
      avatarRing: "ring-sky-50",
      specialtyText: "text-sky-600",
      ratingCardBg: "border-yellow-100 bg-yellow-50/70",
      starActive: "text-yellow-400",
      starInactive: "text-yellow-200",
      patientsCardBg: "border-slate-100 bg-slate-50/80",
      patientsIconText: "text-sky-600",
      satisfactionCardBg: "border-emerald-100 bg-emerald-50/70",
      satisfactionIconText: "text-emerald-600",
      satisfactionText: "text-emerald-700",
      licenseIcon: "text-sky-600",
      bioIconBox: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
      specialtyBoxBg: "bg-sky-50/60",
      specialtyBoxIcon: "text-sky-600",
      specialtyChip: "border border-sky-100 bg-sky-50/70 text-sky-700",
      fieldChipHover: "hover:border-sky-200 hover:bg-sky-100",
      mapGradient: "from-sky-50 via-cyan-50 to-indigo-100",
      mapMarkerText: "text-sky-500",
      mapButtonHover: "hover:bg-sky-600 hover:text-white",
      addressIconBox: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
      phoneIconBox: "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100",
      sidebarIconBox: "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
      bookButtonBorder: "border-sky-500 text-sky-600 hover:bg-sky-600",
    },
  },
};
